import { Text3D, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type FlickerState = {
  nextToggle: number;
  isOn: boolean;
};

export default function AnimatedFloatingText() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);
  const refBienvenue = useRef<THREE.Mesh>(null);

  const flickerStates = useRef<Map<THREE.Mesh, FlickerState>>(new Map());

  // TEXTURE BIENVENUE
  const [baseColor, normalMap, roughnessMap, metalMap, aoMap] = useTexture([
    "/models/textures/metal/Metal_007_basecolor.png",
    "/models/textures/metal/Metal_007_normal.png",
    "/models/textures/metal/Metal_007_roughness.png",
    "/models/textures/metal/Metal_007_metallic.png",
    "/models/textures/metal/Metal_007_ambientOcclusion.png",
  ]);

 
  useEffect(() => {
    if (refBienvenue.current?.geometry) {
      refBienvenue.current.geometry.setAttribute(
        "uv2",
        refBienvenue.current.geometry.attributes.uv
      );
    }
  }, []);

  const baseY = 1.25;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ANIMATION BIENVENUE
    if (refBienvenue.current) {
      refBienvenue.current.position.y = baseY + Math.sin(t * 1.5) * 0.015;
      refBienvenue.current.rotation.z = Math.sin(t * 1.2) * 0.05;
    }

   
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

      mesh.material.emissive = new THREE.Color("#00ffff");
      mesh.material.emissiveIntensity = state.isOn ? 2 : 0;

      flickerStates.current.set(mesh, state);
    });
  });

  return (
    <>
      {/* PROJETS */}
      <Text3D
        ref={ref1}
        position={[-0.28, 1.1, 0.29]}
        font="/fonts/Roboto_Regular.json"
        size={0.08}
        height={0.01}
        curveSegments={6}
        bevelEnabled
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

      {/* CONTACT */}
      <Text3D
        ref={ref2}
        position={[-0.75, 1.3, 0.17]}
        font="/fonts/Roboto_Regular.json"
        size={0.07}
        height={0.01}
        curveSegments={6}
        bevelEnabled
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

      {/* A PROPOS */}
      <Text3D
        ref={ref3}
        position={[-1.04, 1.05, 0.1]}
        font="/fonts/Roboto_Regular.json"
        size={0.04}
        height={0.01}
        curveSegments={6}
        bevelEnabled
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

      {/* BIENVENUE */}
      <Text3D
        ref={refBienvenue}
        position={[1.5, baseY, 0.2]}
        rotation={[0.3, -0.7, -0.7]}
        font="/fonts/Roboto_Regular.json"
        size={0.08}
        height={0.02}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.009}
        bevelSize={0.002}
      >
        Bienvenue
        <meshPhysicalMaterial
          map={baseColor}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalMap}
          aoMap={aoMap}
          metalness={3}
          roughness={0.1}
          clearcoat={0.1}
          clearcoatRoughness={5}
          reflectivity={2}
          transmission={0}
          thickness={0.1}
        />
      </Text3D>
    </>
  );
}
