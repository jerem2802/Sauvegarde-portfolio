// import { Text, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


export default function AnimatedFloatingText() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale1 = 1 + Math.sin(t * 3) * 0.1;
    const scale2 = 1 + Math.sin(t * 2.5) * 0.1;
    const scale3 = 1 + Math.sin(t * 2) * 0.1;

    if (ref1.current) {
      ref1.current.scale.set(scale1, scale1, scale1);
    }
    if (ref2.current) {
      ref2.current.scale.set(scale2, scale2, scale2);
    }
    if (ref3.current) {
      ref3.current.scale.set(scale3, scale3, scale3);
    }
  });

  return (
    <>
      {/* <Text3D
      
        ref={ref1}
        position={[-0.1, 1.1, 0.31]}
        fontSize={0.080}
        color="white"
        outlineWidth={0.02}
        outlineColor="black"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
       font="/Fonts/Roboto-Regular.json"

        
      
      >
        Projets
      </Text3D>

      <Text3D
        ref={ref2}
        position={[0.35, 0.75, 0.2]}
        fontSize={0.06}
        color="white"
        outlineWidth={0.02}
        outlineColor="black"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
              font="/Fonts/Roboto-Regular.json"

      >
        Contact
      </Text3D>

        <Text3D
        ref={ref3}
        position={[-0.93, 1, 0.1]}
        fontSize={0.03}
        color="white"
        outlineWidth={0.02}
        outlineColor="black"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
               font="/Fonts/Roboto-Regular.json"
      >
        A Propos
      </Text3D> */}
      
    </>
  );
}
