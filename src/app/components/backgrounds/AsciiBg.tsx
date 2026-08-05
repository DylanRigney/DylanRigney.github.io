'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

function useGlyphAtlas() {
  const atlas = useRef<THREE.Texture | null>(null)
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 512, 64)
    ctx.fillStyle = 'white'
    ctx.font = '48px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const chars = ' .:-=+*#%@'
    for (let i = 0; i < 10; i++) {
      ctx.fillText(chars[i], i * 51.2 + 25.6, 32)
    }
    const tex = new THREE.CanvasTexture(canvas)
    atlas.current = tex
  }, [])
  return atlas
}

const frag = `
uniform sampler2D uScene;
uniform sampler2D uAtlas;
uniform vec2 uRes;
uniform float uTime;
const float COLS = 140.0;
void main(){
  float aspect = uRes.x/uRes.y;
  float rows = COLS/aspect*0.5;
  vec2 cell = vec2(1.0/COLS, 1.0/rows);
  vec2 g = floor(gl_FragCoord.xy / (uRes*cell)) * cell;
  vec3 sc = texture2D(uScene, g + cell*0.5).rgb;
  float lum = dot(sc, vec3(0.299,0.587,0.114));
  float idx = floor(clamp(lum,0.0,0.999) * 10.0);
  vec2 glyphUV = fract(gl_FragCoord.xy/(uRes*cell));
  vec2 atlasUV = (vec2(idx,0.0)+glyphUV)/vec2(10.0,1.0);
  float g1 = texture2D(uAtlas, atlasUV).r;
  vec3 tint = mix(vec3(0.05,0.03,0.02), vec3(1.0,0.55,0.26), g1);
  tint *= 0.92 + 0.08*sin(gl_FragCoord.y*1.5);
  gl_FragColor = vec4(tint, 1.0);
}
`

function AsciiPass({ target }:{ target: THREE.WebGLRenderTarget }){
  const { size, gl } = useThree()
  const atlas = useGlyphAtlas()
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const u = useRef({
    uScene:{value:target.texture}, uAtlas:{value:null as any},
    uRes:{value:new THREE.Vector2()}, uTime:{value:0},
  })
  useEffect(()=>{ if(atlas.current) u.current.uAtlas.value = atlas.current },[atlas])
  useFrame(()=>{
    u.current.uTime.value = performance.now()*0.001
    u.current.uRes.value.set(size.width, size.height)
    gl.setRenderTarget(null)
  })
  return (
    <mesh>
      <planeGeometry args={[2,2]} />
      <shaderMaterial ref={mat} vertexShader="void main(){gl_Position=vec4(position,1.0);}"
        fragmentShader={frag} uniforms={u.current} depthTest={false} depthWrite={false}/>
    </mesh>
  )
}

function Scene({ target }:{ target: THREE.WebGLRenderTarget }){
  const { gl, camera } = useThree()
  const knot = useRef<THREE.Mesh>(null!)
  useFrame((s)=>{
    knot.current.rotation.y = s.clock.elapsedTime*0.3
    knot.current.rotation.x = s.clock.elapsedTime*0.15
    gl.setRenderTarget(target)
    gl.setClearColor(new THREE.Color(0x050505), 1)
    gl.clear()
    gl.render(s.scene, camera)
    gl.setRenderTarget(null)
  })
  return (
    <mesh ref={knot}>
      <torusKnotGeometry args={[1,0.35,200,32]} />
      <meshStandardMaterial color="#ff8c42" emissive="#3a1500" metalness={0.3} roughness={0.4}/>
    </mesh>
  )
}

function AsciiPipeline() {
  const { size } = useThree()
  const target = React.useMemo(() => 
    new THREE.WebGLRenderTarget(Math.floor(size.width/3), Math.floor(size.height/3)), 
  [size])

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.3}/>
      <directionalLight position={[3,4,5]} intensity={2}/>
      <Scene target={target} />
      <AsciiPass target={target} />
    </>
  )
}

export default function AsciiBg(){
  return (
    <Canvas gl={{antialias:false}} dpr={[1,1.5]}>
      <AsciiPipeline />
    </Canvas>
  )
}
