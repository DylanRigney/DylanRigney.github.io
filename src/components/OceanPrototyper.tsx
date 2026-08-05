"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

const tightWavesVertexShader = `
uniform float uTime;

void main() {
  // Tighter, higher-frequency waves
  float wave1 = sin(position.x * 0.3 + position.y * 0.15 + uTime * 1.2) * 1.5;
  float wave2 = sin(position.x * -0.15 + position.y * 0.35 + uTime * 1.5) * 1.0;
  float wave3 = sin(position.x * 0.6 - position.y * 0.6 - uTime * 2.0) * 0.4;

  float elevation = wave1 + wave2 + wave3;
  csm_Position.z += elevation;

  // Simplified finite difference normal for the new tight waves:
  float dx = (sin((position.x + 0.05) * 0.3 + position.y * 0.15 + uTime * 1.2) * 1.5) - wave1;
  float dy = (sin(position.x * 0.3 + (position.y + 0.05) * 0.15 + uTime * 1.2) * 1.5) - wave1;
  csm_Normal = normalize(vec3(-dx, -dy, 0.15));
}
`;

const lazyLakeVertexShader = `
uniform float uTime;

float getElevation(vec2 pos, float time) {
    // Wave 1: The primary directional swell with flattened troughs
    float phase1 = (pos.x * 0.6 + pos.y * 0.3) * 0.2 + time * 0.4;
    float w1 = (2.0 * pow((sin(phase1) + 1.0) / 2.0, 1.5) - 1.0) * 1.2;

    // Domain Warping: bend the grid for the next waves based on wave 1
    vec2 warpedPos = pos + vec2(w1 * 2.0, w1 * 2.0);

    // Wave 2: Opposing swell, riding on the warped, non-linear grid
    float phase2 = (warpedPos.x * -0.4 + warpedPos.y * 0.8) * 0.25 + time * 0.5;
    float w2 = (2.0 * pow((sin(phase2) + 1.0) / 2.0, 1.5) - 1.0) * 0.8;

    // Wave 3: Finer details
    float phase3 = (warpedPos.x * 0.5 - warpedPos.y * 0.5) * 0.15 - time * 0.3;
    float w3 = (2.0 * pow((sin(phase3) + 1.0) / 2.0, 1.2) - 1.0) * 0.5;

    return w1 + w2 + w3;
}

void main() {
    float elevation = getElevation(position.xy, uTime);
    csm_Position.z += elevation;

    float e = 0.02;
    float dx = (getElevation(position.xy + vec2(e, 0.0), uTime) - elevation) / e;
    float dy = (getElevation(position.xy + vec2(0.0, e), uTime) - elevation) / e;

    csm_Normal = normalize(vec3(-dx, -dy, 1.0));
}
`;

const organicSwellsVertexShader = `
uniform float uTime;

float getElevation(vec2 pos, float time) {
    float elevation = 0.0;
    float amplitude = 2.0; // Taller base height for the massive swell

    // Rotation matrix to eliminate parallel alignment
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

    // Drastically scale down the coordinates to create HUGE base waves
    vec2 p = pos * 0.015; 
    float t = time * 0.2; // Slower base time

    for (int i = 0; i < 4; i++) {
        // Use intersecting sines for the noise basis
        float wave = sin(p.x + t) * cos(p.y + t * 0.8);

        // Trochoidal shaping for water-like crests
        wave = (2.0 * pow((wave + 1.0) / 2.0, 1.4) - 1.0);

        elevation += wave * amplitude;

        // fBm progression
        p = rot * p * 1.6;  // Lacunarity: 1.6 keeps the iterations relatively wide
        amplitude *= 0.45;  // Gain: drop height faster than default
        t *= 1.1;           // Barely increase speed of smaller details
    }

    return elevation;
}

void main() {
    float elevation = getElevation(position.xy, uTime);
    csm_Position.z += elevation;

    float e = 0.02;
    float dx = (getElevation(position.xy + vec2(e, 0.0), uTime) - elevation) / e;
    float dy = (getElevation(position.xy + vec2(0.0, e), uTime) - elevation) / e;

    csm_Normal = normalize(vec3(-dx, -dy, 1.0));
}
`;

// --- COMPONENT TEMPLATE (Used for Baseline and Clones) ---
function OceanPlane({ 
  color = "#0a1220", 
  roughness = 0.2,
  clearcoatRoughness = 0.2,
  normalRepeat = 40,
  shader = tightWavesVertexShader
}: { 
  color?: string, 
  roughness?: number,
  clearcoatRoughness?: number,
  normalRepeat?: number,
  shader?: string
}) {
  const materialRef = useRef<any>(null);
  const { gl } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  
  const normalMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg');
  
  useEffect(() => {
    if (normalMap) {
      // 1. Set repeats
      normalMap.repeat.set(normalRepeat, normalRepeat);
      
      // 2. Set color spaces
      normalMap.colorSpace = THREE.NoColorSpace;
      
      // 3. Enable Anisotropy
      normalMap.anisotropy = gl.capabilities.getMaxAnisotropy();

      // 4. CRITICAL: Set wrapping AFTER rotation/repeat to avoid clamping streaks
      normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    }
  }, [normalMap, gl, normalRepeat]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (normalMap) {
      // Single panning for a unified breeze
      normalMap.offset.x -= delta * 0.005;
      normalMap.offset.y += delta * 0.008;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[400, 400, 512, 512]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshPhysicalMaterial}
        vertexShader={shader}
        uniforms={uniforms}
        color={color}
        roughness={roughness}
        clearcoat={1.0}
        clearcoatRoughness={clearcoatRoughness}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.3, 0.3)}
      />
    </mesh>
  );
}

// --- FOG LAYER (For Proto 2) ---
function FogLayer() {
  const fogMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lava/cloud.png');
  
  useEffect(() => {
    if (fogMap) {
      fogMap.wrapS = fogMap.wrapT = THREE.RepeatWrapping;
      fogMap.repeat.set(4, 4); // Scale the clouds so they aren't massive
    }
  }, [fogMap]);

  useFrame((state, delta) => {
    if (fogMap) {
      fogMap.offset.x += delta * 0.03;
      fogMap.offset.y -= delta * 0.02;
    }
  });

  return (
    <mesh position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400]} />
      <meshBasicMaterial 
        map={fogMap} 
        alphaMap={fogMap} 
        transparent={true} 
        opacity={0.15} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        color="#00aaff" 
      />
    </mesh>
  );
}

// --- 1. STABLE BASELINE ---
const StableBaselineOcean = () => (
  <Canvas camera={{ position: [0, 80, 40], fov: 55, near: 0.1, far: 1000 }}>
    <color attach="background" args={["#02040a"]} />
    <Environment background={false} preset="night" />
    <directionalLight position={[50, 80, 30]} intensity={2.0} color="#ffffff" />
    <ambientLight intensity={0.2} color="#ffffff" />
    <OceanPlane normalRepeat={30} shader={lazyLakeVertexShader} roughness={0.2} clearcoatRoughness={0.2} />
  </Canvas>
);

// --- PROTO A: ORGANIC SWELLS ---
const ProtoA_OrganicSwells = () => (
  <Canvas camera={{ position: [0, 80, 40], fov: 55, near: 0.1, far: 1000 }}>
    <color attach="background" args={["#02040a"]} />
    <Environment background={false} preset="night" />
    <directionalLight position={[50, 80, 30]} intensity={2.0} color="#ffffff" />
    <ambientLight intensity={0.2} color="#ffffff" />
    <OceanPlane normalRepeat={30} shader={organicSwellsVertexShader} roughness={0.2} clearcoatRoughness={0.2} />
  </Canvas>
);

// --- PROTO B: CINEMATIC LIGHTING ---
const ProtoB_CinematicLighting = () => (
  <Canvas camera={{ position: [0, 80, 40], fov: 55, near: 0.1, far: 1000 }}>
    <color attach="background" args={["#02040a"]} />
    <Environment background={false} preset="night" blur={0.8} />
    <directionalLight position={[50, 80, 30]} intensity={2.0} color="#ffffff" />
    <ambientLight intensity={0.2} color="#ffffff" />
    <OceanPlane normalRepeat={30} shader={lazyLakeVertexShader} roughness={0.2} clearcoatRoughness={0.2} />
  </Canvas>
);

// --- 2. PROTO 1: HIGH ALTITUDE ---
const Proto1HighAltitude = () => (
  <Canvas camera={{ position: [0, 60, 40], fov: 45, near: 0.1, far: 1000 }}>
    <color attach="background" args={["#000000"]} />
    <Environment background={true} preset="city" />
    <ambientLight intensity={2.0} color="#ffffff" />
    <OceanPlane color="#02050a" roughness={0.2} normalRepeat={80} />
  </Canvas>
);

// --- 3. PROTO 2: NEON FOG ---
const Proto2NeonFog = () => (
  <Canvas camera={{ position: [0, 60, 40], fov: 45, near: 0.1, far: 1000 }}>
    <color attach="background" args={["#000000"]} />
    <Environment background={true} preset="city" />
    <ambientLight intensity={1.0} color="#ffffff" />
    <OceanPlane normalRepeat={30} />
    <FogLayer />
  </Canvas>
);

// --- MAIN DASHBOARD ---
export default function OceanPrototyper() {
  const [activeProto, setActiveProto] = useState<'Baseline' | 'ProtoA' | 'ProtoB' | 'Proto1' | 'Proto2'>('Baseline');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: '#000' }}>
      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        zIndex: 100,
        pointerEvents: 'auto',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
      }}>
        <button 
          onClick={() => setActiveProto('Baseline')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Baseline' ? '#10b981' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Stable Baseline
        </button>
        <button 
          onClick={() => setActiveProto('ProtoA')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'ProtoA' ? '#f59e0b' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Proto A (Organic)
        </button>
        <button 
          onClick={() => setActiveProto('ProtoB')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'ProtoB' ? '#ec4899' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Proto B (Cinematic)
        </button>
        <button 
          onClick={() => setActiveProto('Proto1')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Proto1' ? '#3b82f6' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Proto 1 (High Altitude)
        </button>
        <button 
          onClick={() => setActiveProto('Proto2')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Proto2' ? '#a855f7' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Proto 2 (Neon Fog)
        </button>
      </div>

      {/* Render selected prototype */}
      <div style={{ width: '100%', height: '100%' }}>
        {activeProto === 'Baseline' && <StableBaselineOcean />}
        {activeProto === 'ProtoA' && <ProtoA_OrganicSwells />}
        {activeProto === 'ProtoB' && <ProtoB_CinematicLighting />}
        {activeProto === 'Proto1' && <Proto1HighAltitude />}
        {activeProto === 'Proto2' && <Proto2NeonFog />}
      </div>
    </div>
  );
}
