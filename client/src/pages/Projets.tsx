import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import ISSModel from "../components/IssModel";
import VerticalProjectCarousel from "../components/VerticalCarousel";



export default function Projets() {
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0.6, 2.5], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          
          <group ref={groupRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <ISSModel speed={0.3} radius={5}/>
            {/* Uncomment the next line to add a nebula effect */}
            {/* <SpaceNebula count={1000} /> */}
            <VerticalProjectCarousel/>
            <OrbitControls
  // enablePan={false}
  // enableZoom={false}
  // minPolarAngle={Math.PI / 2}
  // maxPolarAngle={Math.PI / 2}
  // minAzimuthAngle={0}
  // maxAzimuthAngle={0}
/>

          </group>
        </Suspense>
      </Canvas>
      <div
  className="absolute top-4 right-4 text-cyan-300 text-sm text-right z-20 font-mono space-y-1"
>
  <div><span className="bg-cyan-500 text-black px-1 rounded">↑</span> / <span className="bg-cyan-500 text-black px-1 rounded">↓</span> : Naviguer</div>
  <div><span className="bg-cyan-500 text-black px-1 rounded">Entrée</span> : Valider</div>
  <div><span className="bg-cyan-500 text-black px-1 rounded">Échap</span> : Quitter</div>
</div>


      <div
        ref={overlayRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black opacity-0 z-50"
      />

      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-4xl font-bold">🚀 Mes Projets</h1>
        <p className="mt-2 text-lg max-w-md">
          Une collection de projets interactifs, visuels, expérimentaux.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-white text-black rounded"
          onClick={handleBack}
        >
          Retour à la ville
        </button>
      </div>
    </div>
  );
}
