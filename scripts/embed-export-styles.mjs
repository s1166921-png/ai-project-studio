import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,join,relative} from 'node:path';
// Keep stylesheet links for framework navigation, and include the same compiled
// CSS in exported HTML so the first render survives blocked/stale CSS requests.
const root=resolve('dist/client');
let count=0;
async function visit(dir){
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const path=join(dir,entry.name);
  if(entry.isDirectory()){await visit(path);continue;}
  if(!entry.name.endsWith('.html'))continue;
  let html=await readFile(path,'utf8');
  html=html.replace(/<style data-export-css="[^"]*">[\s\S]*?<\/style>/g,'');
  const links=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
  for(const [link] of links){
   const href=link.match(/\bhref="([^"]+)"/)?.[1];
   if(!href?.startsWith('/_next/static/css/'))throw new Error(`Unexpected stylesheet in ${relative(root,path)}: ${href}`);
   const cssPath=resolve(root,'.'+href);
   if(!relative(root,cssPath).startsWith('_next'))throw new Error('Stylesheet outside export');
   const css=(await readFile(cssPath,'utf8')).replace(/<\/style/gi,'<\\/style');
   html=html.replace(link,`<style data-export-css="${href}">${css}</style>${link}`);
  }
  if(links.length){await writeFile(path,html);count++;}
 }
}
await visit(root);
console.log(`Embedded compiled styles in ${count} exported pages`);
