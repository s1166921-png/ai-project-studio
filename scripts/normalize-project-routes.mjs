import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
// Vinext exports without redirecting its prerender requests. Also publish directory URLs
// so the same relative links work on Sites and GitHub Pages.
const root='dist/client/projects';
for(const name of await readdir(root)){
 if(!name.endsWith('.html'))continue;
 const id=name.slice(0,-5);await mkdir(join(root,id),{recursive:true});
 await copyFile(join(root,name),join(root,id,'index.html'));
 try{await copyFile(join(root,id+'.rsc'),join(root,id,'index.rsc'))}catch(e){if(e.code!=='ENOENT')throw e}
}
