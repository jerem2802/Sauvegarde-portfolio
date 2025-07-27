import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ContactCard from "../components/ContactCard";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import HyperStars from "../components/HyperStars";

export default function Contact() {
  const navigate = useNavigate();

  return (
     <div className="relative w-full h-screen bg-black">
    {/* 🔁 Bouton identique à Projets.tsx */}
    <div className="absolute top-4 left-4 text-white z-10">
      <button
        className="absolute top-4 left-4 px-4 py-2 text-cyan-400 border border-cyan-400 rounded-xl font-orbitron text-sm shadow-[0_0_10px_#00ffff88] backdrop-blur bg-black/30 hover:bg-cyan-500 hover:text-black transition"
        onClick={() => navigate("/home")}
      >
        Retour
      </button>
    </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={1} />

        <Suspense fallback={null}>
          <ContactCard />
        </Suspense>

        {/* Glow autour de la carte */}
        <group position={[0, 0, 0.06]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.4, 3.4]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
          </mesh>

          {/* Contour lumineux */}
          <lineSegments position={[0, 0, 0.02]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(4, 3)]} />
            <lineBasicMaterial color="#00ffff" linewidth={2} />
          </lineSegments>

          <HyperStars />
        </group>
      </Canvas>
    </div>
  );
}
