// src/components/Player.tsx
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Player() {
  const ref = useRef<any>();
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key]: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const speed = 0.05;

    if (keys["ArrowUp"]) ref.current.position.z -= speed;
    if (keys["ArrowDown"]) ref.current.position.z += speed;
    if (keys["ArrowLeft"]) ref.current.position.x -= speed;
    if (keys["ArrowRight"]) ref.current.position.x += speed;
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
