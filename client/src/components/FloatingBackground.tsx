import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const gridSize = 10;
const spacing = 0.6;

export default function FloatingBackground() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current?.children.forEach((child, i) => {
      const wave = Math.sin(t + i * 0.15) * 0.05;
      child.position.z = wave;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const x = (i % gridSize) * spacing - (gridSize * spacing) / 2;
        const y = Math.floor(i / gridSize) * spacing - (gridSize * spacing) / 2;

        return (
          <mesh key={i} position={[x, y, 0]}>
            <circleGeometry args={[0.05, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00aaff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}
