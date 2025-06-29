import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const projects = [
  { title: "Domino's Cliker", description: "Un Cookie Clicker est un type de jeu (ou Idle Game) incremental dans lequel le joueur clique pour produire un objet ou une ressource, puis dépense ces ressources pour automatiser la production et augmenter le rendement." },
  { title: "Jam", description: "Jeu WebGL multijoueur." },
  { title: "Wildcom", description: "Installation 3D interactive." },
];

export default function VerticalProjectCarousel() {
  const groupRef = useRef<THREE.Group>(null);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  // 🎮 Contrôle clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelected((prev) => Math.min(projects.length - 1, prev + 1));
      } else if (e.key === "ArrowUp") {
        setSelected((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Enter") {
        console.log("Projet validé :", projects[selected].title);
      } else if (e.key === "Escape") {
        navigate("/"); // ← Retour à l'accueil
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  // 🎥 Animation + lévitation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      const targetY = selected * 2.5;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;

      groupRef.current.children.forEach((child, i) => {
        const floatOffset = Math.sin(t * 0.5 + i) * 0.05;
        child.position.x = Math.sin(t * 0.6 + i) * 0.02;
        child.position.z = Math.cos(t * 0.5 + i) * 0.02;
        child.position.y = -i * 2.5 + floatOffset;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const isSelected = i === selected;
        const y = -i * 2.5;

        return (
          <group key={i} position={[0, y, 0]}>
            <mesh>
              <planeGeometry args={[3, 1]} />
              <meshBasicMaterial
                color={isSelected ? "#00ffff" : "#222288"}
                transparent
                opacity={0.2}
              />
            </mesh>

            <Text
              fontSize={0.4}
              color={isSelected ? "#00ffff" : "#4444ff"}
              outlineColor="#00ffff"
              outlineWidth={isSelected ? 0.02 : 0.008}
              anchorX="center"
              anchorY="middle"
            >
              {project.title}
            </Text>
          </group>
        );
      })}

      {/* 🧭 Instructions en bas */}
  {/* 🧭 Instructions flottantes en haut à droite */}



    </group>
  );
}
