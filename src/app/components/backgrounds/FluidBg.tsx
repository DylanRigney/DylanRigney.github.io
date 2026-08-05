'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const vert = `void main(){ gl_Position = vec4(position, 1.0); }`
const frag = `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform vec2 uMouseVel;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vn(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=h(i), b=h(i+vec2(1,0)), c=h(i+vec2(0,1)), d=h(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){v+=a*vn(p);p*=2.0;a*=0.5;} return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=(uv-0.5)*vec2(uRes.x/uRes.y,1.0)*3.0;
  float n1=fbm(p*0.8+uTime*0.05);
  float n2=fbm(p*0.8+vec2(5.2,1.3)+uTime*0.05);
  vec2 vel=vec2(n2,n1)*2.0-1.0;
  vec2 m=(uMouse-0.5)*vec2(uRes.x/uRes.y,1.0)*3.0;
  vec2 toM=p-m;
  float md=dot(toM,toM);
  vel += vec2(-toM.y,toM.x)/(md+0.5) * clamp(length(uMouseVel)*40.0,0.0,3.0);
  vec2 q=p+vel*0.3;
  float dye=fbm(q*1.2+uTime*0.1);
  dye=pow(dye,1.8);
  vec3 c1=vec3(0.50,0.18,0.55);
  vec3 c2=vec3(1.00,0.18,0.53);
  vec3 c3=vec3(0.13,0.83,0.93);
  vec3 col=mix(c1,c2,clamp(dye*2.0,0.0,1.0));
  col=mix(col,c3,clamp((dye-0.4)*2.0,0.0,1.0));
  col*=0.55+0.45*dye;
  col=mix(vec3(0.02,0.01,0.03), col, 0.85);
  gl_FragColor=vec4(col,1.0);
}`

function Quad(){
  const { size, pointer } = useThree()
  const u = useRef({
    uTime:{value:0}, uRes:{value:new THREE.Vector2(size.width,size.height)},
    uMouse:{value:new THREE.Vector2(0.5,0.5)}, uMouseVel:{value:new THREE.Vector2()},
  })
  const last = useRef(new THREE.Vector2())
  useFrame((s)=>{
    u.current.uTime.value = s.clock.elapsedTime
    u.current.uRes.value.set(size.width, size.height)
    const mx = pointer.x*0.5+0.5, my = pointer.y*0.5+0.5
    u.current.uMouseVel.value.set(mx-last.current.x, my-last.current.y)
    last.current.set(mx,my)
    u.current.uMouse.value.set(mx,my)
  })
  return (
    <mesh>
      <planeGeometry args={[2,2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={u.current}/>
    </mesh>
  )
}

export default function FluidBg(){
  return <Canvas gl={{antialias:false}} dpr={[1,2]}><Quad/></Canvas>
}
