import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import Loader from "./Loader.tsx";

// 3D Model Robot Component
const Robot: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/cute_robot/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // all animations
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) action.play();
      });
    }
  }, [actions]);

  // rotate robot to look at mouse
  useFrame(() => {
    if (group.current) {
      // Convert mouse position to 3D space
      const targetRotationY = mousePosition.x * 0.5; // Horizontal rotation
      const targetRotationX = -mousePosition.y * 0.3; // Vertical rotation (limited)

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.1
      );

      if (group.current.children[0]) {
        const currentRotationX = group.current.children[0].rotation.x;
        group.current.children[0].rotation.x = THREE.MathUtils.lerp(
          currentRotationX,
          targetRotationX - 0.09,
          0.1
        );
      }
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.6} groundColor="#1E293B" />
      <spotLight
        position={[0, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-10, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        color="#41cca6"
      />

      <pointLight position={[0, 5, -10]} intensity={1.2} color="#ffffff" />

      <pointLight position={[10, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 5, -5]} intensity={0.8} color="#41cca6" />

      <primitive
        object={scene}
        scale={2.5}
        position={[0, -3.8, -0.3]}
        rotation={[-0.09, 0, 0.35]}
      />
    </group>
  );
};

const RobotMascot: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Fix mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
          />
          <Robot mousePosition={mousePosition} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

// Preloads the model
useGLTF.preload("/cute_robot/scene.gltf");

export default RobotMascot;