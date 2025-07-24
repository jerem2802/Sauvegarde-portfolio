import { Text, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Billboard } from "@react-three/drei";

// Gère le comportement de clignotement pour chaque texte
type FlickerState = {
  nextToggle: number;
  isOn: boolean;
};

export default function AnimatedFloatingText() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);

  const flickerStates = useRef<Map<THREE.Mesh, FlickerState>>(new Map());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    [ref1, ref2, ref3].forEach((ref) => {
      const mesh = ref.current as THREE.Mesh;
      if (!mesh || !(mesh.material instanceof THREE.MeshStandardMaterial)) return;

      const state = flickerStates.current.get(mesh) ?? {
        nextToggle: t + Math.random() * 4,
        isOn: true,
      };

      if (t > state.nextToggle) {
        state.isOn = !state.isOn;
        state.nextToggle = t + (state.isOn ? Math.random() * 4 + 3 : Math.random() * 0.25 + 0.09);
      }

      mesh.material.emissive = new THREE.Color("#00ffff"); // Néon cyan
      mesh.material.emissiveIntensity = state.isOn ? 2 : 0;

      flickerStates.current.set(mesh, state);
    });
  });

  return (
    <>
      <Text3D
        ref={ref1}
        position={[-0.28, 1.1, 0.29]}
        font="/fonts/Roboto_Regular.json"
        size={0.08}
        height={0.01}
        curveSegments={6}
        bevelEnabled={true}
        bevelThickness={0.005}
        bevelSize={0.002}
      >
        Projets
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1f1f1f"
          emissiveIntensity={8}
          metalness={0.5}
          roughness={0.3}
        />
      </Text3D>

      <Text3D
        ref={ref2}
        position={[-0.75, 1.3, 0.17]}
        font="/fonts/Roboto_Regular.json"
        size={0.07}
        height={0.01}
        curveSegments={6}
        bevelEnabled={true}
        bevelThickness={0.003}
        bevelSize={0.0015}
      >
        Contact
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1f1f1f"
          emissiveIntensity={8}
          metalness={0.5}
          roughness={0.3}
        />
      </Text3D>

      <Text3D
        ref={ref3}
        position={[-1.04, 1.05, 0.1]}
        font="/fonts/Roboto_Regular.json"
        size={0.04}
        height={0.01}
        curveSegments={6}
        bevelEnabled={true}
        bevelThickness={0.002}
        bevelSize={0.001}
      >
        A Propos
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1f1f1f"
          emissiveIntensity={8}
          metalness={0.5}
          roughness={0.3}
        />
      </Text3D>

          <Text3D
        ref={ref3}
        position={[0.40, 1.05, 0.9]}
        font="/fonts/Roboto_Regular.json"
        size={0.04}
        height={0.01}
        curveSegments={6}
        bevelEnabled={true}
        bevelThickness={0.002}
        bevelSize={0.001}
      >
    Bienvenue
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1f1f1f"
          emissiveIntensity={8}
          metalness={0.5}
          roughness={0.3}
        />
      </Text3D>
    </>
  );
}
