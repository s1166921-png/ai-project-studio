"""Read-only import of paper-trading records. Public output uses an explicit field allowlist.
Usage: python scripts/import-paper-trading.py --source <live_paper_trader directory>
"""
import argparse, csv, hashlib, json
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path


def drawdown(values):
    peak = values[0]
    worst = 0
    for v in values:
        peak = max(peak, v)
        worst = max(worst, (peak-v)/peak if peak else 0)
    return worst*100


def closed_positions(rows):
    groups = defaultdict(list)
    for row in rows:
        if str(row.get("side", "")).startswith("SELL"):
            if not row.get("entry_time"):
                raise ValueError("Scalper position lacks entry_time")
            groups[(row["symbol"], row["entry_time"])].append(row)
    result = []
    for sells in groups.values():
        last = max(sells, key=lambda r:r["exit_time"])
        shares = sum(r["shares"] for r in sells)
        buy_fee = max(5, sells[0]["entry_price"]*shares*2.5/10000)
        result.append({"date":last["date"], "symbol":last["symbol"], "pnl":round(sum(r["pnl"] for r in sells)-buy_fee, 4), "reason":last.get("reason", "SELL"), "version":last.get("version", "早期版本"), "shares":shares})
    return sorted(result, key=lambda r:r["date"])


def import_data(root):
    sources = []
    def read(name, kind="json"):
        path = root/name
        raw = path.read_bytes()
        sources.append({"file":name,"sha256":hashlib.sha256(raw).hexdigest()})
        content = raw.decode("utf-8-sig")
        if kind == "csv": return list(csv.DictReader(content.splitlines()))
        if kind == "jsonl": return [json.loads(line) for line in content.splitlines() if line.strip()]
        return json.loads(content)
    accounts = []
    def add(id, name, kind, initial, equity, date, note, points=None, trades=None, basis="账户权益 / CNY"):
        pts = points or []
        accounts.append(dict(id=id,name=name,kind=kind,initial=initial,equity=equity,date=date,note=note,points=pts,trades=trades or [],basis=basis,returnPct=(equity/initial-1)*100 if equity is not None and initial else None,drawdown=drawdown([p["value"] for p in pts]) if len(pts)>1 else None))
    journal = read("scalping/state/trade_journal.jsonl", "jsonl")
    trades = closed_positions(journal)
    daily = defaultdict(float)
    for row in trades: daily[row["date"]] += row["pnl"]
    cumulative = 0
    points = []
    for date, pnl in sorted(daily.items()):
        cumulative += pnl
        points.append({"date":date,"value":round(200000+cumulative,4)})
    add("scalper", "Scalper · 已平仓复盘", "重建曲线", 200000, 200000+cumulative, points[-1]["date"], "按 symbol + entry_time 合并分批卖出，扣除买入佣金（2.5 bp，最低 5 元）；卖出佣金已计入日志。按最终退出日归集。以 20 万元为归一基准，不是连续实盘净值，也不含未平仓浮盈亏。", points, trades, "已平仓盈亏重建 / CNY")
    accounts[-1]["drawdown"] = drawdown([200000]+[p["value"] for p in points])
    normalized = read("competition_state/tradingagents_competition_pnl_normalized.csv", "csv")
    by_date = {r["date"]:r for r in normalized}
    pts = [{"date":d,"value":float(r["equity"])} for d,r in sorted(by_date.items())]
    add("competition", "TradingAgents · 组合竞赛盘", "迁移后曲线", 200000, pts[-1]["value"],pts[-1]["date"], "仅使用资金迁移后的 normalized 曲线；排除迁移前旧曲线。组合包含 T+0 子账户，不与子账户重复合计。稀疏快照之间的连线仅表示观测值变化。", pts)
    for id, filename, title, note in [("t0","tradingagents_t0_competition_account.json","TradingAgents · 独立 T+0","独立虚拟账户。仅展示最新权益快照；缺少完整历史，不计算历史回撤。"),("overlay","tradingagents_t0_overlay.json","TradingAgents · T+0 子账户","属于组合竞赛盘的子账户，已被组合覆盖，不能与组合叠加。")]:
        d=read("competition_state/"+filename)
        add(id,title,"子账户快照" if id=="overlay" else "账户快照",d["initial_cash"],d["equity"],d["updated_at"][:10],note)
    v17=read("scalping/state/v17/v17_carryover.json")
    logs=read("scalping/state/v17/v17_trade_journal.jsonl","jsonl")
    # Journal PnL excludes entry commission; do not label it net PnL or fabricate equity.
    vt=[{"date":r["date"],"symbol":r["symbol"],"pnl":r["pnl"],"reason":r["side"],"version":"V17","shares":r["shares"]} for r in logs]
    equity = v17["cash"] if not v17["positions"] else None
    add("v17","V17 · ML 筛选虚拟盘","账户快照",200000,equity,v17["date"],"最新持仓为空，以现金确认权益。交易表为日志卖出盈亏，已扣卖出佣金、未扣买入佣金，因此不能直接等同账户净收益。",trades=vt)
    for id, path, title in [("legacy","scalping_state/session_report.json","Scalper · 早期会话"),("v3","scalping/state/v3_session_report.json","Scalper · V3 会话"),("v14","scalping/state/v4_session_report.json","Scalper · V14 最新会话")]:
        d=read(path)
        add(id,title,"会话快照",d["initial_cash"],d["final_equity"],d["timestamp"][:10],"单次会话表现，部分会话重置本金。与 Scalper 交易历史有重叠，不作为新增独立账户求和。")
    d=read("forward_state/paper_account.json")
    last=d["equity_history"][-1]
    add("forward","ETF · 前向模拟盘","账户快照",d["initial_cash"],last["total_equity"],last["date"][:10],"只有一个权益观测日；保留源文件 total_equity。源现金与市值字段无法直接勾稽，暂不据此重建净值历史。")
    multi=read("multi_strategy_state/multi_accounts.json")
    for i,(name,d) in enumerate(multi.items()):
        add("momentum-"+str(i),name,"待补净值",d["initial_cash"],None,"未记录", "已有现金与持仓记录，但 equity_history 为空，缺少估值价格。现金余额不等于账户权益，收益和回撤暂不可计算。")
    return {"importedAt":datetime.now(timezone.utc).isoformat(),"accounts":accounts,"sources":sources,"excluded":["迁移前 competition 旧曲线及测试副本","分钟监控中的重复、滞后快照","aquant 与 ai-quant-product 的历史回测（不计为前向虚拟盘）","swing-executor 只有信号历史，未发现可用成交或净值"],"currency":"CNY"}

if __name__ == "__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--source",required=True)
    args=parser.parse_args()
    data=import_data(Path(args.source))
    output=Path(__file__).resolve().parents[1]/"app/quant/data.json"
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps({"records":len(data["accounts"]),"sources":len(data["sources"]),"trades":sum(len(a["trades"]) for a in data["accounts"]) }))
