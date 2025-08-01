import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const generateAmbientPoints = (count: number) =>
  Array.from({ length: count }, () => ({
    position: new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(15),
      THREE.MathUtils.randFloatSpread(4),
      THREE.MathUtils.randFloatSpread(10)
    ),
    scale: THREE.MathUtils.randFloat(0.01, 0.05),
    pulseSpeed: THREE.MathUtils.randFloat(0.5, 1.5),
    color: new THREE.Color(
      `hsl(${THREE.MathUtils.randInt(180, 240)}, 100%, 65%)`
    ),
  }));

export default function TechnoAmbientField({ count = 150 }) {
  const groupRef = useRef<THREE.Group>(null);
  const points = useRef(generateAmbientPoints(count)).current;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current?.children.forEach((child, i) => {
      const p = points[i];
      const scale = p.scale + Math.sin(t * p.pulseSpeed + i) * 0.01;
      child.scale.set(scale, scale, scale);
    });
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p.position}>
          <icosahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color.clone().multiplyScalar(0.9)}
            metalness={0.4}
            roughness={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
