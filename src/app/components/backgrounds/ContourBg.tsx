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
  vec2 i=floor(p), f=fract(p);
  float a=h(i),b=h(i+vec2(1,0)),c=h(i+vec2(0,1)),d=h(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){v+=a*vn(p);p*=2.0;a*=0.5;} return v; }
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y*2.0;
  uv += (uMouse-0.5)*0.5;
  vec2 q=vec2(fbm(uv+uTime*0.04), fbm(uv+vec2(5.2,1.3)+uTime*0.04));
  vec2 r=vec2(fbm(uv+3.0*q+vec2(1.7,9.2)), fbm(uv+3.0*q+vec2(8.3,2.8)));
  float f=fbm(uv+3.0*r);
  float bands=abs(fract(f*6.0)-0.5);
  float line=1.0-smoothstep(0.0,0.06,bands);
  vec3 bg=mix(vec3(0.03,0.04,0.06),vec3(0.01,0.02,0.04),length(uv)*0.4);
  vec3 accent=vec3(0.83,0.66,0.34);
  vec3 col=mix(bg,accent,line*0.85);
  col+=accent*line*line*0.4;
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

export default function ContourBg(){
  return <Canvas gl={{antialias:false}} dpr={[1,2]}><Quad/></Canvas>
}
