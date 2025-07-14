import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

type PlayerProps = {
  onEnterBuilding?: (building: "about" | "projects") => void;
  startPosition?: [number, number, number];
};

export default function Player({
  onEnterBuilding,
  startPosition = [-0.2779, 0.1, 1.4401],
}: PlayerProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/walker1.glb");
  const { actions, mixer } = useAnimations(animations, group);

  const SCALE = 0.1;
  const speed = 0.002;
  const rotationSpeed = 0.03;

  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [hasEntered, setHasEntered] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const walkAnimName = animations[0]?.name ?? ""; // ← utilise automatiquement la première anim

  useEffect(() => {
    if (group.current) {
      group.current.position.set(...startPosition);
      group.current.scale.setScalar(SCALE);
    }
  }, [startPosition]);

  // Keyboard listeners
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

  // Handle animation
  useEffect(() => {
    if (!actions || !walkAnimName || !actions[walkAnimName]) return;
    const shouldWalk = keys["ArrowUp"] || keys["ArrowDown"] || keys["ArrowLeft"] || keys["ArrowRight"];


    if (shouldWalk && currentAction !== walkAnimName) {
      actions[currentAction!]?.fadeOut(0.3);
      actions[walkAnimName]?.reset().fadeIn(0.3).play();
      setCurrentAction(walkAnimName);
    }

    if (!shouldWalk && currentAction) {
      actions[currentAction]?.fadeOut(0.3);
      setCurrentAction(null);
    }
  }, [keys, actions, currentAction, walkAnimName]);

  // Movement
  const boundaries = {
    minX: -1.4,
    maxX: 1.4,
    minZ: -0.59,
    maxZ: 1.6,
  };

  useFrame((_, delta) => {
    mixer?.update(delta);

    if (!group.current) return;
    const prevPos = group.current.position.clone();

    if (keys["ArrowLeft"]) group.current.rotation.y += rotationSpeed;
    if (keys["ArrowRight"]) group.current.rotation.y -= rotationSpeed;
    if (keys["ArrowUp"]) group.current.translateZ(speed);
    if (keys["ArrowDown"]) group.current.translateZ(-speed);
    console.log("position", group.current.position.toArray());

    const pos = group.current.position;
    if (
      pos.x < boundaries.minX || pos.x > boundaries.maxX ||
      pos.z < boundaries.minZ || pos.z > boundaries.maxZ
    ) {
      group.current.position.copy(prevPos);
    }

    const inAboutZone = pos.x > -0.95 && pos.x < -0.89 && pos.z > 0.07 && pos.z < 0.13;
    const inProjectsZone = pos.x > -0.01 && pos.x < 0.07 && pos.z > 0.25 && pos.z < 0.3;

    if ((inAboutZone || inProjectsZone) && !hasEntered) {
      setHasEntered(true);
      onEnterBuilding?.(inAboutZone ? "about" : "projects");
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/walker1.glb");
