import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const { damp } = THREE.MathUtils;

// Thin glowing ring that spins around the core.
function Ring({ radius, rotation, speed, color, opacity = 0.5 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 16, 220]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Small spheres orbiting on tilted paths.
function Satellites({ color, count = 5 }) {
  const ref = useRef();
  const orbits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.3 + (i % 3) * 0.45,
        speed: 0.35 + i * 0.08,
        offset: (i / count) * Math.PI * 2,
        tilt: (i - count / 2) * 0.35,
        size: 0.05 + (i % 2) * 0.04,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.children.forEach((mesh, i) => {
      const o = orbits[i];
      const a = t * o.speed + o.offset;
      mesh.position.set(Math.cos(a) * o.radius, Math.sin(a) * o.radius * Math.sin(o.tilt), Math.sin(a) * o.radius * Math.cos(o.tilt));
    });
  });

  return (
    <group ref={ref}>
      {orbits.map((o, i) => (
        <mesh key={i}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

// A slow drifting shell of particles that gives the scene depth.
function ParticleField({ color, count = 1600 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function Core({ primary, secondary, isDark }) {
  const group = useRef();
  const shell = useRef();
  const { viewport } = useThree();
  const wide = viewport.width > 7.5;

  useFrame((state, delta) => {
    shell.current.rotation.x += delta * 0.07;
    shell.current.rotation.y += delta * 0.1;
    // Lean toward the pointer for a tactile, parallax feel.
    group.current.rotation.y = damp(group.current.rotation.y, state.pointer.x * 0.45, 3, delta);
    group.current.rotation.x = damp(group.current.rotation.x, -state.pointer.y * 0.3, 3, delta);
  });

  // On narrow screens tuck the core into the top-right so it doesn't sit behind the headline.
  return (
    <group
      ref={group}
      position={wide ? [viewport.width * 0.22, 0, 0] : [viewport.width * 0.28, viewport.height * 0.27, 0]}
      scale={wide ? 1 : 0.6}
    >
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color={primary}
            emissive={secondary}
            emissiveIntensity={isDark ? 0.35 : 0.15}
            roughness={0.18}
            metalness={0.5}
            distort={0.42}
            speed={1.8}
          />
        </mesh>
      </Float>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color={primary} wireframe transparent opacity={isDark ? 0.16 : 0.25} />
      </mesh>
      <Ring radius={2.6} rotation={[1.25, 0.2, 0]} speed={0.25} color={primary} />
      <Ring radius={3.05} rotation={[-0.95, 0.5, 0.3]} speed={-0.18} color={secondary} opacity={0.4} />
      <Satellites color={primary} />
    </group>
  );
}

// Eases the camera toward the pointer so the whole scene shifts with mouse movement.
function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    camera.position.x = damp(camera.position.x, pointer.x * 0.6, 2, delta);
    camera.position.y = damp(camera.position.y, pointer.y * 0.4, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const HeroScene = ({ primary, secondary, isDark, active = true, reducedMotion = false }) => (
  <Canvas
    camera={{ position: [0, 0, 7], fov: 45 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
    eventSource={typeof document !== 'undefined' ? document.body : undefined}
    eventPrefix="client"
  >
    <ambientLight intensity={isDark ? 0.35 : 0.8} />
    <directionalLight position={[4, 5, 5]} intensity={2.2} />
    <pointLight position={[-4, -2, 3]} intensity={40} color={secondary} />
    <pointLight position={[3, 2, 4]} intensity={25} color={primary} />
    <Core primary={primary} secondary={secondary} isDark={isDark} />
    <ParticleField color={primary} />
    <CameraRig />
  </Canvas>
);

export default HeroScene;
