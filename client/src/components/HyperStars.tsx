import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HyperStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const starData = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 4 * Math.PI;
      const radius = Math.random() * 50 + 50; // RAYON
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * -200;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      speeds[i] = 5 + Math.random() * 0.2; // VITESSE VARIABLE
    }

    return { positions, speeds };
  }, []);

 useFrame((_, delta) => {
  const positions = pointsRef.current!.geometry.attributes.position.array as Float32Array;
  const { speeds } = starData;

  for (let i = 0; i < speeds.length; i++) {
    const xIndex = i * 3;
    const yIndex = i * 3 + 1;
    const zIndex = i * 3 + 2;

    positions[zIndex] += speeds[i] * delta;

    if (positions[zIndex] > 5) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 50 + 50; // RAYON ENTRE 50 ET 100

      positions[xIndex] = Math.cos(angle) * radius;
      positions[yIndex] = Math.sin(angle) * radius;
      positions[zIndex] = -200 + Math.random() * 400; // RÉINITIALISER LA POSITION Z
    }
  }

  pointsRef.current!.geometry.attributes.position.needsUpdate = true;
});


  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starData.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}
