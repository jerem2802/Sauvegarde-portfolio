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
      {/* 💡 Ampoule visible en 3D */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          emissive={"#ffffaa"}
          emissiveIntensity={isDarkMode ? 1 : 0}
          color={"#000"}
        />
      </mesh>

      {/* 💡 Source de lumière */}
      <pointLight
        ref={lightRef}
        position={[0, 2.2, 0]}
        intensity={0}
        distance={5}
        color={"#ffffcc"}
        castShadow
      />
    </group>
  );
}
