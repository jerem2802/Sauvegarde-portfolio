import { MarchingCubes } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

// Type personnalisé pour les méthodes spécifiques à MarchingCubes
interface MarchingCubesImpl extends Group {
  reset: () => void;
  addBall: (x: number, y: number, z: number, strength: number, subtract: number) => void;
}

type LavaBlobsProps = {
  count?: number;
};

export default function LavaBlobs({ count = 50 }: LavaBlobsProps) {
  const ref = useRef<MarchingCubesImpl>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!ref.current) return;

    ref.current.reset();

    for (let i = 0; i < count; i++) {
      const x = Math.sin(t * 0.01 + i) * 0.5 + 0.5;
      const y = Math.cos(t * 0.01 + i * 1.1) * 0.5 + 0.5;
      const z = Math.sin(t * 0.03 + i * 1.5) * 0.5 + 0.5;
      ref.current.addBall(x, y, z, 0.1, 1);
    }
  });

  return (
    <MarchingCubes
      ref={ref}
      resolution={50}
      maxPolyCount={20000}
      enableUvs={false}
      enableColors={false}
      position={[0, 0, 0]}
      scale={5}
    >
      <meshStandardMaterial
        color="#ff0055"
        emissive="#550033"
        metalness={0.2}
        roughness={0.3}
      />
    </MarchingCubes>
  );
}
