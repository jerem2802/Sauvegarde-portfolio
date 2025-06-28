import { MarchingCubes } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MarchingCubes as MarchingCubesImpl } from "three-stdlib"; // 👈 Type natif avec les méthodes reset & addBall

type LavaBlobsProps = {
  count?: number;
};

export default function LavaBlobs({ count = 50 }: LavaBlobsProps) {
  // 👌 Ref bien typé, sans cast
  const ref = useRef<MarchingCubesImpl | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
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
