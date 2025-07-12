import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import ISSModel from "../components/IssModel";
import VerticalProjectCarousel from "../components/VerticalCarousel";
import { useEffect } from "react";


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
    if (!groupRef.current || !overlayRef.current) return;

    overlayRef.current.style.transition = "opacity 1s ease-in-out";
    overlayRef.current.style.opacity = "1";

    let t = 1;
    const interval = setInterval(() => {
      t -= 0.05;
      if (groupRef.current) {
        groupRef.current.scale.set(t, t, t);
      }
      if (t <= 0.01) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }, 16);
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
    </group>

    
   
  </Suspense>
</Canvas>


      {/* UI - Contrôles clavier */}
      <div className="absolute top-4 right-4 text-cyan-300 text-sm text-right z-20 font-mono space-y-1">
        <div>
          <span className="bg-cyan-500 text-black px-1 rounded">↑</span> /{" "}
          <span className="bg-cyan-500 text-black px-1 rounded">↓</span> : Naviguer
        </div>
        <div>
          <span className="bg-cyan-500 text-black px-1 rounded">Entrée</span> : Valider
        </div>
        <div>
          <span className="bg-cyan-500 text-black px-1 rounded">Échap</span> : Quitter
        </div>
      </div>

      {/* Overlay noir de transition */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black opacity-0 z-50"
      />

      {/* Texte d’intro */}
      <div className="absolute top-4 left-4 text-white z-10">
               
        <button
          className="mt-4 px-4 py-2 bg-blue-400 text-black rounded font-bold hover:bg-blue-500 transition-colors "
          onClick={handleBack}
        >
          Retour 
        </button>
      </div>
    </div>
  );
}
