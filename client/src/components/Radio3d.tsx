import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import Player from "./Player";
import AnimatedFloatingText from "./AnimatedFloatingText";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";


const RadioModel = () => {
  const { scene } = useGLTF("/city.glb");
  return <primitive object={scene} scale={0.8} />;
};

const InteriorRoom = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="#999" />
      </mesh>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-3 + i * 3, 2, -4.95]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
};

export default function Radio3D() {
  const [inInterior, setInInterior] = useState(false);
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
const handleTransition = () => {
  if (!groupRef.current || !overlayRef.current) return;

  overlayRef.current.style.transition = "opacity 1s ease-in-out";
  overlayRef.current.style.opacity = "1";

  let t = 1;
  const interval = setInterval(() => {
    t -= 0.05; // ✅ diminution progressive
    if (groupRef.current) {
      groupRef.current.scale.set(t, t, t);
    }

    if (t <= 0.01) {
      clearInterval(interval);
      setTimeout(() => {
        navigate("/a-propos");
      }, 1000);
    }
  }, 16);
};



  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }} className="bg-black">
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
       <Suspense fallback={null}>
  {!inInterior && (
    <group ref={groupRef}>
      <AnimatedFloatingText />
      <RadioModel />
      <Player
        onEnterBuilding={() => {
          console.log("Entrée dans le bâtiment !");
          setInInterior(true);
          handleTransition();
        }}
      />
      <Text
        position={[0, 0.07, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        outlineWidth={0}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Jérémy Tichané
      </Text>
      <OrbitControls />
    </group>
  )}

          {inInterior && (
            <>
              <InteriorRoom />
              <Player />
              <OrbitControls />
            </>
          )}
        </Suspense>
      </Canvas>

      {/* FONDU NOIR */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black opacity-0 z-50"
      />
    </div>
  );
}
