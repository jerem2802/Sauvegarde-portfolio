import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { Suspense } from "react";
import Player from "./player";

const RadioModel = () => {
  const { scene } = useGLTF("/city.glb");
  return <primitive object={scene} scale={0.5} />;
};

export default function Radio3D() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        {/* Lumières globales */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Suspense fallback={null}>
          {/* Modèle 3D */}
          <RadioModel />
          <Player />

         
          {/* Texte affiché au sol */}
          <Text
            position={[0, 0.07, 0.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.2}
            outlineWidth={0.02}
            outlineColor={"black"}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Jérémy Tichané
          </Text>

          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
