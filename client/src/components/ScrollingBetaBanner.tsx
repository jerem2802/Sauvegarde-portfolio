import { Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ScrollingBetaBanner({ speed = 0.001 }: { speed?: number }) {
  const textRef = useRef<THREE.Mesh>(null);

  const startX = 2.1;
  const endX = -2;
  const y = 0.09;
  const z = 1.650;

  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.x -= speed;
      if (textRef.current.position.x < endX) {
        textRef.current.position.x = startX;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={[startX, y, z]}
      fontSize={0.08}
      color="orange"
      anchorX="center"
      anchorY="middle"
      
      
     
    >
      🚧 Portfolio en version BETA – Optimisation en cours 🚧
    </Text>
  );
}
