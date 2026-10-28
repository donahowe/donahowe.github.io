"use client";import{c as J,d as $e,e as be}from"./chunk-chunk-KV243DUA.js";var m=J($e(),1);var Z=J(be(),1),qe=24e5,k=4,Me={"top-left":{anchor:[0,-.2],dir:[0,1]},"top-center":{anchor:[.5,-.2],dir:[0,1]},"top-right":{anchor:[1,-.2],dir:[0,1]},left:{anchor:[-.2,.5],dir:[1,0]},right:{anchor:[1.2,.5],dir:[-1,0]},"bottom-left":{anchor:[0,1.2],dir:[0,-1]},"bottom-center":{anchor:[.5,1.2],dir:[0,-1]},"bottom-right":{anchor:[1,1.2],dir:[0,-1]}},Ke=`#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`,We=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uScale;
uniform float uTime;
uniform vec2 uSource;
uniform vec2 uAim;
uniform float uReach;
uniform vec3 uColor;
uniform float uSpread;
uniform float uLength;
uniform float uFade;
uniform float uSaturation;
uniform float uPulsating;
uniform float uNoise;
uniform float uDistortion;
uniform float uDensity;
uniform float uSharpness;
uniform float uGlow;
uniform float uHaze;
uniform float uAtmosphere;
uniform float uIntensity;
uniform vec4 uShadow;
uniform vec4 uPulses[${k}];
uniform vec2 uIntro;
uniform float uLight;
uniform float uOpacity;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), w.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), w.x), w.y);
}

float shape(float strength, float width) {
  float edge = max(mix(0.5, 0.08, uSharpness), width);
  return mix(strength, smoothstep(0.62 - edge, 0.62 + edge, strength), uSharpness);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) / uScale;
  vec2 delta = coord - uSource;
  float distance = length(delta);
  vec2 dir = delta / max(distance, 1e-4);
  float cosAngle = dot(dir, uAim);
  float angle = cosAngle + uDistortion * sin(uTime * 2.0 + distance * 0.02) * 0.2;
  float slope = fwidth(angle);
  float depth = distance / uReach;

  float source = exp(-depth * depth * 9.0) * 0.9 + exp(-depth * 3.2) * 0.25;
  float glowLight = uGlow * source * smoothstep(-0.2, 0.6, cosAngle);
  float spread = pow(max(angle, 0.0), 1.0 / uSpread);
  float lengthFalloff = clamp(1.0 - distance / (uReach * uLength), 0.0, 1.0);
  float fadeFalloff = clamp(1.0 - distance / (uReach * uFade), 0.5, 1.0);
  float envelope = spread * lengthFalloff * fadeFalloff;
  float reveal = uIntensity * uIntro.y * (1.0 - smoothstep(uIntro.x - 0.35, uIntro.x, depth));
  if ((envelope * 1.6 + glowLight) * reveal < 0.0015) {
    fragColor = vec4(0.0);
    return;
  }

  float phaseA = angle * 36.2214 * uDensity + uTime * 1.5;
  float phaseB = -angle * 21.11349 * uDensity + uTime * 1.5;
  float phaseC = angle * 22.3991 * uDensity + uTime * 1.1;
  float phaseD = -angle * 18.0234 * uDensity + uTime * 1.1;
  float strengthA = clamp(0.75 + 0.15 * sin(phaseA) + 0.2 * cos(phaseB), 0.0, 1.0);
  float strengthB = clamp(0.75 + 0.15 * sin(phaseC) + 0.2 * cos(phaseD), 0.0, 1.0);
  float widthA = abs(0.15 * 36.2214 * cos(phaseA) + 0.2 * 21.11349 * sin(phaseB)) * uDensity * slope;
  float widthB = abs(0.15 * 22.3991 * cos(phaseC) + 0.2 * 18.0234 * sin(phaseD)) * uDensity * slope;
  float pulseA = uPulsating > 0.5 ? 0.8 + 0.2 * sin(uTime * 4.5) : 1.0;
  float pulseB = uPulsating > 0.5 ? 0.8 + 0.2 * sin(uTime * 3.3) : 1.0;
  float rayLight = envelope * (0.5 * shape(strengthA, widthA) * pulseA + 0.4 * shape(strengthB, widthB) * pulseB);

  if (uHaze > 0.0) {
    float around = atan(uAim.x * dir.y - uAim.y * dir.x, cosAngle);
    vec2 drift = vec2(around * 2.2 + uTime * 0.035, depth * 2.6 - uTime * 0.11);
    float fog = 0.65 * valueNoise(drift * vec2(3.0, 1.0)) + 0.35 * valueNoise(drift * vec2(7.0, 2.3) + 4.1);
    rayLight *= mix(1.0, 0.25 + 1.2 * fog, uHaze);
  }

  if (uShadow.z > 0.0) {
    vec2 toCursor = uShadow.xy - uSource;
    float cursorDistance = length(toCursor);
    float along = dot(delta, toCursor) / max(cursorDistance * cursorDistance, 1e-4);
    float side = abs(delta.x * toCursor.y - delta.y * toCursor.x) / max(cursorDistance, 1e-4);
    float trail = max(along - 1.0, 0.0);
    float width = uShadow.w * along + 0.22 * trail * cursorDistance;
    float behind = smoothstep(0.97, 1.25, along) * exp(-trail * 1.1);
    float shade = (1.0 - smoothstep(width * 0.3, width * 1.6, side)) * behind;
    rayLight *= 1.0 - uShadow.z * 0.62 * shade;
  }

  float boost = 0.0;
  for (int i = 0; i < ${k}; i++) {
    vec4 wave = uPulses[i];
    if (wave.z <= 0.0) continue;
    float x = (depth - wave.x) / wave.y;
    boost += wave.z * exp(-x * x);
  }
  float light = (rayLight * (1.0 + boost) + glowLight) * reveal;

  if (uNoise > 0.0) {
    float n = fract(sin(dot(coord * 0.02 + uTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453123);
    light *= 1.0 - uNoise + uNoise * n;
  }

  float near = clamp(1.2 - distance / (uResolution.y / uScale), 0.0, 1.0);
  vec3 tint = mix(vec3(0.9), vec3(0.1, 0.3, 0.5) + near * vec3(0.8, 0.6, 0.5), uAtmosphere);
  float gray = dot(tint, vec3(0.299, 0.587, 0.114));
  vec3 hue = max(mix(vec3(gray), tint, uSaturation), 0.0) * uColor;

  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  if (uLight > 0.5) {
    vec3 color = hue * light;
    float energy = max(color.r, max(color.g, color.b));
    vec3 tone = clamp(1.0 - (1.0 - hue / max(max(hue.r, max(hue.g, hue.b)), 1e-4)) * 1.8, 0.0, 1.0);
    float warm = clamp((min(tone.r, tone.g) - tone.b) * 2.0, 0.0, 1.0);
    vec3 ink = tone * (mix(0.66, 0.94, warm) - 0.1 * smoothstep(0.4, 1.2, energy));
    float density = clamp(0.82 * (1.0 - exp(-1.5 * energy * energy)) * uOpacity + grain, 0.0, 1.0);
    fragColor = vec4(ink * density, density);
    return;
  }
  float level = light < 0.75 ? light : 0.75 + 0.25 * (1.0 - exp(-(light - 0.75) / 0.25));
  float top = max(hue.r, max(hue.g, hue.b));
  hue = mix(hue, vec3(top), smoothstep(0.8, 1.0, level) * 0.45);
  vec3 shown = clamp(hue * level, 0.0, 1.0) * level;
  fragColor = vec4(clamp(shown + grain, 0.0, level) * uOpacity, level * uOpacity);
}`,f=(o,a,s)=>Math.min(s,Math.max(a,o)),Je=o=>{let a=String(o||"").trim(),s=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(a);if(s){let v=s[1].length===3?s[1].replace(/./g,p=>p+p):s[1];return[0,2,4].map(p=>parseInt(v.slice(p,p+2),16)/255)}let n=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(a);return n?[n[1],n[2],n[3]].map(v=>f(parseFloat(v)/255,0,1)):null},Le=(o,a,s)=>{let n=o.createShader(a);return n?(o.shaderSource(n,s),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)?n:(console.error(o.getShaderInfoLog(n)),o.deleteShader(n),null)):null},Qe=o=>{let a=Le(o,o.VERTEX_SHADER,Ke),s=Le(o,o.FRAGMENT_SHADER,We),n=a&&s?o.createProgram():null;if(!a||!s||!n)return a&&o.deleteShader(a),s&&o.deleteShader(s),null;if(o.attachShader(n,a),o.attachShader(n,s),o.linkProgram(n),o.deleteShader(a),o.deleteShader(s),!o.getProgramParameter(n,o.LINK_STATUS))return console.error(o.getProgramInfoLog(n)),o.deleteProgram(n),null;let v={},p=o.getProgramParameter(n,o.ACTIVE_UNIFORMS);for(let P=0;P<p;P++){let C=o.getActiveUniform(n,P);C&&(v[C.name.replace(/\[0\]$/,"")]=o.getUniformLocation(n,C.name))}return{program:n,uniforms:v}},Q=o=>{let a=f(o,0,1);return a*a*a*(a*(a*6-15)+10)},Ze=({raysOrigin:o="top-center",raysColor:a="#ffffff",raysSpeed:s=1,lightSpread:n=.5,rayLength:v=3,rayDensity:p=1,tilt:P=0,raySharpness:C=.35,glow:Ae=.6,haze:Ee=.25,atmosphere:Re=1,intensity:Pe=1,pulsating:Ce=!1,fadeDistance:De=1,saturation:Te=1,followMouse:Ie=!0,mouseInfluence:Fe=.1,cursorShadow:_e=!0,clickPulse:Ne=!0,noiseAmount:ze=0,distortion:Be=0,intro:Oe=!0,lightMode:Xe=!1,opacity:Ge=1,maxDevicePixelRatio:Ue=2,className:j="",style:Ve})=>{let ee=(0,m.useRef)(null),te=(0,m.useRef)(null),H=(0,m.useRef)(null),[oe,ke]=(0,m.useState)(0),ne={origin:Me[o]||Me["top-center"],color:Je(a)||[1,1,1],speed:Math.max(0,s),spread:Math.max(.001,n),length:Math.max(.01,v),density:f(p,.1,6),tilt:f(P,-90,90)*Math.PI/180,sharpness:f(C,0,1),glow:Math.max(0,Ae),haze:f(Ee,0,1),atmosphere:f(Re,0,1),intensity:Math.max(0,Pe),pulsating:Ce,fade:Math.max(.01,De),saturation:Math.max(0,Te),follow:Ie,influence:f(Fe,0,1),cursorShadow:_e,clickPulse:Ne,noise:f(ze,0,1),distortion:Be,intro:Oe,light:Xe,opacity:f(Ge,0,1),maxRatio:f(Ue,.5,3)},D=(0,m.useRef)(ne);return D.current=ne,(0,m.useEffect)(()=>{H.current?.()}),(0,m.useEffect)(()=>{let T=ee.current,u=te.current;if(!T||!u)return;let t=u.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"}),_=t?Qe(t):null;if(!t||!_)return;let N=window.matchMedia("(prefers-reduced-motion: reduce)").matches,ie=t.createVertexArray(),L={width:1,height:1,ratio:1},c={x:.5,y:.5,inside:!1,seen:!1},x={x:.5,y:.5},l={x:.5,y:.5,presence:0},g=[],I=new Float32Array(k*4),re=0,A=D.current.intro&&!N&&oe===0?0:1,y=0,z=0,Y=!0,$=document.visibilityState!=="hidden",q=!1,K=()=>{let i=D.current,e=T.getBoundingClientRect(),h=Math.max(1,e.width),E=Math.max(1,e.height),O=i.density*(.35+.65*i.sharpness),X=Math.max(f(.35+.3*O,.5,2),i.noise>0?1:0),F=Math.min(window.devicePixelRatio||1,i.maxRatio,X,Math.sqrt(qe/(h*E))),S=Math.max(1,Math.round(h*F)),b=Math.max(1,Math.round(E*F));(u.width!==S||u.height!==b)&&(u.width=S,u.height=b),L.width=h,L.height=E,L.ratio=S/h},ae=i=>{if(y=0,q)return;let e=D.current,h=f((i-z)/1e3||0,0,.05);z=Math.max(z,i),re+=h*e.speed*(N?.35:1),A<1&&(A=Math.min(1,A+h/1.8));let E=1-Math.exp(-h/.2),O=e.follow&&c.seen?c.x:.5,X=e.follow&&c.seen?c.y:.5;x.x+=(O-x.x)*E,x.y+=(X-x.y)*E;let F=1-Math.exp(-h/.08);l.x+=(c.x-l.x)*F,l.y+=(c.y-l.y)*F;let S=c.inside&&e.cursorShadow&&!N;l.presence+=((S?1:0)-l.presence)*(1-Math.exp(-h/(S?.25:.5)));for(let d=g.length-1;d>=0;d--)g[d].age+=h,g[d].age>=2&&g.splice(d,1);I.fill(0),g.forEach((d,R)=>{let M=d.age;I[R*4]=.05+M*1.05,I[R*4+1]=.14+M*.14,I[R*4+2]=.9*Q(M/.15)*(1-Q(M/2))});let b=L.width,G=L.height,pe=e.origin.anchor[0]*b,ge=e.origin.anchor[1]*G,ve=Math.cos(e.tilt),xe=Math.sin(e.tilt),U=e.origin.dir[0]*ve-e.origin.dir[1]*xe,V=e.origin.dir[0]*xe+e.origin.dir[1]*ve;if(e.follow&&e.influence>0){let d=x.x*b-pe,R=x.y*G-ge,M=Math.hypot(d,R)||1,we=U+(d/M-U)*e.influence,ye=V+(R/M-V)*e.influence,Se=Math.hypot(we,ye)||1;U=we/Se,V=ye/Se}let He=1-Math.pow(1-A,3);t.viewport(0,0,u.width,u.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(_.program),t.bindVertexArray(ie);let r=_.uniforms;t.uniform2f(r.uResolution,u.width,u.height),t.uniform1f(r.uScale,L.ratio),t.uniform1f(r.uTime,re),t.uniform2f(r.uSource,pe,ge),t.uniform2f(r.uAim,U,V),t.uniform1f(r.uReach,Math.max(b,G)),t.uniform3f(r.uColor,e.color[0],e.color[1],e.color[2]),t.uniform1f(r.uSpread,e.spread),t.uniform1f(r.uLength,e.length),t.uniform1f(r.uFade,e.fade),t.uniform1f(r.uSaturation,e.saturation),t.uniform1f(r.uPulsating,e.pulsating?1:0),t.uniform1f(r.uNoise,e.noise),t.uniform1f(r.uDistortion,e.distortion),t.uniform1f(r.uDensity,e.density),t.uniform1f(r.uSharpness,e.sharpness),t.uniform1f(r.uGlow,e.glow),t.uniform1f(r.uHaze,e.haze),t.uniform1f(r.uAtmosphere,e.atmosphere),t.uniform1f(r.uIntensity,e.intensity),t.uniform4f(r.uShadow,l.x*b,l.y*G,l.presence,16),t.uniform4fv(r.uPulses,I),t.uniform2f(r.uIntro,He*2.6,Q(A/.5)),t.uniform1f(r.uLight,e.light?1:0),t.uniform1f(r.uOpacity,e.opacity),t.drawArrays(t.TRIANGLES,0,3);let Ye=Math.abs(x.x-O)>1e-4||Math.abs(x.y-X)>1e-4||l.presence>.001&&Math.abs(l.x-c.x)+Math.abs(l.y-c.y)>1e-4||Math.abs((S?1:0)-l.presence)>.001||g.length>0;(e.speed>0||A<1||Ye)&&Y&&$&&(y=requestAnimationFrame(ae))},w=()=>{y||q||!Y||!$||(z=performance.now(),y=requestAnimationFrame(ae))};H.current=()=>{K(),w()};let se=i=>{let e=T.getBoundingClientRect();return{x:(i.clientX-e.left)/Math.max(1,e.width),y:(i.clientY-e.top)/Math.max(1,e.height),inside:i.clientX>=e.left&&i.clientX<=e.right&&i.clientY>=e.top&&i.clientY<=e.bottom}},ce=i=>{let e=se(i);!c.inside&&e.inside&&(l.x=e.x,l.y=e.y),c.x=e.x,c.y=e.y,c.inside=e.inside,c.seen=!0,w()},le=i=>{let e=D.current;!se(i).inside||!e.clickPulse||N||(g.push({age:0}),g.length>k&&g.shift(),w())},W=()=>{c.inside=!1,w()},B=i=>{i.pointerType!=="mouse"&&W()};window.addEventListener("pointermove",ce,{passive:!0}),window.addEventListener("pointerdown",le,{passive:!0}),window.addEventListener("pointerup",B,{passive:!0}),window.addEventListener("pointercancel",B,{passive:!0}),document.documentElement.addEventListener("pointerleave",W);let ue=i=>{i.preventDefault(),q=!0,cancelAnimationFrame(y),y=0},fe=()=>ke(i=>i+1);u.addEventListener("webglcontextlost",ue),u.addEventListener("webglcontextrestored",fe);let he=new ResizeObserver(()=>{K(),w()});he.observe(T);let de=new IntersectionObserver(i=>{Y=i.some(e=>e.isIntersecting),w()});de.observe(T);let me=()=>{$=document.visibilityState!=="hidden",w()};return document.addEventListener("visibilitychange",me),K(),w(),()=>{cancelAnimationFrame(y),H.current=null,he.disconnect(),de.disconnect(),window.removeEventListener("pointermove",ce),window.removeEventListener("pointerdown",le),window.removeEventListener("pointerup",B),window.removeEventListener("pointercancel",B),document.documentElement.removeEventListener("pointerleave",W),document.removeEventListener("visibilitychange",me),u.removeEventListener("webglcontextlost",ue),u.removeEventListener("webglcontextrestored",fe),t.isContextLost()||(t.deleteVertexArray(ie),t.deleteProgram(_.program))}},[oe]),(0,Z.jsx)("div",{ref:ee,className:`light-rays${j?` ${j}`:""}`,style:Ve,children:(0,Z.jsx)("canvas",{ref:te,className:"light-rays__canvas","aria-hidden":"true"})})},nt=Ze;export{nt as default};
