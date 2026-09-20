export type Orb = { angle:number; height:number; red:boolean; taken:boolean };
export const angleDistance=(a:number,b:number)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
export function createGame(){return {angle:Math.PI/2,height:0,velocity:215,floor:0,camera:0,score:0,dead:false,orbs:[] as Orb[],next:70,seed:Math.PI/2};}
export type Game = ReturnType<typeof createGame>;
export function populate(g:Game){while(g.next<g.height+650){g.orbs.push({angle:g.seed,height:g.next,red:false,taken:false},{angle:g.seed+1.1,height:g.next+25,red:true,taken:false},{angle:g.seed-1.6,height:g.next+12,red:true,taken:false});g.next+=75;g.seed+=Math.sin(g.next*.012)*.58;}}
export function step(g:Game,dt:number,direction:number){
 if(g.dead)return;dt=Math.min(dt,.025);const old=g.height;g.angle+=direction*2.6*dt;g.velocity-=310*dt;g.height+=g.velocity*dt;
 if(g.height<g.floor){g.height=g.floor;g.velocity=215;}
 populate(g);
 for(const o of g.orbs){if(o.taken||angleDistance(g.angle,o.angle)>.19)continue;const low=Math.min(old,g.height)-14,high=Math.max(old,g.height)+14;if(o.height<low||o.height>high)continue;
 if(o.red){g.dead=true;return;}o.taken=true;g.score+=10;g.floor=Math.max(g.floor,o.height);g.velocity=Math.min(275,235+g.score*.12);
 }
 g.camera+=(Math.max(0,g.height-80)-g.camera)*Math.min(1,dt*4);
 g.orbs=g.orbs.filter(o=>o.height>g.floor-130);
}

