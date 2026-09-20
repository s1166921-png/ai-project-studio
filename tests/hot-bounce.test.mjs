import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=readFileSync('public/hot-bounce/index.html','utf8');new vm.Script([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1]);
const ctx=vm.createContext({});vm.runInContext(html.split('// PHYSICS_START')[1].split('// PHYSICS_END')[0]+';globalThis.api={newRun,tick,contact,orbitPoint,FLOOR,TIME_SCALE};',ctx);
const {newRun,tick,contact,orbitPoint,FLOOR,TIME_SCALE}=ctx.api;
assert.ok(TIME_SCALE<=.5);
const white=newRun();const w={...white,r:.38,red:false};tick(white,[w],0);assert.equal(white.score,100);tick(white,[w],0);assert.equal(white.score,100);
const upper=newRun();const bad={x:upper.x,y:upper.y-.6,z:upper.z,r:.5,red:true};tick(upper,[bad],0);assert.equal(upper.dead,true);assert.equal(upper.score,0);
const lower=newRun();const good={x:lower.x,y:lower.y+.6,z:lower.z,r:.5,red:true};tick(lower,[good],0);assert.equal(lower.dead,false);assert.equal(lower.score,100);assert.equal(good.taken,true);
const fromBelow=contact({x:0,y:0,z:0},{x:0,y:-2,z:0},{x:0,y:2,z:0},.95);assert.ok(fromBelow.y<0,'Use FIRST contact hemisphere, not endpoint');
const fromAbove=contact({x:0,y:0,z:0},{x:0,y:2,z:0},{x:0,y:-2,z:0},.95);assert.ok(fromAbove.y>0);
for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5]){const g=newRun();g.target=angle;for(let i=0;i<250;i++)tick(g,[],0);assert.ok(Math.abs(Math.atan2(Math.sin(g.angle-angle),Math.cos(g.angle-angle)))<.01);assert.ok(g.radius>=FLOOR&&g.radius<=11.7);}
const slow=newRun();let firstBounce=0;for(let i=1;i<250;i++){if(tick(slow,[],0).jump){firstBounce=i;break}}assert.ok(firstBounce>=95,'At least 1.58s per bounce');
assert.ok(html.includes("pointermove',aim"));assert.ok(html.includes('Math.PI/2,Math.PI/2'));console.log('PASS: slower bounce, 360 degree target steering, white scoring once, red upper death, lower reward/removal, swept first-contact hemisphere, bounded radius, mouse input');
