import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

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
      <p style={{ color: 'white' }}>Chargement... {Math.round(progress)}%</p>
    </Html>
  );
}

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default function LoadingScreen() {
  return (
    <Canvas style={{ flex: 1 }} camera={{ position: [0, 0, 5] }} gl={{ antialias: true }}>
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
      <OrbitControls />
      <LoadingIndicator />
    </Canvas>
  );
}
