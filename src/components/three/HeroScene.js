import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildHeadGeometryData, createDogHead } from './dogHead';
import { createIdleAnimator } from './bellaIdle';

const RESOLUTION = 120;

// Builds the skull geometry in a Web Worker, falling back to the main thread if workers aren't available.
function useBellaGeometry() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let cancelled = false;
    let worker;
    const fallback = () => {
      setTimeout(() => {
        if (!cancelled) setData(buildHeadGeometryData(RESOLUTION));
      }, 50);
    };
    try {
      worker = new Worker(new URL('./bellaWorker.js', import.meta.url));
      worker.onmessage = (e) => {
        if (!cancelled) setData(e.data);
        worker.terminate();
      };
      worker.onerror = () => {
        worker.terminate();
        fallback();
      };
      worker.postMessage({ resolution: RESOLUTION });
    } catch (err) {
      fallback();
    }
    return () => {
      cancelled = true;
      if (worker) worker.terminate();
    };
  }, []);
  return data;
}

// Reflections for her eyes, nose and tiara, generated locally (no HDR download).
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

// A still field of particles for depth. Only Bella moves.
function ParticleField({ color, count = 1400 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 1;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

function Bella({ data, reducedMotion }) {
  const group = useRef();
  const { viewport, camera, invalidate, size } = useThree();
  const wide = viewport.width > 7.5;
  const head = useMemo(() => (data ? createDogHead({ geometryData: data }) : null), [data]);
  const idle = useMemo(() => (head ? createIdleAnimator(head, { reducedMotion }) : null), [head, reducedMotion]);
  const lastPointer = useRef({ x: NaN, y: NaN });
  const ndc = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    invalidate();
    return () => {
      head?.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
    };
  }, [head, invalidate]);

  // Desktop: to the right of the headline. Phones: in the space the hero reserves above the headline
  // (centered ~228px from the top, ~232px tall), converted from pixels to scene units.
  const pxToUnits = viewport.height / size.height;
  const position = wide ? [viewport.width * 0.22, -0.15, 0] : [0, viewport.height / 2 - 228 * pxToUnits, 0];
  const targetScale = wide ? Math.min(1.9, viewport.height * 0.32) : (232 * pxToUnits) / 1.4;

  useFrame((state, dt) => {
    if (!idle || !group.current) return;
    // Ease her in once she's built.
    const s = group.current.scale.x;
    group.current.scale.setScalar(s + (targetScale - s) * (1 - Math.exp(-4 * dt)));

    // Give her the cursor relative to where she sits on screen, so she looks right at it.
    const p = state.pointer;
    if (p.x !== lastPointer.current.x || p.y !== lastPointer.current.y) {
      lastPointer.current = { x: p.x, y: p.y };
      ndc.setFromMatrixPosition(group.current.matrixWorld).project(camera);
      idle.setPointer((p.x - ndc.x) * 1.1, (p.y - ndc.y) * 1.1);
    }
    idle.update(dt);
  });

  if (!head) return null;
  return (
    <group ref={group} position={position} scale={targetScale * 0.85}>
      <primitive object={head} />
    </group>
  );
}

const HeroScene = ({ primary, active = true, reducedMotion = false }) => {
  const data = useBellaGeometry();
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <StudioEnvironment />
      <directionalLight position={[2, 3, 4]} intensity={2.4} color="#fff4e8" />
      <directionalLight position={[-3, 1.5, -2.5]} intensity={2.6} color={primary} />
      <directionalLight position={[3, 0.5, -2]} intensity={0.8} color={primary} />
      <directionalLight position={[-3, -1, 2]} intensity={0.6} color="#8ab4ff" />
      <Bella data={data} reducedMotion={reducedMotion} />
      <ParticleField color={primary} />
    </Canvas>
  );
};

export default HeroScene;
