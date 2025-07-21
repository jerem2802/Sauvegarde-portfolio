import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import FloatingParticles from "../components/FloatingParticles";
import AmbientSound from "../components/AmbientSound";
import { OrbitControls, Environment, useProgress } from "@react-three/drei";
import CircularInfoCarousel from "../components/CircularCarousel";
import LoaderCharacter from "../components/LoaderCharacter";

export default function APropos() {
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  return (
    <div className="w-full h-screen bg-black">
      {/* ✅ Chargement en % */}
      {progress < 100 && <LoaderCharacter />}

      <Canvas camera={{ position: [0, 2, 0], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[0, 3, 0]} intensity={2} distance={10} />
        <Environment preset="forest" background={false} />

        <Suspense fallback={null}>
          <group ref={groupRef}>
            <FloatingParticles count={8000} />
           
          </group>

          <OrbitControls target={[0, 1.5, 0.1]} />
          <CircularInfoCarousel />
          
        </Suspense>
      </Canvas>

      <AmbientSound />

      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-400 font-bold text-black rounded"
      >
        Retour
      </button>
    </div>
  );
}
