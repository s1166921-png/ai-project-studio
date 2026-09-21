from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from urllib.parse import unquote,urlsplit
from playwright.sync_api import sync_playwright
root=Path('out/github-pages').resolve()
class Handler(SimpleHTTPRequestHandler):
 def translate_path(self,path):
  path=unquote(urlsplit(path).path)
  if not path.startswith('/ai-project-studio/'):return str(root/'__missing__')
  resolved=(root/path[len('/ai-project-studio/'):]).resolve()
  return str(resolved if resolved.is_relative_to(root) else root/'__missing__')
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),Handler);Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True);page=b.new_page(viewport={'width':1280,'height':850});errors=[];failed=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.on('response',lambda r:failed.append((r.status,r.url)) if r.status>=400 else None)
 base=f'http://127.0.0.1:{server.server_port}/ai-project-studio/'
 page.goto(base+'profile/',wait_until='networkidle');page.get_by_role('heading',name='认真构建。 尽兴生活。').wait_for();page.get_by_role('button',name='放大查看：走到 5018 米').click();page.get_by_role('dialog').wait_for();page.keyboard.press('Escape');page.get_by_role('dialog').wait_for(state='hidden')
 page.set_viewport_size({'width':390,'height':844});page.reload(wait_until='networkidle');assert page.evaluate('document.documentElement.scrollWidth <= innerWidth');assert page.locator('img').evaluate_all('(imgs)=>imgs.filter(i=>i.complete&&i.naturalWidth===0).length')==0
 page.goto(base,wait_until='networkidle');
 assert page.locator('.hero-bottom,.expertise-strip').count()==0
 assert page.locator('[data-motion-surface]').count()==9
 page.set_viewport_size({'width':1280,'height':850});card=page.locator('.tool-card').first;card.scroll_into_view_if_needed();page.wait_for_timeout(1000);card.hover();page.mouse.move(card.bounding_box()['x']+45,card.bounding_box()['y']+50);page.wait_for_timeout(400);assert card.evaluate("e=>e.style.getPropertyValue('--glow-opacity')")=='1'
 page.get_by_role('button',name='暂停页面动画',exact=True).click();assert page.locator('.motion-stage').evaluate("e=>e.classList.contains('motion-paused')");assert card.evaluate("e=>e.style.getPropertyValue('--glow-opacity')")=='0'
 page.emulate_media(reduced_motion='reduce');assert card.evaluate("e=>getComputedStyle(e).opacity")=='1'
 page.get_by_role('link',name='个人名片',exact=True).count();assert 'This page couldn' not in page.locator('body').inner_text();page.goto(base+'projects/hs/',wait_until='networkidle');assert '进入项目' in page.locator('body').inner_text();assert not errors,errors;assert not failed,failed
 page.goto(base+'quant/',wait_until='networkidle');page.get_by_role('heading',name='虚拟盘观察台',exact=True).wait_for()
 assert page.locator('.q-chart svg').count()==1
 slider=page.get_by_role('slider',name='查看曲线日期');slider.fill('0');assert '2026-07-17' in page.locator('.q-chart-caption').inner_text()
 page.get_by_role('button',name='盈利',exact=True).click();assert page.locator('tbody tr').count()>0;assert page.locator('tbody .q-loss').count()==0
 select=page.get_by_label('切换策略记录');select.select_option('competition');assert '-8.69%' in page.locator('.q-metrics').inner_text()
 select.select_option('momentum-0');assert page.locator('.q-chart svg').count()==0;assert '净值待补全' in page.locator('.q-no-history').inner_text()
 select.select_option('v17');assert page.locator('tbody tr').count()==24
 page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
 page.screenshot(path='out/quant-mobile.png',full_page=True)
 page.set_viewport_size({'width':1440,'height':1000});select.select_option('scalper');page.screenshot(path='out/quant-desktop.png',full_page=True)
 page.goto(base+'projects/ml/',wait_until='networkidle');page.get_by_role('link',name='交互演示 打开虚拟盘观察台 切换策略 · 曲线复盘 · 成交明细').click();page.get_by_role('heading',name='虚拟盘观察台',exact=True).wait_for()
 assert not errors,errors;assert not failed,failed
 print('PASS: browser hydration, lightbox, mobile width, homepage and detail routes; no resource failures');b.close()
server.shutdown()
