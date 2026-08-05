'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Knot(){
  const ref = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()
  useFrame((s)=>{
    ref.current.rotation.y = s.clock.elapsedTime*0.2
    ref.current.rotation.x += (pointer.y*0.5 - ref.current.rotation.x)*0.05
    ref.current.rotation.z += (pointer.x*0.5 - ref.current.rotation.z)*0.05
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.2, 0.38, 256, 32]} />
        <meshPhysicalMaterial
          metalness={1.0}
          roughness={0.08}
          iridescence={1.0}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[120, 720]}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  )
}

export default function IridescentBg(){
  return (
    <Canvas camera={{ position:[0,0,4], fov:45 }} dpr={[1,2]}>
      <color attach="background" args={['#08080c']} />
      <ambientLight intensity={0.15} />
      <Knot />
      <Environment preset="city" />
    </Canvas>
  )
}
