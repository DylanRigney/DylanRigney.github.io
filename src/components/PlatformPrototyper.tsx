"use client";

import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- CANVAS TEXTURE HELPER (Bulletproof text in R3F/Next.js) ---
function CanvasTextPlate({ title, subtitle }: { title: string; subtitle: string }) {
  const texture = React.useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cyan Neon Border
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
    ctx.lineWidth = 16;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Title with Glow
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 76px monospace';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 25;
    ctx.fillText(title, canvas.width / 2, 360);

    // Subtitle & Description
    ctx.fillStyle = '#99ffff';
    ctx.font = '36px monospace';
    ctx.shadowBlur = 0;
    
    ctx.fillText(subtitle, canvas.width / 2, 480);

    ctx.fillStyle = '#55aaaa';
    ctx.font = '28px monospace';
    ctx.fillText('(This text is rendered directly onto', canvas.width / 2, 620);
    ctx.fillText('the 3D stone platform screen)', canvas.width / 2, 670);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [title, subtitle]);

  if (!texture) return null;

  return (
    <mesh receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial map={texture} roughness={0.2} metalness={0.6} />
    </mesh>
  );
}

// --- 1. STABLE BASELINE PLATFORM ---
const StableBaselinePlatform = () => {
  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#050505"]} />
      
      {/* Simple, well-lit environment */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 15, 5]} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <Environment background={false} preset="city" />

      {/* OrbitControls locked mostly top-down to emphasize the inset depth */}
      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 6} 
        enablePan={false}
      />

      {/* Platform Geometry: Substantial monolithic square structure with inset */}
      <group position={[0, -2, 0]}>
        {/* Base Layer */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[30, 4, 30]} />
          <meshStandardMaterial color="#2a2b2e" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Thick Borders to create the deep inset (Depth trick) */}
        {/* All frame borders are now uniformly 3 units thick. This creates a 24x24 inner screen */}
        
        {/* Top/North Wall */}
        <mesh position={[0, 3, -13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          <meshStandardMaterial color="#2f3136" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Bottom/South Wall */}
        <mesh position={[0, 3, 13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          <meshStandardMaterial color="#2f3136" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Left/West Wall */}
        <mesh position={[-13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          <meshStandardMaterial color="#2f3136" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Right/East Wall */}
        <mesh position={[13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          <meshStandardMaterial color="#2f3136" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Integration plan for site information: Inset Screen with CanvasTexture */}
        {/* Hole is perfectly 24x24 */}
        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};

// --- ALIEN RUNES TEXTURE HOOK ---
function useAlienRunesTexture() {
  const [textures, setTextures] = React.useState<{ bumpMap: THREE.Texture; emissiveMap: THREE.Texture } | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 1024, 1024);

    // Draw cyber-runes / circuitry
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      let x = Math.floor(Math.random() * 32) * 32;
      let y = Math.floor(Math.random() * 32) * 32;
      ctx.moveTo(x, y);
      
      let steps = Math.floor(Math.random() * 6) + 2;
      for (let j = 0; j < steps; j++) {
        const dir = Math.floor(Math.random() * 8);
        const dist = (Math.floor(Math.random() * 4) + 1) * 32;
        if (dir === 0) x += dist;
        else if (dir === 1) x -= dist;
        else if (dir === 2) y += dist;
        else if (dir === 3) y -= dist;
        else if (dir === 4) { x += dist; y += dist; }
        else if (dir === 5) { x -= dist; y -= dist; }
        else if (dir === 6) { x += dist; y -= dist; }
        else if (dir === 7) { x -= dist; y += dist; }
        
        // Keep within bounds
        x = Math.max(0, Math.min(1024, x));
        y = Math.max(0, Math.min(1024, y));
        
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (Math.random() > 0.6) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      if (Math.random() > 0.8) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2); 
    
    setTextures({ bumpMap: tex, emissiveMap: tex });
  }, []);

  return textures;
}

// --- PROTO 1: OBSIDIAN MONOLITH ---
const Proto1ObsidianPlatform = () => {
  const runes = useAlienRunesTexture();

  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#020205"]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={3} 
        castShadow 
      />
      {/* City environment gives good reflections on the obsidian */}
      <Environment background={false} preset="city" />

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 6} 
        enablePan={false}
      />

      <group position={[0, -2, 0]}>
        {/* Base Layer */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[30, 4, 30]} />
          {runes ? (
            <meshPhysicalMaterial 
              color="#0a0a0c" 
              roughness={0.1} 
              metalness={0.9} 
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              bumpMap={runes.bumpMap}
              bumpScale={0.05}
              emissive="#00ffff"
              emissiveMap={runes.emissiveMap}
              emissiveIntensity={1.5}
            />
          ) : (
            <meshStandardMaterial color="#0a0a0c" />
          )}
        </mesh>

        {/* Walls */}
        <mesh position={[0, 3, -13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          {runes && <meshPhysicalMaterial color="#0a0a0c" roughness={0.1} metalness={0.9} clearcoat={1.0} bumpMap={runes.bumpMap} bumpScale={0.05} emissive="#00ffff" emissiveMap={runes.emissiveMap} emissiveIntensity={1.5} />}
        </mesh>
        <mesh position={[0, 3, 13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          {runes && <meshPhysicalMaterial color="#0a0a0c" roughness={0.1} metalness={0.9} clearcoat={1.0} bumpMap={runes.bumpMap} bumpScale={0.05} emissive="#00ffff" emissiveMap={runes.emissiveMap} emissiveIntensity={1.5} />}
        </mesh>
        <mesh position={[-13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          {runes && <meshPhysicalMaterial color="#0a0a0c" roughness={0.1} metalness={0.9} clearcoat={1.0} bumpMap={runes.bumpMap} bumpScale={0.05} emissive="#00ffff" emissiveMap={runes.emissiveMap} emissiveIntensity={1.5} />}
        </mesh>
        <mesh position={[13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          {runes && <meshPhysicalMaterial color="#0a0a0c" roughness={0.1} metalness={0.9} clearcoat={1.0} bumpMap={runes.bumpMap} bumpScale={0.05} emissive="#00ffff" emissiveMap={runes.emissiveMap} emissiveIntensity={1.5} />}
        </mesh>

        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};

// --- PROTO 2: VORONOI SHADER MATERIAL ---
const VoronoiShaderMaterial = () => {
  const uniforms = React.useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#1a0033") },
    uGlow: { value: new THREE.Color("#a855f7") }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uGlow;
        varying vec2 vUv;

        // 2D Random
        vec2 random2(vec2 p) {
            return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
        }

        void main() {
            vec2 st = vUv * 15.0; // Scale pattern
            
            // Voronoi / Cellular noise
            vec2 i_st = floor(st);
            vec2 f_st = fract(st);

            float m_dist = 1.0; 

            for (int y = -1; y <= 1; y++) {
                for (int x = -1; x <= 1; x++) {
                    vec2 neighbor = vec2(float(x),float(y));
                    vec2 point = random2(i_st + neighbor);
                    // Animate points
                    point = 0.5 + 0.5*sin(uTime*1.5 + 6.2831*point);
                    vec2 diff = neighbor + point - f_st;
                    float dist = length(diff);
                    m_dist = min(m_dist, dist);
                }
            }

            // High contrast glowing lines where cells meet
            float lines = smoothstep(0.15, 0.0, m_dist - 0.05);

            vec3 base = mix(uColor, vec3(0.0), m_dist);
            // Pulsing glow
            vec3 glow = uGlow * lines * (0.6 + 0.4 * sin(uTime * 3.0));

            gl_FragColor = vec4(base + glow, 1.0);
        }
      `}
    />
  );
};

const Proto2FractalPlatform = () => {
  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#0a001a"]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />

      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 6} enablePan={false} />

      <group position={[0, -2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[30, 4, 30]} />
          <VoronoiShaderMaterial />
        </mesh>
        <mesh position={[0, 3, -13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <VoronoiShaderMaterial />
        </mesh>
        <mesh position={[0, 3, 13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <VoronoiShaderMaterial />
        </mesh>
        <mesh position={[-13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <VoronoiShaderMaterial />
        </mesh>
        <mesh position={[13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <VoronoiShaderMaterial />
        </mesh>

        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};

// --- PROTO 3: HEX-PLATED ALIEN ALLOY ---
function useAlienHexTexture() {
  const [textures, setTextures] = React.useState<{ normalMap: THREE.Texture; map: THREE.Texture; emissiveMap: THREE.Texture } | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvasNormal = document.createElement('canvas');
    const canvasMap = document.createElement('canvas');
    canvasNormal.width = 1024; canvasNormal.height = 1024;
    canvasMap.width = 1024; canvasMap.height = 1024;
    
    const ctxN = canvasNormal.getContext('2d')!;
    const ctxM = canvasMap.getContext('2d')!;

    // Backgrounds
    ctxN.fillStyle = '#8080ff'; 
    ctxN.fillRect(0, 0, 1024, 1024);
    ctxM.fillStyle = '#111115'; 
    ctxM.fillRect(0, 0, 1024, 1024);

    const r = 40; // hex radius
    const w = Math.sqrt(3) * r;
    const h = 2 * r;

    ctxN.lineWidth = 4;
    ctxN.strokeStyle = '#ff8080';
    ctxM.lineWidth = 4;
    ctxM.strokeStyle = '#000000';

    for (let y = -h; y < 1024 + h; y += h * 0.75) {
      for (let x = -w; x < 1024 + w; x += w) {
        const offset = (Math.round(y / (h * 0.75)) % 2 !== 0) ? w / 2 : 0;
        const cx = x + offset;
        const cy = y;

        ctxN.beginPath();
        ctxM.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - (Math.PI / 6);
          const px = cx + (r-2) * Math.cos(angle);
          const py = cy + (r-2) * Math.sin(angle);
          if (i === 0) { ctxN.moveTo(px, py); ctxM.moveTo(px, py); }
          else { ctxN.lineTo(px, py); ctxM.lineTo(px, py); }
        }
        ctxN.closePath();
        ctxM.closePath();

        ctxN.fillStyle = '#8080ff';
        ctxN.fill();
        ctxN.stroke();

        if (Math.random() > 0.95) {
           ctxM.fillStyle = '#ffaa00'; 
           ctxM.fill();
        } else if (Math.random() > 0.8) {
           ctxM.fillStyle = '#22222a'; 
           ctxM.fill();
        }
        ctxM.stroke();
      }
    }

    const tN = new THREE.CanvasTexture(canvasNormal);
    const tM = new THREE.CanvasTexture(canvasMap);
    
    tN.wrapS = tN.wrapT = tM.wrapS = tM.wrapT = THREE.RepeatWrapping;
    tN.repeat.set(2, 2);
    tM.repeat.set(2, 2);

    setTextures({ normalMap: tN, map: tM, emissiveMap: tM });
  }, []);

  return textures;
}

const Proto3HexPlatform = () => {
  const tex = useAlienHexTexture();

  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#050200"]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={3} castShadow />
      <Environment background={false} preset="city" />

      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 6} enablePan={false} />

      <group position={[0, -2, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[30, 4, 30]} />
          {tex ? (
            <meshStandardMaterial 
              map={tex.map} 
              normalMap={tex.normalMap} 
              emissiveMap={tex.emissiveMap}
              emissive="#ffaa00"
              emissiveIntensity={1.5}
              roughness={0.4} 
              metalness={0.8} 
            />
          ) : <meshStandardMaterial color="#222" />}
        </mesh>

        <mesh position={[0, 3, -13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          {tex && <meshStandardMaterial map={tex.map} normalMap={tex.normalMap} emissiveMap={tex.emissiveMap} emissive="#ffaa00" emissiveIntensity={1.5} roughness={0.4} metalness={0.8} />}
        </mesh>
        <mesh position={[0, 3, 13.5]} receiveShadow castShadow>
          <boxGeometry args={[30, 2, 3]} />
          {tex && <meshStandardMaterial map={tex.map} normalMap={tex.normalMap} emissiveMap={tex.emissiveMap} emissive="#ffaa00" emissiveIntensity={1.5} roughness={0.4} metalness={0.8} />}
        </mesh>
        <mesh position={[-13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          {tex && <meshStandardMaterial map={tex.map} normalMap={tex.normalMap} emissiveMap={tex.emissiveMap} emissive="#ffaa00" emissiveIntensity={1.5} roughness={0.4} metalness={0.8} />}
        </mesh>
        <mesh position={[13.5, 3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 2, 24]} />
          {tex && <meshStandardMaterial map={tex.map} normalMap={tex.normalMap} emissiveMap={tex.emissiveMap} emissive="#ffaa00" emissiveIntensity={1.5} roughness={0.4} metalness={0.8} />}
        </mesh>

        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};

// --- PROTO 4: VISIONARY ORGANIC MANDALA (KIFS) ---
const VisionaryMandalaMaterial = () => {
  const uniforms = React.useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        varying vec2 vUv;

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        // Psychedelic organic palette (Alex Grey inspired)
        vec3 palette(float t) {
            vec3 a = vec3(0.5, 0.5, 0.5);
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 1.0, 1.0);
            vec3 d = vec3(0.3, 0.2, 0.8);
            return a + b * cos(6.28318 * (c * t + d));
        }

        void main() {
            // Scale and center UVs
            vec2 uv = (vUv - 0.5) * 2.0;
            vec2 uv0 = uv;
            vec3 finalColor = vec3(0.0);

            // KIFS fractional iteration loop
            for (float i = 0.0; i < 4.0; i++) {
                // Space folding
                uv = fract(uv * 1.5) - 0.5;

                // Organic distance field with pulsing falloff
                float d = length(uv) * exp(-length(uv0));

                // Time-based coloration mapping
                vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.4);

                // Organic ringing / pulsing biology effect
                d = sin(d * 8.0 + uTime) / 8.0;
                d = abs(d);

                // Neon / bioluminescent glow injection
                d = pow(0.015 / d, 1.5);

                finalColor += col * d;
                
                // Kaleidoscopic rotation
                uv *= rot(uTime * 0.1);
            }
            
            // Tone mapping to prevent blown-out whites
            finalColor = finalColor / (1.0 + finalColor);

            gl_FragColor = vec4(finalColor, 1.0);
        }
      `}
    />
  );
};

const Proto4MandalaPlatform = () => {
  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#020005"]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />

      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 6} enablePan={false} />

      <group position={[0, -2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[30, 4, 30]} />
          <VisionaryMandalaMaterial />
        </mesh>
        <mesh position={[0, 3, -13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <VisionaryMandalaMaterial />
        </mesh>
        <mesh position={[0, 3, 13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <VisionaryMandalaMaterial />
        </mesh>
        <mesh position={[-13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <VisionaryMandalaMaterial />
        </mesh>
        <mesh position={[13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <VisionaryMandalaMaterial />
        </mesh>

        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};


// --- PROTO 5: ANCIENT GOLDEN FILIGREE (KIFS) ---
const GoldenFiligreeMaterial = () => {
  const uniforms = React.useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        varying vec2 vUv;

        mat2 rot(float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, -s, s, c);
        }

        void main() {
            // Coordinate setup
            vec2 uv = (vUv - 0.5) * 2.0;
            uv *= 1.5; // Zoom out
            
            // Slow organic breathing animation
            float t = uTime * 0.1;
            mat2 r = rot(t);

            // KIFS loop for filigree structure
            float d = 0.0;
            for(int i = 0; i < 6; i++) {
                uv = abs(uv); // Kaleidoscope fold
                uv -= 0.5;    // Offset to create the filigree holes
                uv *= 1.2;    // Scale up
                uv *= r;      // Primary rotation
                
                // Secondary organic plant-like twist
                uv.x += sin(uv.y * 2.0 + t * 2.0) * 0.05; 
                
                // Distance field logic for intersecting carved lines
                d = max(d, abs(uv.x * uv.y)); 
            }

            // Fake physical lighting / specular calculation for gold
            float bump = smoothstep(0.0, 0.4, d);
            
            // Ancient golden palette
            vec3 baseGold = vec3(0.6, 0.45, 0.15);
            vec3 darkTarnish = vec3(0.05, 0.04, 0.02);
            vec3 brightHighlight = vec3(1.0, 0.9, 0.5);
            
            // Fake metallic rim lighting using the distance gradient
            float edge = smoothstep(0.05, 0.1, d) - smoothstep(0.1, 0.2, d);
            
            vec3 color = mix(darkTarnish, baseGold, bump);
            color += brightHighlight * edge * 1.5; // Add shiny worn edges

            gl_FragColor = vec4(color, 1.0);
        }
      `}
    />
  );
};

const Proto5FiligreePlatform = () => {
  return (
    <Canvas camera={{ position: [0, 38, 0], fov: 40, near: 0.1, far: 1000 }} shadows>
      <color attach="background" args={["#050402"]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />

      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 6} enablePan={false} />

      <group position={[0, -2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[30, 4, 30]} />
          <GoldenFiligreeMaterial />
        </mesh>
        <mesh position={[0, 3, -13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <GoldenFiligreeMaterial />
        </mesh>
        <mesh position={[0, 3, 13.5]}>
          <boxGeometry args={[30, 2, 3]} />
          <GoldenFiligreeMaterial />
        </mesh>
        <mesh position={[-13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <GoldenFiligreeMaterial />
        </mesh>
        <mesh position={[13.5, 3, 0]}>
          <boxGeometry args={[3, 2, 24]} />
          <GoldenFiligreeMaterial />
        </mesh>

        <group position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <CanvasTextPlate title="Dylan Rigney" subtitle="AI Engineer & Architect" />
        </group>
      </group>
    </Canvas>
  );
};


// --- MAIN DASHBOARD ---
export default function PlatformPrototyper() {
  const [activeProto, setActiveProto] = useState<'Baseline' | 'Proto1' | 'Proto2' | 'Proto3' | 'Proto4' | 'Proto5'>('Proto4');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: '#000' }}>
      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        display: 'flex',
        flexWrap: 'wrap',
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
          Baseline
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
          P1: Obsidian
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
          P2: Fractal
        </button>
        <button 
          onClick={() => setActiveProto('Proto3')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Proto3' ? '#f59e0b' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          P3: Hex
        </button>
        <button 
          onClick={() => setActiveProto('Proto4')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Proto4' ? '#ec4899' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          P4: Organic Mandala
        </button>
        <button 
          onClick={() => setActiveProto('Proto5')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeProto === 'Proto5' ? '#eab308' : '#374151', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          P5: Gold Filigree
        </button>
      </div>

      {/* Render selected prototype */}
      <div style={{ width: '100%', height: '100%' }}>
        {activeProto === 'Baseline' && <StableBaselinePlatform />}
        {activeProto === 'Proto1' && <Proto1ObsidianPlatform />}
        {activeProto === 'Proto2' && <Proto2FractalPlatform />}
        {activeProto === 'Proto3' && <Proto3HexPlatform />}
        {activeProto === 'Proto4' && <Proto4MandalaPlatform />}
        {activeProto === 'Proto5' && <Proto5FiligreePlatform />}
      </div>
    </div>
  );
}
