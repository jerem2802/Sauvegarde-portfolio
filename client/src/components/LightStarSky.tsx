import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function LightStarSky() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 35; 
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 4));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01; 
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#4CC0DB"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={3}
      />
    </points>
  );
}
