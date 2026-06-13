const clock=document.getElementById("clock");
setInterval(()=>clock.textContent=new Date().toLocaleTimeString(),1000);

const canvas=document.getElementById("indexRain");
const ctx=canvas.getContext("2d");
let w,h,cols,drops,size=16;

const glyphs=["BI","0001","0002","0003","0004","ORION","DAGGER","SABLE","NULL","AUTH","FILE","INDEX","SIG","GRID","██","01","7","CUTOUT","ARCHIVE","REDACT","ACTIVE","SEALED","LOCKED","MIRROR"];
const rare=["THE TARGET WAS NEVER THE TARGET","REALITY WAS THE DAMAGED SYSTEM","NOBODY AUTHORIZED THE ORDER","THE LOGS NEVER STOPPED","CORRELATION EVENT DETECTED","BLACK INDEX IS WATCHING THE FILES"];

function resize(){
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
  cols=Math.floor(w/size);
  drops=Array(cols).fill(0).map(()=>Math.random()*h/size);
}
resize();
addEventListener("resize",resize);

function pick(a){return a[Math.floor(Math.random()*a.length)]}

function draw(){
  ctx.fillStyle="rgba(0,0,0,.085)";
  ctx.fillRect(0,0,w,h);
  ctx.font=size+"px Consolas, monospace";
  for(let i=0;i<drops.length;i++){
    const x=i*size, y=drops[i]*size;
    const isRare=Math.random()<0.006, isHot=Math.random()<0.0015;
    const text=isHot?pick(rare):(isRare?pick(["BI-0001","BI-0002","BI-0003","BI-0004"]):pick(glyphs));
    if(isHot){ctx.fillStyle="rgba(255,176,0,.96)";ctx.shadowColor="#ffb000";ctx.shadowBlur=16;}
    else if(isRare){ctx.fillStyle="rgba(255,49,74,.88)";ctx.shadowColor="#ff314a";ctx.shadowBlur=12;}
    else{ctx.fillStyle="rgba(0,229,255,"+(0.16+Math.random()*0.28)+")";ctx.shadowBlur=0;}
    ctx.fillText(text,x,y);
    if(y>h && Math.random()>0.975)drops[i]=0;
    drops[i]+=isRare||isHot?.35:.74;
  }
  requestAnimationFrame(draw);
}
draw();

const lines=[
  "BOOTING PUBLIC MIRROR...",
  "LOADING INCIDENT CATALOG...",
  "BI-0001 // ORION // EXTERNAL NODE // RECOVERED",
  "BI-0002 // GLASS DAGGER // ACTIVE",
  "BI-0003 // SABLE YARD // SEALED",
  "BI-0004 // NULL AUTHORITY // LOCKED",
  "CORRELATION WARNING: INCIDENTS SHARE AN UNDISCLOSED INDEX.",
  "PUBLIC MIRROR STABLE."
];
const log=document.getElementById("archiveLog");
let i=0;
function typeLine(){
  if(i>=lines.length)return;
  log.textContent+=lines[i]+"\n";
  i++;
  setTimeout(typeLine,450+Math.random()*500);
}
setTimeout(typeLine,600);

setInterval(()=>{
  const pulse=document.getElementById("pulse");
  if(Math.random()<.18){
    pulse.textContent=pick(["SIGNAL BLEED","CORRELATION SPIKE","FILE MOVED","EXTERNAL NODE PING"]);
    pulse.style.color="#ff314a";
    document.body.style.filter="brightness(1.4) contrast(1.2)";
    setTimeout(()=>{pulse.textContent="SIGNAL CLEAN";pulse.style.color="";document.body.style.filter="";},600);
  }
},3000);
