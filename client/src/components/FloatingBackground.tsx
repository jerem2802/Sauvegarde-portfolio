// ✅ src/components/FloatingBackground.tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type CubeInfo = {
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
};

export default function FloatingBackground({ count = 50 }) {
  const cubes = useRef<THREE.Mesh[]>([]);

  // Création initiale des positions aléatoires
  const initialPositions = Array.from({ length: count }, () =>
    new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10)
    )
  );

  const cubeInfos = useRef<CubeInfo[]>(
    Array.from({ length: count }, () => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    }))
  );

  useFrame(() => {
    cubes.current.forEach((cube, i) => {
      if (!cube) return;

      const info = cubeInfos.current[i];

      // Mise à jour position
      cube.position.add(info.velocity);

      // Rebond sur les limites (cube virtuel)
      (["x", "y", "z"] as const).forEach((axis) => {
        const pos = cube.position[axis];
        if (pos > 5 || pos < -5) {
          cube.position[axis] = THREE.MathUtils.clamp(pos, -5, 5);
          info.velocity[axis] *= -1;
        }
      });

      // Mise à jour rotation
      cube.rotation.x += info.rotationSpeed.x;
      cube.rotation.y += info.rotationSpeed.y;
      cube.rotation.z += info.rotationSpeed.z;
    });
  });

  return (
    <>
      {initialPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (cubes.current[i] = el!)}
          position={pos.clone()}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color={"#300186"}
            emissive={"#1d0f76"}
            emissiveIntensity={2}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </>
  );
}
