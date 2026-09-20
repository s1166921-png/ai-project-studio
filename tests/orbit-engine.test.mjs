import assert from 'node:assert/strict';
import {createGame,step,CAT_RADIUS} from '../app/orbit-engine.ts';
const white=createGame();white.orbs=[{x:10,y:-100,r:9,red:false,id:0}];step(white,.005,false);assert.equal(white.score,10);assert.ok(Math.hypot(white.vx,white.vy)>165);assert.ok(!white.orbs.some(o=>o.id===0));
const red=createGame();red.orbs=[{x:10,y:-100,r:9,red:true,id:0}];step(red,.005,false);assert.equal(red.dead,true);const snapshot=JSON.stringify(red);step(red,.03,true);assert.equal(JSON.stringify(red),snapshot);
const near=createGame();near.orbs=[{x:0,y:-100-CAT_RADIUS-10,r:9,red:true,id:0}];step(near,0,false);assert.equal(near.dead,false);
const tangent=createGame();tangent.orbs=[];const release=createGame();release.orbs=[];for(let i=0;i<60;i++){step(tangent,1/120,true);step(release,1/120,false);}assert.ok(Math.hypot(tangent.x-release.x,tangent.y-release.y)>10);
const fast=createGame();fast.x=-50;fast.y=-100;fast.vx=400;fast.orbs=[{x:-33,y:-100,r:9,red:true,id:0}];step(fast,.05,false);assert.equal(fast.dead,true);
const bounded=createGame();bounded.orbs=[];for(let i=0;i<5000;i++){bounded.orbs=[];step(bounded,1/120,i%200<100);assert.ok(Number.isFinite(bounded.x));assert.ok(Math.hypot(bounded.x,bounded.y)<=286);}assert.equal(createGame().score,0);assert.equal(createGame().dead,false);
console.log('PASS: circular contact, white boost, red death, no repeat scoring, near miss, hold/release, high-speed contact, bounded physics, reset');
