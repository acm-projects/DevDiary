import { Html } from "@react-three/drei";

// Loader Component for loading 3D models
const Loader: React.FC = () => {

  return (
    <Html>
      <div className="canvas-load flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"/>
      </div>
    </Html>
  );
};

export default Loader;