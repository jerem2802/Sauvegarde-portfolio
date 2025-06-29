import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticleProps = {
  count?: number;
};

export default function SpaceNebula({ count = 1000 }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const time = useRef(0);

  useFrame(() => {
    time.current += 0.01;
    if (mesh.current) {
      mesh.current.rotation.y = time.current * 0.1;
      mesh.current.rotation.x = Math.sin(time.current * 0.1) * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={"#ccfaff"}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}
