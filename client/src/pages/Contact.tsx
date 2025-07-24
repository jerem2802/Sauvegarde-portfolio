import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ContactCard from "../components/ContactCard";
import { Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import HyperStars from "../components/HyperStars";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
    >
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 2]} intensity={1} />

      <Suspense fallback={null}>
        <ContactCard />
      </Suspense>
     

      {/* Fond de contact */}

      {/* Bouton retour */}
      <group position={[0,0, 0.06]}>
        {/* Glow autour de la carte */}
<mesh position={[0, 0, -0.01]}>
  <planeGeometry args={[4.4, 3.4]} />
  <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
</mesh>

{/* Contour lumineux */}
<lineSegments position={[0, 0, .02]}>
  <edgesGeometry args={[new THREE.PlaneGeometry(4, 3)]} />
  <lineBasicMaterial color="#00ffff" linewidth={2} />
</lineSegments>
<HyperStars />

</group>
 <Html position={[-5.5, 2.6, 0]} transform occlude>
  <button
    onClick={() => navigate("/home")}
    onPointerOver={() => (document.body.style.cursor = "pointer")}
    onPointerOut={() => (document.body.style.cursor = "default")}
    style={{
      background: "#00aaff",
      color: "black",
      padding: "0.1rem 0.4rem",
      fontSize: "0.3rem",
      borderRadius: "4px",
      fontWeight: "bold",
      boxShadow: "0 0 10px rgba(0,255,255,0.5)",
      border: "none",
    }}
  >
    Retour
  </button>
</Html>


    </Canvas>
  );
}
