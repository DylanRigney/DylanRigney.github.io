'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const vert = `void main(){ gl_Position = vec4(position, 1.0); }`
const frag = `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
float smin(float a, float b, float k){
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b,a,h)-k*h*(1.0-h);
}
float sdSphere(vec3 p, float r){ return length(p)-r; }
float map(vec3 p){
  float d = 1e9;
  for(int i=0;i<5;i++){
    float fi=float(i); float t=uTime*0.4+fi*1.7;
    vec3 c = vec3(sin(t)*1.3, cos(t*0.8)*1.0, sin(t*0.6)*1.2)
           + vec3(uMouse*0.5, 0.0);
    d = smin(d, sdSphere(p-c, 0.6), 0.7);
  }
  return d;
}
vec3 calcNormal(vec3 p){
  vec2 e=vec2(0.001,0.0);
  return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy), map(p+e.yyx)-map(p-e.yyx)));
}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;
  vec3 ro=vec3(0.0,0.0,4.0);
  vec3 rd=normalize(vec3(uv,-1.5));
  float t=0.0; bool hit=false;
  for(int i=0;i<80;i++){
    float d=map(ro+rd*t);
    if(d<0.001){hit=true;break;}
    t+=d; if(t>12.0)break;
  }
  vec3 bg=mix(vec3(0.04,0.04,0.06),vec3(0.01,0.01,0.02),length(uv));
  vec3 col=bg;
  if(hit){
    vec3 p=ro+rd*t; vec3 n=calcNormal(p);
    vec3 ld=normalize(vec3(0.6,0.8,0.5));
    float diff=max(dot(n,ld),0.0);
    float sh=1.0, st=0.02;
    for(int i=0;i<24;i++){
      float h=map(p+ld*st);
      if(h<0.001){sh=0.0;break;}
      sh=min(sh,8.0*h/st); st+=h; if(st>4.0)break;
    }
    float ao=0.0, aa=0.05;
    for(int i=0;i<5;i++){ ao+=max(map(p+n*aa)/aa,0.0); aa*=2.0; }
    ao=clamp(1.0-ao/5.0,0.0,1.0);
    vec3 base=mix(vec3(0.10,0.08,0.12),vec3(1.0,0.72,0.42),diff*sh);
    col=base*ao+vec3(0.02);
    col=mix(bg,col,1.0-1.0/(1.0+t*0.3));
  }
  col = min(col * 2.0, 1.0); // Brighten the graphic
  gl_FragColor=vec4(col,1.0);
}`

function Quad(){
  const { size, pointer } = useThree()
  const u = useRef({
    uTime:{value:0}, uRes:{value:new THREE.Vector2(size.width,size.height)},
    uMouse:{value:new THREE.Vector2()},
  })
  useFrame((s)=>{
    u.current.uTime.value = s.clock.elapsedTime
    u.current.uMouse.value.set(pointer.x*2, pointer.y*2)
    u.current.uRes.value.set(size.width, size.height)
  })
  return (
    <mesh>
      <planeGeometry args={[2,2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={u.current} />
    </mesh>
  )
}

export default function RaymarchBg(){
  return (
    <Canvas gl={{antialias:false, powerPreference:'high-performance'}} dpr={[1,2]}>
      <Quad/>
    </Canvas>
  )
}
