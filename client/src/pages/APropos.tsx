import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import FloatingBackground from "../components/FloatingBackground";
import LavaBlobs from "../components/LavaBlobs";
import AmbientSound from "../components/AmbientSound";
import { OrbitControls, Environment } from "@react-three/drei";
import CircularInfoCarousel from "../components/CircularCarousel";

export default function APropos() {
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);

  // 🎬 Effet d'expansion à l'entrée
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.set(0.01, 0.01, 0.01);
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      groupRef.current!.scale.set(t, t, t);
      if (t >= 1) clearInterval(interval);
    }, 16);
  }, []);

  // 🔙 Effet d’aspiration au retour
  const handleLeave = () => {
    if (!groupRef.current) return;
    let t = 1;
    const interval = setInterval(() => {
      t -= 0.05;
      groupRef.current!.scale.set(t, t, t);
      if (t <= 0.01) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    }, 16);
  };

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 0], fov: 60 }}>
        {/* 💡 Lumières fixes */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        {/* 🌟 Lumière ponctuelle pour les reflets sur les cartes en verre */}
        <pointLight position={[0, 3, 0]} intensity={2} distance={10} />

        {/* 🌅 Environnement HDRI pour reflets */}
        <Environment preset="forest" background={false} />

        <Suspense fallback={null}>
          <group ref={groupRef}>
            <LavaBlobs count={20} />
            <FloatingBackground />
          </group>

          <OrbitControls target={[0, 1.5, 0.1]} />
          <CircularInfoCarousel />
        </Suspense>
      </Canvas>

      <AmbientSound />

      <button
        onClick={handleLeave}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-400 font-bold text-black rounded"
      >
        Retour
      </button>
    </div>
  );
}
