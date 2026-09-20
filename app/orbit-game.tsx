"use client";
import {useEffect,useRef} from 'react';
export default function OrbitGame({paused}:{paused:boolean}){
 const ref=useRef<HTMLIFrameElement>(null);
 const sync=()=>ref.current?.contentWindow?.postMessage({type:'portfolio-game-pause',paused},window.location.origin);
 useEffect(()=>{ref.current?.contentWindow?.postMessage({type:'portfolio-game-pause',paused},window.location.origin)},[paused]);
 return <iframe ref={ref} src="./hot-bounce/index.html" title="热力弹跳 Hot Bounce 3D 小游戏" className="webgl-game" onLoad={sync} allow="fullscreen" allowFullScreen/>;
}
