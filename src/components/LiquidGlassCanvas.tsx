"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { useTexture, Environment } from "@react-three/drei";

const noiseFunction = `
// GLSL 3D Simplex Noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

float elevation(vec2 pos, float time) {
  // Gentle, wide lazy swells
  float elev = snoise(vec3(pos * 0.02, time * 0.2)) * 0.15;
  // Subtle rhythmic secondary swells
  elev += snoise(vec3(pos * 0.03, time * 0.3)) * 0.05;
  return elev;
}
`;

const vertexShader = `
uniform float uTime;
${noiseFunction}

void main() {
  vec2 pos = position.xy;
  float elev = elevation(pos, uTime);
  csm_Position.z = elev;
  
  // Calculate true normals via finite difference
  float delta = 0.01;
  float elevX = elevation(pos + vec2(delta, 0.0), uTime);
  float elevY = elevation(pos + vec2(0.0, delta), uTime);
  
  vec3 p0 = vec3(pos.x, pos.y, elev);
  vec3 pX = vec3(pos.x + delta, pos.y, elevX);
  vec3 pY = vec3(pos.x, pos.y + delta, elevY);
  
  vec3 tx = normalize(pX - p0);
  vec3 ty = normalize(pY - p0);
  
  csm_Normal = normalize(cross(tx, ty));
}
`;

function AnimatedPlane() {
  const materialRef = useRef<any>(null);
  
  // Fetch distinct slate maps from reliable Three.js examples
  const normalMap = useTexture(
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg'
  );
  
  useEffect(() => {
    if (normalMap) {
      normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
      normalMap.repeat.set(8, 8);
      normalMap.colorSpace = THREE.NoColorSpace;
    }
  }, [normalMap]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.15;
    }
    if (normalMap) {
      normalMap.offset.x = state.clock.elapsedTime * 0.02;
      normalMap.offset.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[400, 400, 512, 512]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshPhysicalMaterial}
        vertexShader={vertexShader}
        uniforms={uniforms}
        normalMap={normalMap}
        color="#0a192f"
        emissive="#020c1b"
        emissiveIntensity={1.5}
        roughness={0.15}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        normalScale={new THREE.Vector2(0.6, 0.6)}
        iridescence={1.0}
        iridescenceIOR={1.45}
        iridescenceThicknessRange={[100, 300]}
      />
    </mesh>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

export default function LiquidGlassCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 30, 15], fov: 45, near: 0.1, far: 1000 }}>
        <CameraSetup />
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={2.5} color="#ffffff" />
        <Environment background={false} preset="night" />
        <AnimatedPlane />
      </Canvas>
    </div>
  );
}
