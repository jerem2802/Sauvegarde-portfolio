import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ISSModelProps = {
  speed?: number;
  radius?: number;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
};

export default function ISSModel({
  speed = 1,
  radius = 2,
  position = [0, 0, 0],
  scale = 0.2,
  rotation = [0, 0, 0],
}: ISSModelProps) {
  const { scene } = useGLTF("/models/scene.gltf");
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      ref.current.position.x = Math.sin(t) * radius + position[0];
      ref.current.position.z = Math.cos(t) * radius + position[2];
      ref.current.position.y = position[1];
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      rotation={rotation}
    />
  );
}
