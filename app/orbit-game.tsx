"use client";
import {useEffect,useRef,useState} from "react";
import {createGame,step,CAT_RADIUS,type Game} from "./orbit-engine";
export default function OrbitGame({paused}:{paused:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),world=useRef<Game>(createGame()),running=useRef(false),held=useRef(false),pause=useRef(paused);
 const [mode,setMode]=useState<'ready'|'playing'|'dead'>('ready'),[score,setScore]=useState(0),[best,setBest]=useState(0),[pressing,setPressing]=useState(false);
 const release=()=>{held.current=false;setPressing(false)};
 const hold=()=>{if(!running.current||pause.current)return;held.current=true;setPressing(true)};
 useEffect(()=>{pause.current=paused;held.current=false},[paused]);
 const start=()=>{held.current=false;setPressing(false);world.current=createGame();running.current=true;setScore(0);setMode('playing');canvas.current?.focus()};
 useEffect(()=>{
  const el=canvas.current;if(!el)return;const ctx=el.getContext('2d');if(!ctx)return;
  let w=0,h=0,raf=0,last=0,hidden=document.hidden,record=0;const motion=matchMedia('(prefers-reduced-motion: reduce)');
  try{const value=Number(localStorage.getItem('yang-cat-sling-best'));record=Number.isFinite(value)&&value>0?value:0}catch{/* Local records are optional. */}
  const restore=requestAnimationFrame(()=>setBest(record));
  const resize=()=>{const b=el.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);el.width=w*d;el.height=h*d;ctx.setTransform(d,0,0,d,0,0)};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const render=(now:number)=>{
   const dt=Math.min((now-last)/1000||0,.04);last=now;const g=world.current;
   if(running.current&&!pause.current&&!hidden){const previous=g.score;step(g,dt,held.current);if(previous!==g.score)setScore(g.score);if(g.dead){running.current=false;held.current=false;setPressing(false);setMode('dead');if(g.score>record){record=g.score;setBest(record);try{localStorage.setItem('yang-cat-sling-best',String(record))}catch{/* A blocked store must not interrupt play. */}}}}
   ctx.clearRect(0,0,w,h);const scale=Math.min((w-26)/610,(h-162)/610),cx=w/2,cy=82+(h-162)/2;
   ctx.save();ctx.translate(cx,cy);ctx.scale(scale,scale);
   const glow=ctx.createRadialGradient(0,0,0,0,0,285);glow.addColorStop(0,'#ffefb488');glow.addColorStop(1,'#ffc85a00');ctx.fillStyle=glow;ctx.fillRect(-305,-305,610,610);
   for(const r of [85,145,205,285]){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.setLineDash([2,10]);ctx.strokeStyle='#98702730';ctx.lineWidth=1;ctx.stroke();}ctx.setLineDash([]);
   if(!motion.matches){g.trail.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,3+i*.18,0,Math.PI*2);ctx.fillStyle=`rgba(171,104,21,${i/g.trail.length*.22})`;ctx.fill()});}
   // The tether visual shares the exact centre and player positions used by physics.
   ctx.beginPath();ctx.moveTo(0,0);if(held.current){ctx.lineTo(g.x,g.y);ctx.strokeStyle='#9a6117aa';ctx.lineWidth=2.5;}else{ctx.quadraticCurveTo(g.x*.25-g.y*.12,g.y*.25+g.x*.12,g.x,g.y);ctx.strokeStyle='#9a611739';ctx.lineWidth=1.3;ctx.setLineDash([5,7]);}ctx.stroke();ctx.setLineDash([]);
   ctx.beginPath();ctx.arc(0,0,30,0,Math.PI*2);const core=ctx.createRadialGradient(-10,-12,2,0,0,32);core.addColorStop(0,'#847343');core.addColorStop(1,'#352d1d');ctx.fillStyle=core;ctx.fill();ctx.strokeStyle='#f8d678';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#f8dc8e';ctx.font='12px Consolas';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Y',0,0);
   for(const o of g.orbs){ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fillStyle=o.red?'#d94232':'#fffef5';ctx.shadowColor=o.red?'#e6493540':'#fff7d9';ctx.shadowBlur=8;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=o.red?'#a02c25':'#ad9153';ctx.lineWidth=1.5;ctx.stroke();if(o.red){ctx.strokeStyle='#ffe9d3';ctx.beginPath();ctx.moveTo(o.x-3,o.y-3);ctx.lineTo(o.x+3,o.y+3);ctx.moveTo(o.x+3,o.y-3);ctx.lineTo(o.x-3,o.y+3);ctx.stroke();}}
   // Circular body is the collision shape; the cat face stays clipped inside it.
   ctx.save();ctx.translate(g.x,g.y);ctx.beginPath();ctx.arc(0,0,CAT_RADIUS,0,Math.PI*2);ctx.fillStyle=g.dead?'#e9b99a':'#ffc65a';ctx.fill();ctx.strokeStyle='#744612';ctx.lineWidth=2;ctx.stroke();ctx.clip();ctx.font='25px "Segoe UI Emoji","Apple Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(g.dead?'😿':'🐱',0,1);ctx.restore();
   if(g.flash>0&&!motion.matches){ctx.beginPath();ctx.arc(g.x,g.y,CAT_RADIUS+(1-g.flash/.35)*35,0,Math.PI*2);ctx.strokeStyle=`rgba(174,115,21,${g.flash/.35})`;ctx.stroke();ctx.font='bold 18px sans-serif';ctx.fillStyle='#815216';ctx.fillText('+10',g.x,g.y-30-(1-g.flash/.35)*20);}
   ctx.restore();raf=requestAnimationFrame(render);
  };raf=requestAnimationFrame(render);
  const visibility=()=>{hidden=document.hidden;last=performance.now();held.current=false;setPressing(false)};const blur=()=>{held.current=false;setPressing(false)};document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',blur);
  return()=>{cancelAnimationFrame(raf);cancelAnimationFrame(restore);ro.disconnect();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',blur)};
 },[]);
 return <div className="orbit-game sling-game"><div className="game-hud"><span>CAT SLING <small>猫猫引力弹跳</small></span><span><b>{score}</b> 分 <small>本机最高 {best}</small></span></div>
 <canvas ref={canvas} tabIndex={0} aria-label="猫猫引力弹跳。按住屏幕或空格收紧牵引绕中心转，松开惯性弹出。白球加十分并反弹，红球结束。" onKeyDown={e=>{if(e.code==='Space'){e.preventDefault();hold()}}} onKeyUp={e=>{if(e.code==='Space'){e.preventDefault();release()}}} onBlur={release} onPointerDown={e=>{e.preventDefault();e.currentTarget.focus();e.currentTarget.setPointerCapture(e.pointerId);hold()}} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}/>
 {mode!=='playing'&&<div className="game-overlay"><span className="game-label">{mode==='dead'?'碰到红球啦':'HOLD · SWING · BOUNCE'}</span><h3>{mode==='dead'?'猫猫再弹一次？':'猫猫引力弹跳'}</h3><p>{mode==='dead'?`这次 ${score} 分 · 本机最高 ${best} 分`:'按住收紧牵引，松开惯性飞出。撞上白球，借力弹得更远！'}</p><button onClick={start}>{mode==='dead'?'再来一次 ↗':'开始弹跳 ↗'}</button></div>}
 {paused&&mode==='playing'&&<div className="game-paused">已暂停 · 点击下方播放按钮继续</div>}
 <div className="game-instructions"><span>按住屏幕 / 空格绕行 · 松开弹出</span><span>⚪ +10 & 反弹加速　🔴 碰到结束</span></div><div className="game-touch sling-control"><button className={pressing&&!paused?'is-held':''} aria-label="按住牵引，松开弹出" aria-pressed={pressing&&!paused} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);hold()}} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onKeyDown={e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();hold()}}} onKeyUp={release} onBlur={release}>{pressing&&!paused?'牵引中 · 松开弹出':'按住牵引 ↻'}</button></div>
 </div>;
}

