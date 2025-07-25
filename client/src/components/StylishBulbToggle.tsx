import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

type StylishBulbToggleProps = {
  onToggle: (enabled: boolean) => void;
  position?: [number, number, number];
  scale?: [number, number, number];
};

export default function StylishBulbToggle({
  onToggle,
  position = [0.36, 0.98, 0.0],
  scale = [0.4, 0.4, 0.4],
}: StylishBulbToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const bulbRef = useRef<THREE.Mesh>(null);
  const filamentRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    const next = !isDark;
    setIsDark(next);
    onToggle(next);
  };

  useFrame(() => {
    if (isDark && filamentRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.03;
      filamentRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position} scale={scale} onClick={handleClick}>
<Html>
  <div style={{ cursor: "pointer" }} />
</Html>


      {/* Socle métal */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
        <meshStandardMaterial color="gray" metalness={1} roughness={0.3} />
      </mesh>

      {/* Bulbe verre */}
      <mesh ref={bulbRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0}
          thickness={0.5}
          reflectivity={0.9}
          metalness={0.1}
          clearcoat={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Filament */}
      <mesh ref={filamentRef} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.06, 0.01, 8, 16]} />
        <meshStandardMaterial
          color={isDark ? "#ffcc00" : "#444"}
          emissive={isDark ? "#ffcc00" : "#000"}
          emissiveIntensity={isDark ? 2.5 : 0}
        />
      </mesh>
    </group>
  );
}
