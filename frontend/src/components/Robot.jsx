import React, { Suspense, useEffect, useState, useRef } from "react"; // useRef imported for 3D model ref
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei"; // useAnimations imported for handling animations

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const group = useRef(); 
  const { scene, animations } = useGLTF("./robot_playground/scene.gltf"); // Loads the model and animations
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    
    // plays all animations
    Object.values(actions).forEach(action => action.play());

  }, [actions, animations]); // Re-run if actions or animations change

  return (
    <group ref={group}> 
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      

      <primitive
        object={scene} 
        scale={isMobile ? 1.5 : 2.5}
        position={isMobile ? [0, -2, -0.3] : [0, -4, -0.3]}
        rotation={[-0.08, 1.2, 0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    //listener that listens for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense >
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;