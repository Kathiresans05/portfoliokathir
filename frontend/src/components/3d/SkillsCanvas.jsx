import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  Sphere, 
  MeshDistortMaterial, 
  OrbitControls, 
  PerspectiveCamera,
  Billboard,
  Float as FloatGroup
} from '@react-three/drei';
import * as THREE from 'three';

const SkillPlanet = ({ position, name, color, speed, distort, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <FloatGroup speed={speed} rotationIntensity={1.5} floatIntensity={1.5} position={position}>
      <Sphere ref={meshRef} args={[scale, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </Sphere>
      
      {/* Orbiting Ring for each planet */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[scale * 1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.3} />
      </mesh>

      <Billboard position={[0, -scale * 1.8, 0]}>
        <Text
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Billboard>
    </FloatGroup>
  );
};

const SkillsCanvas = () => {
  const skills = [
    { name: 'React', color: '#61dafb', position: [-6, 3, -2], speed: 2, distort: 0.3, scale: 1.2 },
    { name: 'Node.js', color: '#339933', position: [6, 3, -2], speed: 1.5, distort: 0.4, scale: 1.1 },
    { name: 'MongoDB', color: '#47a248', position: [0, 0, 0], speed: 2.5, distort: 0.5, scale: 1.5 },
    { name: 'Express', color: '#888888', position: [-6, -3, -2], speed: 1.8, distort: 0.2, scale: 1 },
    { name: 'React Native', color: '#00f3ff', position: [6, -3, -2], speed: 2.2, distort: 0.4, scale: 1.1 },
  ];

  return (
    <div className="h-[700px] w-full cursor-grab active:cursor-grabbing relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ff00ff" />
        
        <Suspense fallback={null}>
          <group>
            {skills.map((skill, index) => (
              <SkillPlanet key={index} {...skill} />
            ))}
          </group>
        </Suspense>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent blur-3xl" />
    </div>
  );
};

export default SkillsCanvas;
