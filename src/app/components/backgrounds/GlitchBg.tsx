'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const vert = `void main(){ gl_Position = vec4(position, 1.0); }`
const frag = `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vn(vec2 p){
  vec2 i=floor(p),f=fract(p);
  float a=h(i),b=h(i+vec2(1,0)),c=h(i+vec2(0,1)),d=h(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float warp=sin(uv.y*40.0+uTime*2.0)*0.004 + sin(uv.y*7.0+uTime*0.8)*0.01;
  uv.x+=warp;
  vec2 p=(uv-0.5)*2.0;
  float r=length(p);
  vec3 base=mix(vec3(0.05,0.02,0.03), vec3(0.48,0.12,0.17), smoothstep(1.0,0.2,r));
  base=mix(base, vec3(0.96,0.93,0.88), smoothstep(0.55,0.0,r)*0.3);
  base+=(vn(uv*800.0+uTime)-0.5)*0.06;
  vec2 dir=uv-0.5;
  float ca=0.006*r;
  vec3 col;
  col.r=base.r+ca*1.5;
  col.g=base.g;
  col.b=base.b-ca*1.5;
  col*=0.94+0.06*sin(uv.y*uRes.y*1.5+uTime*12.0);
  col*=smoothstep(1.3,0.3,r);
  gl_FragColor=vec4(col,1.0);
}`

function Quad(){
  const { size, pointer } = useThree()
  const u = useRef({
    uTime:{value:0}, uRes:{value:new THREE.Vector2(size.width,size.height)},
    uMouse:{value:new THREE.Vector2(0.5,0.5)},
  })
  useFrame((s)=>{
    u.current.uTime.value=s.clock.elapsedTime
    u.current.uRes.value.set(size.width,size.height)
    u.current.uMouse.value.set(pointer.x*0.5+0.5, pointer.y*0.5+0.5)
  })
  return (
    <mesh>
      <planeGeometry args={[2,2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={u.current}/>
    </mesh>
  )
}

export default function GlitchBg(){
  return <Canvas gl={{antialias:false}} dpr={[1,2]}><Quad/></Canvas>
}
