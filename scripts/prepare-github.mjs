import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const source = 'dist/client';
const target = 'out/github-pages';
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
async function rewrite(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await rewrite(path);
    else if (/\.(html|js|css|json|rsc)$/.test(entry.name)) {
      const content = await readFile(path, 'utf8');
      await writeFile(path, content.replaceAll('/_next/', '/ai-project-studio/_next/').replace(/(["'`])_next\//g, '$1ai-project-studio/_next/'));
    }
  }
}
await rewrite(target);
await writeFile(join(target, '.nojekyll'), '');
const html = await readFile(join(target, 'index.html'), 'utf8');
if (!html.includes('/ai-project-studio/_next/')) throw new Error('Missing Pages asset prefix');
console.log('GitHub Pages output ready: ' + target);
