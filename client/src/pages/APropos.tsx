import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import FloatingBackground from "../components/FloatingBackground"; // 🌌 Import des étoiles flottantes
import LavaBlobs from "../components/LavaBlobs";
import AmbientSound from "../components/AmbientSound";
import { OrbitControls } from "@react-three/drei";
import CircularInfoCarousel from "../components/CircularCarousel";

export default function APropos() {
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);

  // 🎬 Effet d'expansion à l'entrée
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.set(0.01, 0.01, 0.01); // tout petit
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      groupRef.current!.scale.set(t, t, t);
      if (t >= 1) clearInterval(interval);
    }, 16);
  }, []);

  // 🔙 Effet d’aspiration et retour (simulé sur bouton ici)
  const handleLeave = () => {
    if (!groupRef.current) return;
    let t = 1;
    const interval = setInterval(() => {
      t -= 0.05;
      groupRef.current!.scale.set(t, t, t);
      if (t <= 0.01) {
        clearInterval(interval);
        navigate("/home"); // retour à la home
      }
    }, 16);
  };

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 0], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={null}>
  <group ref={groupRef}>
    <LavaBlobs count={20} /> {/* 🌋 Ajouté ici, pour les blobs de lave */}
    <FloatingBackground /> 🌌 Ajouté ici, dans la page à propos

    {/* Le reste de la scène */}
   
  </group>
  <OrbitControls target={[0, 1.5, -4]}/>
  <CircularInfoCarousel /> {/* 🌀 Carousel d'informations circulaire */}
</Suspense>

      </Canvas>
  <AmbientSound /> {/* 🔊 Son d'ambiance */}

      <button
        onClick={handleLeave}
        className="absolute top-4 left-4 px-4 py-2 bg-white text-black rounded"
      >
        Retour
      </button>
    </div>
  );
}







