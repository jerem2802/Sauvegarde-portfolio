import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

type PlayerProps = {
  onEnterBuilding?: () => void;
  startPosition?: [number, number, number];
};

export default function Player({ onEnterBuilding, startPosition = [-0.27790872879685274, 0.1, 1.4401438935146833] }: PlayerProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/player.glb");
  const { actions } = useAnimations(animations, group);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [hasEntered, setHasEntered] = useState(false);
  const SCALE = 0.001;

  // ✅ Initialisation position et échelle
  useEffect(() => {
    if (!group.current) return;

    // On fixe la position et le scale sans calcul imprévisible
    group.current.position.set(...startPosition);
    group.current.scale.setScalar(SCALE);
  }, [scene, startPosition]);

  // 🎮 Clavier
  useEffect(() => {
    const down = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key]: true }));
    const up = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key]: false }));
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // ▶️ Animation
  useEffect(() => {
    if (actions && animations.length > 0) {
      const walk = animations[0].name;
      if (keys["ArrowUp"]) actions[walk]?.play();
      else actions[walk]?.stop();
    }
  }, [keys, actions, animations]);

  // 📦 Limites
  const boundaries = {
    minX: -1.4,
    maxX: 1.4,
    minZ: -0.59,
    maxZ: 1.6,
  };

  // 🕹️ Mouvement
  useFrame(() => {
    if (!group.current) return;
    console.log("📍 Position actuelle :", group.current.position.clone());


    const speed = 0.003;
    const rotationSpeed = 0.03;
    const pos = group.current.position.clone();

    if (keys["ArrowLeft"]) group.current.rotation.y += rotationSpeed;
    if (keys["ArrowRight"]) group.current.rotation.y -= rotationSpeed;
    if (keys["ArrowUp"]) group.current.translateZ(speed);
    if (keys["ArrowDown"]) group.current.translateZ(-speed);

    const newPos = group.current.position;

    // 💥 Collision
    if (
      newPos.x < boundaries.minX || newPos.x > boundaries.maxX ||
      newPos.z < boundaries.minZ || newPos.z > boundaries.maxZ
    ) {
      group.current.position.copy(pos);
    }

    // 🚪 Entrée dans la porte
    const inDoorZone =
      newPos.x > -0.95 && newPos.x < -0.89 &&
      newPos.z > 0.07 && newPos.z < 0.13;

    if (inDoorZone && !hasEntered) {
      setHasEntered(true);
      console.log("🚪 Entrée détectée dans la porte !");
      if (onEnterBuilding) onEnterBuilding();
    }
  });
  

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
