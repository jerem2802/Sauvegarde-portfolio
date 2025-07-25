import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import ISSModel from "../components/IssModel";
import VerticalProjectCarousel from "../components/VerticalCarousel";
import { useEffect } from "react";
import KeyboardInstructions from "../components/KeyboardInstructions";


export default function Projets() {
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

 useEffect(() => {
  const audio = new Audio("/sounds/projets-ambiance.mp3");
  audio.loop = true;
  audio.volume = 0.4;

  const playAudio = () => {
    audio.play().catch((err) => console.warn("Audio bloqué :", err));
    window.removeEventListener("click", playAudio);
  };

  window.addEventListener("click", playAudio);

  return () => {
    // Nettoyage à la sortie du composant
    window.removeEventListener("click", playAudio);
    audio.pause();
    audio.currentTime = 0;
  };
}, []);



 const handleBack = () => {
  navigate("/");
};

  return (
    <div className="relative w-full j h-screen bg-black">
    <Canvas
  camera={{ position: [0, 0.6, 2.5], fov: 75 }}
  onCreated={({ camera }) => {
    camera.layers.enable(1);
  }}
>
  <Suspense fallback={null}>
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <ISSModel speed={0.3} radius={5} />
      <ambientLight intensity={0.3} />
<directionalLight position={[5, 5, 5]} intensity={1} />

      <VerticalProjectCarousel />
      <OrbitControls />
      <KeyboardInstructions />
    </group>

    
   
  </Suspense>
</Canvas>

           <div
        ref={overlayRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black opacity-0 z-50"
      />

      
      <div className="absolute top-4 left-4 text-white z-10">
               
       <button
  className="absolute top-4 left-4 px-4 py-2 text-cyan-400 border border-cyan-400 rounded-xl font-orbitron text-sm shadow-[0_0_10px_#00ffff88] backdrop-blur bg-black/30 hover:scale-105 transition-transform"
  onClick={handleBack}
>
  Retour
</button>

      </div>
    </div>
  );
}
