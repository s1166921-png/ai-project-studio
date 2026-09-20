"use client";
import {useEffect,useRef,useState} from "react";
import {createGame,populate,step,type Game} from "./orbit-engine";
export default function OrbitGame({paused}:{paused:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),world=useRef<Game>(createGame()),running=useRef(false),keys=useRef(new Set<string>()),drag=useRef<number|null>(null),pause=useRef(paused);
 const [mode,setMode]=useState<'ready'|'playing'|'dead'>('ready'),[score,setScore]=useState(0),[best,setBest]=useState(0);
 useEffect(()=>{pause.current=paused;keys.current.clear()},[paused]);
 const start=()=>{keys.current.clear();drag.current=null;world.current=createGame();populate(world.current);running.current=true;setScore(0);setMode('playing');canvas.current?.focus()};
 useEffect(()=>{
  const el=canvas.current;if(!el)return;const ctx=el.getContext('2d');if(!ctx)return;
  let w=0,h=0,raf=0,last=0,hidden=document.hidden,record=0;try{record=Number(localStorage.getItem('yang-orbit-best'))||0}catch{/* Private storage is optional. */}
  const restore=requestAnimationFrame(()=>setBest(record));
  const resize=()=>{const b=el.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);el.width=w*d;el.height=h*d;ctx.setTransform(d,0,0,d,0,0)};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();populate(world.current);
  const render=(now:number)=>{
   const dt=Math.min((now-last)/1000||0,.025);last=now;const g=world.current;
   if(running.current&&!pause.current&&!hidden){step(g,dt,(keys.current.has('ArrowRight')||keys.current.has('d')?1:0)-(keys.current.has('ArrowLeft')||keys.current.has('a')?1:0));setScore(s=>s===g.score?s:g.score);if(g.dead){running.current=false;setMode('dead');if(g.score>record){record=g.score;setBest(record);try{localStorage.setItem('yang-orbit-best',String(record))}catch{/* Storage failure must not interrupt play. */}}}}
   ctx.clearRect(0,0,w,h);const r=Math.min(w*.34,145),cx=w/2,base=h*.69,scale=Math.min(w/430,1);
   const project=(angle:number,height:number)=>({x:cx+Math.cos(angle)*r,y:base+Math.sin(angle)*r*.27-(height-g.camera)*scale,z:Math.sin(angle)});
   const glow=ctx.createRadialGradient(cx,base,0,cx,base,r*1.6);glow.addColorStop(0,'#f0bb4260');glow.addColorStop(1,'#f0bb4200');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
   // Wire sphere and altitude rings are geometry, not decorative character artwork.
   ctx.strokeStyle='#8a641b25';ctx.lineWidth=.8;
   for(let i=0;i<7;i++){ctx.beginPath();ctx.ellipse(cx,base+28,r,Math.max(8,r*Math.abs(Math.cos(i*.48))),0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(cx,base+28,Math.max(8,r*Math.abs(Math.cos(i*.48))),r,0,0,Math.PI*2);ctx.stroke();}
   for(let level=Math.floor(g.camera/75)*75;level<g.camera+450;level+=75){const y=base-(level-g.camera)*scale;ctx.beginPath();ctx.ellipse(cx,y,r,r*.27,0,0,Math.PI*2);ctx.strokeStyle='#99732226';ctx.setLineDash([3,7]);ctx.stroke();ctx.setLineDash([]);}
   const things=g.orbs.filter(o=>!o.taken).map(o=>({...project(o.angle,o.height),orb:o,cat:false}));const cat=project(g.angle,g.height);things.push({...cat,orb:{angle:g.angle,height:g.height,red:false,taken:false},cat:true});things.sort((a,b)=>a.z-b.z);
   for(const item of things){if(item.y < -25||item.y>h+25)continue;ctx.globalAlpha=item.z<-.2?.5:1;
    if(item.cat){ctx.save();ctx.translate(item.x,item.y);ctx.rotate(Math.max(-.18,Math.min(.18,g.velocity*.0005)));ctx.font='35px "Segoe UI Emoji","Apple Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(g.dead?'😿':'🐈',0,-4);ctx.restore();}
    else{const rr=item.orb.red?8:7;ctx.beginPath();ctx.arc(item.x,item.y,rr,0,Math.PI*2);ctx.shadowColor=item.orb.red?'#e44835':'#fff8de';ctx.shadowBlur=14;ctx.fillStyle=item.orb.red?'#db4939':'#fffef7';ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=item.orb.red?'#a12c24':'#b49956';ctx.lineWidth=1.5;ctx.stroke();if(item.orb.red){ctx.strokeStyle='#fff0dc';ctx.beginPath();ctx.moveTo(item.x-2.5,item.y-2.5);ctx.lineTo(item.x+2.5,item.y+2.5);ctx.moveTo(item.x+2.5,item.y-2.5);ctx.lineTo(item.x-2.5,item.y+2.5);ctx.stroke();}}
   }ctx.globalAlpha=1;raf=requestAnimationFrame(render);
  };raf=requestAnimationFrame(render);
  const visibility=()=>{hidden=document.hidden;last=performance.now();keys.current.clear()};document.addEventListener('visibilitychange',visibility);
  return()=>{cancelAnimationFrame(raf);cancelAnimationFrame(restore);ro.disconnect();document.removeEventListener('visibilitychange',visibility)};
 },[]);
 return <div className="orbit-game"><div className="game-hud"><span>CAT ORBIT <small>小猫轨道跳跃</small></span><span><b>{score}</b> 分 <small>本机最高 {best}</small></span></div>
 <canvas ref={canvas} tabIndex={0} aria-label="小猫轨道跳跃。左右方向键或 A D 控制绕球移动，也可左右拖动。白球加分，红球结束。" onKeyDown={e=>{if(['ArrowLeft','ArrowRight','a','d'].includes(e.key)){e.preventDefault();keys.current.add(e.key)}}} onKeyUp={e=>keys.current.delete(e.key)} onBlur={()=>keys.current.clear()} onPointerDown={e=>{if(!running.current||pause.current)return;drag.current=e.clientX;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.focus()}} onPointerMove={e=>{if(drag.current===null||!running.current||pause.current)return;world.current.angle+=(e.clientX-drag.current)*.014;drag.current=e.clientX}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}} />
 {mode!=='playing'&&<div className="game-overlay"><span className="game-label">{mode==='dead'?'碰到红球啦':'READY TO JUMP?'}</span><h3>{mode==='dead'?'再跳高一点？':'小猫，向上跳！'}</h3><p>{mode==='dead'?`这次拿到 ${score} 分 · 最高 ${best} 分`:'绕球体 360° 移动，追上空中的白球。'}</p><button onClick={start}>{mode==='dead'?'再来一次 ↗':'开始挑战 ↗'}</button></div>}
 {paused&&mode==='playing'&&<div className="game-paused">已暂停 · 点击下方播放按钮继续</div>}
 <div className="game-instructions"><span>← → / A D / 左右拖动</span><span>⚪ +10 & 弹得更高　🔴 游戏结束</span></div><div className="game-touch"><button aria-label="向左绕球" onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);keys.current.add('ArrowLeft')}} onPointerUp={()=>keys.current.delete('ArrowLeft')} onPointerCancel={()=>keys.current.delete('ArrowLeft')}>←</button><span>360° ORBIT</span><button aria-label="向右绕球" onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);keys.current.add('ArrowRight')}} onPointerUp={()=>keys.current.delete('ArrowRight')} onPointerCancel={()=>keys.current.delete('ArrowRight')}>→</button></div>
 </div>;
}


