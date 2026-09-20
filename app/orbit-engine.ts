export const CAT_RADIUS=16;
export type Orb={x:number;y:number;r:number;red:boolean;id:number};
export function createGame(){const g={x:0,y:-100,vx:165,vy:0,score:0,dead:false,orbs:[] as Orb[],serial:0,time:0,flash:0,trail:[] as {x:number;y:number}[]};
 for(let ring=0;ring<3;ring++)for(let i=0;i<12;i++){const a=i*Math.PI/6+ring*.22,r=125+ring*57;g.orbs.push({x:Math.cos(a)*r,y:Math.sin(a)*r,r:9,red:ring>0&&i%3===1,id:g.serial++});}return g;}
export type Game=ReturnType<typeof createGame>;
export function step(g:Game,elapsed:number,held:boolean){
 if(g.dead)return;const count=Math.max(1,Math.ceil(Math.min(elapsed,.05)*240)),dt=Math.min(elapsed,.05)/count;
 for(let s=0;s<count;s++){
  g.time+=dt;g.flash=Math.max(0,g.flash-dt);let d=Math.hypot(g.x,g.y)||1,nx=g.x/d,ny=g.y/d;
  // Holding tightens a spring tether and adds clockwise tangential thrust.
  // Releasing preserves momentum, with a soft gravity well returning the cat.
  const radial=held?Math.max(-90,(d-85)*4.6):Math.max(15,(d-175)*2.4);
  const tangent=held?130:0;
  g.vx+=(-nx*radial-ny*tangent)*dt;g.vy+=(-ny*radial+nx*tangent)*dt;
  const speed=Math.hypot(g.vx,g.vy),limit=400;if(speed>limit){g.vx*=limit/speed;g.vy*=limit/speed;}
  g.x+=g.vx*dt;g.y+=g.vy*dt;d=Math.hypot(g.x,g.y)||1;nx=g.x/d;ny=g.y/d;
  if(d<46){g.x=nx*46;g.y=ny*46;const inward=g.vx*nx+g.vy*ny;if(inward<0){g.vx-=1.8*inward*nx;g.vy-=1.8*inward*ny;}}
  // An outer elastic field keeps every run within the playable viewport.
  if(d>285){g.x=nx*285;g.y=ny*285;const outward=g.vx*nx+g.vy*ny;if(outward>0){g.vx-=1.7*outward*nx;g.vy-=1.7*outward*ny;}}
  for(let i=g.orbs.length-1;i>=0;i--){const o=g.orbs[i],dx=g.x-o.x,dy=g.y-o.y,dist=Math.hypot(dx,dy);if(dist>CAT_RADIUS+o.r)continue;
   if(o.red){g.dead=true;return;}
   const bx=dist>.001?dx/dist:nx,by=dist>.001?dy/dist:ny;
   g.x=o.x+bx*(CAT_RADIUS+o.r+1);g.y=o.y+by*(CAT_RADIUS+o.r+1);
   const incoming=g.vx*bx+g.vy*by;if(incoming<0){g.vx-=2*incoming*bx;g.vy-=2*incoming*by;}
   g.vx+=bx*100;g.vy+=by*100;g.score+=10;g.flash=.35;g.orbs.splice(i,1);
  }
 }
 if(g.orbs.filter(o=>!o.red).length<20){const a=g.serial*2.399963,r=140+(g.serial%3)*43,x=Math.cos(a)*r,y=Math.sin(a)*r;g.serial++;if(Math.hypot(x-g.x,y-g.y)>75&&!g.orbs.some(o=>Math.hypot(x-o.x,y-o.y)<35))g.orbs.push({x,y,r:9,red:false,id:g.serial});}
 g.trail.push({x:g.x,y:g.y});if(g.trail.length>22)g.trail.shift();
}
