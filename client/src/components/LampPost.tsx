import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LampPostProps = {
  position: [number, number, number];
  isDarkMode: boolean;
};

export default function LampPost({ position, isDarkMode }: LampPostProps) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        isDarkMode ? 1.5 : 0,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      {/* 💡 Pastille lumineuse plate à l’intérieur de l’abat-jour */}
      <mesh position={[0, 2.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial
          color={"#ffffcc"}
          emissive={"#ffffcc"}
          emissiveIntensity={isDarkMode ? 3.5 : 0}
          transparent
          opacity={isDarkMode ? 1 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 💡 Lumière réelle */}
      <pointLight
        ref={lightRef}
        position={[0, 2.22, 0]}
        intensity={0}
        distance={5}
        color={"#ffffcc"}
        castShadow
      />
    </group>
  );
}
