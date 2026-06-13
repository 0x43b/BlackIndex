const clock=document.getElementById("clock");setInterval(()=>clock.textContent=new Date().toLocaleTimeString(),1000);
const canvas=document.getElementById("indexRain"),ctx=canvas.getContext("2d");let w,h,cols,drops,size=16;
const glyphs=["BI","0001","0002","0003","0004","0005","0006","0007","ORION","DAGGER","SABLE","NULL","DEAD","THRESH","HOLLOW","AUTH","FILE","INDEX","SIG","GRID","██","01","7","CUTOUT","ARCHIVE","REDACT","ACTIVE","SEALED","LOCKED","MIRROR"];
const rare=["THE TARGET WAS NEVER THE TARGET","REALITY WAS THE DAMAGED SYSTEM","NOBODY AUTHORIZED THE ORDER","THE LOGS NEVER STOPPED","CORRELATION EVENT DETECTED","BLACK INDEX IS WATCHING THE FILES","COMPARTMENT ZERO MISSING"];
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;cols=Math.floor(w/size);drops=Array(cols).fill(0).map(()=>Math.random()*h/size)}resize();addEventListener("resize",resize);
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function draw(){ctx.fillStyle="rgba(0,0,0,.085)";ctx.fillRect(0,0,w,h);ctx.font=size+"px Consolas, monospace";for(let i=0;i<drops.length;i++){const x=i*size,y=drops[i]*size,isRare=Math.random()<0.006,isHot=Math.random()<0.0015,text=isHot?pick(rare):(isRare?pick(["BI-0001","BI-0002","BI-0003","BI-0004","BI-0005","BI-0006","BI-0007"]):pick(glyphs));if(isHot){ctx.fillStyle="rgba(255,176,0,.96)";ctx.shadowColor="#ffb000";ctx.shadowBlur=16}else if(isRare){ctx.fillStyle="rgba(255,49,74,.88)";ctx.shadowColor="#ff314a";ctx.shadowBlur=12}else{ctx.fillStyle="rgba(0,229,255,"+(0.16+Math.random()*0.28)+")";ctx.shadowBlur=0}ctx.fillText(text,x,y);if(y>h&&Math.random()>0.975)drops[i]=0;drops[i]+=isRare||isHot?.35:.74}requestAnimationFrame(draw)}draw();
const log=document.getElementById("archiveLog");function write(t){log.textContent+=t+"\n";log.scrollTop=log.scrollHeight}
function mark(file){localStorage.setItem("bi_seen_"+file,"true");updateClearance()}
document.querySelectorAll("[data-file]").forEach(a=>a.addEventListener("click",()=>mark(a.dataset.file)));
function clearance(){let c=0;["orion","glass","sable","null"].forEach(f=>{if(localStorage.getItem("bi_seen_"+f)==="true")c++});return c}
function updateClearance(){document.getElementById("clearanceLevel").textContent=clearance()}
updateClearance();
const boot=["BOOTING PUBLIC MIRROR...","LOADING INCIDENT CATALOG...","BI-0001 // ORION // EXTERNAL NODE // RECOVERED","BI-0002 // GLASS DAGGER // ACTIVE","BI-0003 // SABLE YARD // SEALED","BI-0004 // NULL AUTHORITY // LOCKED","BI-0005 // DEAD LETTER // NOT YET RECOVERED","BI-0006 // THRESHOLD // PENDING CORRELATION","BI-0007 // HOLLOW SIGNAL // SIGNAL ABSENT","PUBLIC MIRROR STABLE."];let bi=0;function bootLine(){if(bi>=boot.length)return;write(boot[bi++]);setTimeout(bootLine,260+Math.random()*420)}setTimeout(bootLine,500);
const form=document.getElementById("indexCommand"),input=document.getElementById("indexInput");
const cmds={
index:()=>`BI-0001 ORION ............ RECOVERED / EXTERNAL
BI-0002 GLASS DAGGER ..... ACTIVE
BI-0003 SABLE YARD ....... SEALED
BI-0004 NULL AUTHORITY ... LOCKED
BI-0005 DEAD LETTER ...... NOT YET RECOVERED
BI-0006 THRESHOLD ........ PENDING CORRELATION
BI-0007 HOLLOW SIGNAL .... SIGNAL ABSENT`,
correlation:()=>`CORRELATION EVENT DETECTED.

ORION phrase contamination found in GLASS DAGGER.
SABLE YARD timestamp overlaps with GLASS DAGGER.
NULL AUTHORITY appears in no chain of command.

SHARED PATTERN:
The system acted before authorization.`,
clearance:()=>`CLEARANCE LEVEL: ${clearance()}

1 = viewed one incident channel
2 = cross-incident observer
3 = archive participant
4 = correlation subject`,
origin:()=>`SOURCE FILE MISSING.

COMPARTMENT ZERO was referenced before BI-0001 existed.`,
deadletter:()=>`BI-0005 DEAD LETTER

Messages that should never have arrived.

STATUS:
NOT YET RECOVERED`,
threshold:()=>`BI-0006 THRESHOLD

Something crossed over.
Nobody noticed.

STATUS:
PENDING CORRELATION`,
"hollow signal":()=>`BI-0007 HOLLOW SIGNAL

The transmission was received.
There was no transmitter.

STATUS:
SIGNAL ABSENT`,
sable:()=>`BI-0003 SABLE YARD

FACILITY STATUS:
SEALED

EXTERNAL DOMAIN:
sableyard.xyz`,
null:()=>`BI-0004 NULL AUTHORITY

AUTHORIZATION SOURCE:
UNKNOWN

CHAIN OF COMMAND:
NULL`
};
form.addEventListener("submit",e=>{e.preventDefault();const cmd=input.value.trim().toLowerCase();if(!cmd)return;write("> "+input.value);write((cmds[cmd]||(()=> "UNKNOWN INDEX QUERY. THE MIRROR STILL LOGGED IT."))());input.value=""});
setInterval(()=>{const pulse=document.getElementById("pulse");if(Math.random()<.18){pulse.textContent=pick(["SIGNAL BLEED","CORRELATION SPIKE","FILE MOVED","EXTERNAL NODE PING"]);pulse.style.color="#ff314a";document.body.style.filter="brightness(1.4) contrast(1.2)";setTimeout(()=>{pulse.textContent="SIGNAL CLEAN";pulse.style.color="";document.body.style.filter=""},600)}},3000);
