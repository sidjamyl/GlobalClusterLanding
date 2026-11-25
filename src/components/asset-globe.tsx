"use client";
import { useEffect, useRef } from "react";
import { Building2, Layers, Monitor } from "lucide-react";

const rad=Math.PI/180;
function project(latitude:number,longitude:number){
  const x=Math.cos(latitude*rad)*Math.sin(longitude*rad);
  const y=-Math.sin(latitude*rad);
  const z=Math.cos(latitude*rad)*Math.cos(longitude*rad);
  const tilt=12*rad;
  return {x:100+87*x,y:100+87*(y*Math.cos(tilt)+z*Math.sin(tilt)),visible:z*Math.cos(tilt)-y*Math.sin(tilt)>=0};
}
const latitudes=[-64,-32,0,32,64];
const longitudes=[-150,-120,-90,-60,-30,0,30,60,90,120,150,180];
const grid=[
  ...latitudes.map(lat=>Array.from({length:121},(_,i)=>[lat,i*3-180])),
  ...longitudes.map(lon=>Array.from({length:61},(_,i)=>[i*3-90,lon]))
];
function frontPath(points:number[][],angle:number){
  let pen=false;
  return points.map(([lat,lon])=>{
    const p=project(lat,lon+angle);
    if(!p.visible){pen=false;return "";}
    const token=(pen?"L":"M")+p.x.toFixed(1)+" "+p.y.toFixed(1);
    pen=true;return token;
  }).join("");
}
const sites=[{lat:27,lon:-34,Icon:Building2},{lat:36,lon:45,Icon:Layers},{lat:-42,lon:-51,Icon:Monitor}];

export function AssetGlobe(){
  const ref=useRef<SVGSVGElement>(null);
  useEffect(()=>{
    const svg=ref.current;
    if(!svg)return;
    const paths=svg.querySelectorAll<SVGPathElement>("[data-line]");
    const marks=svg.querySelectorAll<SVGGElement>("[data-mark]");
    let frame=0;
    function draw(angle:number){
      grid.forEach((points,i)=>paths[i].setAttribute("d",frontPath(points,angle)));
      sites.forEach(({lat,lon},i)=>{const p=project(lat,lon+angle);marks[i].setAttribute("transform",`translate(${p.x} ${p.y})`);});
    }
    const motion=matchMedia("(prefers-reduced-motion: reduce)");
    const observer=new IntersectionObserver(([entry])=>{
      cancelAnimationFrame(frame);
      if(!entry.isIntersecting||motion.matches){draw(0);return;}
      const start=performance.now();
      let last=0;
      function tick(now:number){
        const t=Math.min(1,(now-start)/6500);
        if(now-last>=40||t===1){draw(-18+40*(1-Math.cos(t*Math.PI))/2);last=now;}
        if(t<1&&!motion.matches)frame=requestAnimationFrame(tick);
      }
      frame=requestAnimationFrame(tick);
    },{threshold:.2});
    observer.observe(svg);
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
  },[]);
  return <div className="asset-globe" aria-hidden="true"><svg ref={ref} viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="87" fill="none" stroke="currentColor" strokeOpacity=".7" strokeWidth=".65"/>
    {grid.map((points,i)=><path key={i} data-line="" d={frontPath(points,0)} fill="none" stroke="currentColor" strokeOpacity=".48" strokeWidth=".55"/>)}
    {sites.map(({lat,lon,Icon})=>{const p=project(lat,lon);return <g key={lon} data-mark="" transform={`translate(${p.x} ${p.y})`}>
      <circle r="6.5" fill="#f3dcbe" stroke="#fff3e4" strokeWidth="1"/><Icon x="-4.5" y="-4.5" width="9" height="9" color="#833e2c" strokeWidth="2"/>
    </g>;})}
  </svg></div>;
}
