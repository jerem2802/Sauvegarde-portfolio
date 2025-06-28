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
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeBoundingBox();
        const box = mesh.geometry.boundingBox;
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

 // Limites de la scène
const boundaries = {
  minX: -1.4,
  maxX: 1.4,
  minZ: -0.59,
  maxZ: 1.6,
};


useFrame(() => {
  if (!group.current) return;

  const speed = 0.003;
  const rotationSpeed = 0.03;
  const pos = group.current.position.clone();

  if (keys["ArrowLeft"]) group.current.rotation.y += rotationSpeed;
  if (keys["ArrowRight"]) group.current.rotation.y -= rotationSpeed;
  if (keys["ArrowUp"]) group.current.translateZ(speed);
  if (keys["ArrowDown"]) group.current.translateZ(-speed);

  const newPos = group.current.position;

  // 🔁 Collision avec limites globales
  if (
    newPos.x < boundaries.minX || newPos.x > boundaries.maxX ||
    newPos.z < boundaries.minZ || newPos.z > boundaries.maxZ
  ) {
    group.current.position.copy(pos);
  }

  // ✅ Zone du pas de la porte
  const inDoorZone =
    newPos.x > -0.95 && newPos.x < -0.89 &&
    newPos.z > 0.07 && newPos.z < 0.13;

  if (inDoorZone && !hasEntered) {
    setHasEntered(true);
    console.log("🚪 Entrée détectée dans la porte !");
    if (onEnterBuilding) onEnterBuilding(); // callback pour changer de page
  }
});




  return (
      
    <group ref={group} position={[0.9, 0.10, 0.9]}>
      <primitive object={scene} scale={SCALE} />

    </group>
    
  );
}
