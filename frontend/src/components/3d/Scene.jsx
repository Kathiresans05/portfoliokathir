import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Stars, 
  PerspectiveCamera,
} from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const CameraController = () => {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useFrame(() => {
    scrollY.current = window.scrollY;
    const targetZ = 10 - scrollY.current * 0.005;
    const targetY = -scrollY.current * 0.002;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, targetY, 0);
  });

  return null;
};

const Scene = () => {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#020205']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <CameraController />

        <ambientLight intensity={0.5} />

        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />

        <EffectComposer disableNormalPass>
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;
