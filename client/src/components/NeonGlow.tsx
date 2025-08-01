import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GlowShader } from "./GlowShader";

export default function NeonGlow({ width = 2.6, height = 1.7, color = "#00ffff" }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -0.05]}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={materialRef}
        args={[{
          ...GlowShader,
          uniforms: {
            ...GlowShader.uniforms,
            u_color: { value: new THREE.Color(color) }
          }
        }]}
        transparent
      />
    </mesh>
  );
}
