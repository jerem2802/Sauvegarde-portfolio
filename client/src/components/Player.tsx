import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Player({ onEnterBuilding }: { onEnterBuilding?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/player.glb");
  const { actions } = useAnimations(animations, group);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [hasEntered, setHasEntered] = useState(false);
  const SCALE = 0.001;

  // Position initiale du perso
  useEffect(() => {
    if (!group.current) return;

    let lowestY = Infinity;
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox();
        const box = child.geometry.boundingBox;
        if (box && box.min.y < lowestY) {
          lowestY = box.min.y;
        }
      }
    });

    group.current.position.set(0.9, -lowestY * SCALE + 0.02, 0.9);
  }, [scene]);

  // Gestion clavier
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

  // Lancement de l’animation
  useEffect(() => {
    if (actions && animations.length > 0) {
      const walk = animations[0].name;
      if (keys["ArrowUp"]) actions[walk]?.play();
      else actions[walk]?.stop();
    }
  }, [keys, actions, animations]);

  // Déplacements + détection d’entrée
  useFrame(() => {
    if (!group.current) return;
    

    const speed = 0.003;
    if (keys["ArrowLeft"]) group.current.rotation.y += 0.03;
    if (keys["ArrowRight"]) group.current.rotation.y -= 0.03;
    if (keys["ArrowUp"]) group.current.translateZ(speed);
    if (keys["ArrowDown"]) group.current.translateZ(-speed);

    const pos = group.current.position;

    // Debug : afficher la position
    console.log(`x: ${pos.x.toFixed(2)} z: ${pos.z.toFixed(2)}`);

    // Zone d’entrée dans le bâtiment
    const inZone = pos.x > -1 && pos.x < 1 && pos.z > -3 && pos.z < -1;

    if (inZone && !hasEntered) {
      setHasEntered(true);
      console.log("✅ Entrée détectée dans la zone du bâtiment !");
      if (onEnterBuilding) onEnterBuilding();
    }
  });

  return (
    <group ref={group} position={[0.9, 0.09, 0.9]}>
      <primitive object={scene} scale={SCALE} />
    </group>
  );
}
