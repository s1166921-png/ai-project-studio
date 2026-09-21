import importlib.util, unittest, json
from pathlib import Path
spec=importlib.util.spec_from_file_location("paper",Path(__file__).parents[1]/"scripts/import-paper-trading.py")
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Accounting(unittest.TestCase):
 def test_partial_sells_pay_one_buy_commission(self):
  rows=[dict(symbol="ETF",side="SELL",entry_time=1,exit_time=2,entry_price=10,shares=100,pnl=30,date="2026-01-01"),dict(symbol="ETF",side="SELL",entry_time=1,exit_time=3,entry_price=10,shares=100,pnl=-10,date="2026-01-02")]
  positions=m.closed_positions(rows)
  self.assertEqual(len(positions),1);self.assertEqual(positions[0]["pnl"],15);self.assertEqual(positions[0]["date"],"2026-01-02")
 def test_drawdown_includes_loss_from_baseline(self):
  self.assertAlmostEqual(m.drawdown([200000,190000,195000]),5)
 def test_published_missing_history_is_not_zero_return(self):
  d=json.loads((Path(__file__).parents[1]/"app/quant/data.json").read_text(encoding="utf-8"))
  missing=[a for a in d["accounts"] if a["kind"]=="待补净值"]
  self.assertEqual(len(missing),6)
  self.assertTrue(all(a["returnPct"] is None and a["equity"] is None for a in missing))
  c=next(a for a in d["accounts"] if a["id"]=="competition")
  self.assertEqual(c["points"][0],{"date":"2026-08-12","value":200000})
  self.assertAlmostEqual(c["returnPct"],-8.688275436)
if __name__=="__main__":unittest.main()
