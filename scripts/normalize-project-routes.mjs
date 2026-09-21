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

await mkdir('dist/client/profile',{recursive:true});
await copyFile('dist/client/profile.html','dist/client/profile/index.html');
await copyFile('dist/client/profile.rsc','dist/client/profile/index.rsc');

await mkdir('dist/client/quant',{recursive:true});
await copyFile('dist/client/quant.html','dist/client/quant/index.html');
await copyFile('dist/client/quant.rsc','dist/client/quant/index.rsc');
