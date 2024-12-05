import { Html,OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/solar-system.glb');
  return <primitive object={gltf.scene} />;
}

function LoadingIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Html center>
      <div className='flex flex-col items-center'>
        <div className='size-10 animate-spin rounded-full border-4 border-t-blue-500'></div>
        <p style={{ color: 'white' }}>{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function RotatingModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Model />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default function LoadingScreen() {
  return (
    <Canvas
      style={{ flex: 1 }}
      camera={{ position: [0, 0, 15] }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingModel />
      <OrbitControls />
      <LoadingIndicator />
    </Canvas>
  );
}
