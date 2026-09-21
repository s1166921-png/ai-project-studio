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
 page.goto(base,wait_until='networkidle');page.get_by_role('link',name='个人名片',exact=True).count();assert 'This page couldn' not in page.locator('body').inner_text();page.goto(base+'projects/hs/',wait_until='networkidle');assert '进入项目' in page.locator('body').inner_text();assert not errors,errors;assert not failed,failed
 print('PASS: browser hydration, lightbox, mobile width, homepage and detail routes; no resource failures');b.close()
server.shutdown()
