import { Text, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Billboard } from "@react-three/drei";

// Type pour gérer l'état de flicker d'un texte
type FlickerState = {
  nextToggle: number;
  isOn: boolean;
};

export default function AnimatedFloatingText() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);

  // Map qui garde l’état de chaque ref
  const flickerStates = useRef<Map<THREE.Mesh, FlickerState>>(new Map());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    [ref1, ref2, ref3].forEach((ref) => {
      const mesh = ref.current as THREE.Mesh;
      if (!mesh || !(mesh.material instanceof THREE.MeshStandardMaterial)) return;

      const state = flickerStates.current.get(mesh) ?? {
        nextToggle: t + Math.random() * 3,
        isOn: true,
      };

      if (t > state.nextToggle) {
        state.isOn = !state.isOn;
        // On reste allumé entre 2-4s, éteint entre 0.05-0.2s
        state.nextToggle = t + (state.isOn ? Math.random() * 2 + 2 : Math.random() * 0.15 + 0.05);
      }

      mesh.material.emissive = new THREE.Color("#6EE6F5");
      mesh.material.emissiveIntensity = state.isOn ? 2 : 0;

      flickerStates.current.set(mesh, state);
    });
  });

  return (
    <>
      <Text3D
        ref={ref1}
        position={[-0.32, 1.1, 0.29]}
        font="/fonts/Roboto_Regular.json"
        size={0.1}
        height={0.012}
        curveSegments={6}
        bevelEnabled={false}
      >
        Projets
        <meshStandardMaterial
          color="white"
          emissive="#1F1F1F"
          emissiveIntensity={8}
          metalness={1}
        />
      </Text3D>

      <Text3D
        ref={ref2}
        position={[0.21, 0.75, 0.17]}
        font="/fonts/Roboto_Regular.json"
        size={0.06}
        height={0.012}
        curveSegments={6}
        bevelEnabled={false}
      >
        Contact
        <meshStandardMaterial
          color="white"
          emissive="#1F1F1F"
          emissiveIntensity={1}
          metalness={1}
        />
      </Text3D>

      <Text3D
        ref={ref3}
        position={[-1.02, 1, 0.1]}
        font="/fonts/Roboto_Regular.json"
        size={0.032}
        height={0.012}
        curveSegments={6}
        bevelEnabled={false}
        castShadow
      >
        A Propos
        <meshStandardMaterial
          color="white"
          emissive="#1F1F1F"
          emissiveIntensity={8}
          metalness={1}
        />
      </Text3D>

      <Billboard position={[4, 3, -3]}>
        <Text fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          Bienvenue
        </Text>
      </Billboard>
    </>
  );
}
