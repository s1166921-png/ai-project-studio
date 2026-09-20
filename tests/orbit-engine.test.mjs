import assert from 'node:assert/strict';
import {createGame,step,angleDistance} from '../app/orbit-engine.ts';
const white=createGame();white.orbs=[{angle:white.angle,height:5,red:false,taken:false}];step(white,.02,0);assert.equal(white.score,10);assert.ok(white.velocity>215);step(white,.02,0);assert.equal(white.score,10);
const red=createGame();red.orbs=[{angle:red.angle,height:5,red:true,taken:false}];step(red,.02,0);assert.equal(red.dead,true);const height=red.height;step(red,.02,1);assert.equal(red.height,height);
const safe=createGame();safe.orbs=[{angle:safe.angle+1,height:5,red:true,taken:false}];step(safe,.02,0);assert.equal(safe.dead,false);
assert.ok(angleDistance(.05,Math.PI*2-.05)<.11);
const run=createGame();for(let i=0;i<500;i++)step(run,1/60,0);assert.ok(run.score>=10);assert.ok(run.height>=run.floor);assert.ok(run.orbs.length<40);
const reset=createGame();assert.equal(reset.score,0);assert.equal(reset.dead,false);assert.equal(reset.height,0);
console.log('PASS: white boost, single scoring, red death, collision separation, orbit wrap, bounce, reset');
const recovery=createGame();recovery.next=10000;recovery.floor=70;recovery.height=70;recovery.angle=0;recovery.orbs=[{angle:0,height:145,red:false,taken:false}];for(let i=0;i<120;i++)step(recovery,1/60,0);assert.ok(recovery.score>=10,'Next white ball remains reachable after a missed jump');

