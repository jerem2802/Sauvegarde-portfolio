import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { Suspense, useState } from "react";
import Player from "./Player";
import AnimatedFloatingText from "./AnimatedFloatingText";


// Modèle de ville
const RadioModel = () => {
  const { scene } = useGLTF("/city.glb");
  return <primitive object={scene} scale={0.8} />;
};

// Modèle intérieur vide
const InteriorRoom = () => {
  return (
    <group>
      {/* Sol */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Mur de fond pour exposer des cadres */}
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="#999" />
      </mesh>

      {/* Exemples de cadres */}
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

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }} className="bg-black">
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Suspense fallback={null} >
          {!inInterior && (
            <>
            <AnimatedFloatingText />
              <RadioModel />
              <Player
                onEnterBuilding={() => {
                  console.log("Entrée dans le bâtiment !");
                  setInInterior(true);
                }}
              />
  

              
              <Text
                position={[0, 0.07, 0.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.2}
                outlineWidth={0}
                outlineColor={"pink"}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Jérémy Tichané
              </Text>
              <OrbitControls />
            </>
          )}

          {inInterior && (
            <>
              <InteriorRoom />
              <Player onEnterBuilding={() =>  {
                console.log("Entrée dans le bâtiment !");
                setInInterior(true);
              }} />
              
              <OrbitControls />
            </>
          )}
        </Suspense >
      </Canvas>
    </div>
  );
}
