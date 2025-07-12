import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Text3D } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { TextureLoader } from "three";

// === CONFIGURATION DES CARTES ===
const cardSettings: Record<
  string,
  {
    titlePosition?: [number, number, number];
    titleSize?: number;
    bevel?: boolean;
  }
> = {
  "Domino's Cliker": {
    titlePosition: [-1.15, 0, 0.1],
    titleSize: 0.2,
  },
  Jam: {
    titlePosition: [-0.8, -0.1, 0],
    titleSize: 0.4,
  },
  Wildcom: {
    titlePosition: [-1, -0.1, 0],
    titleSize: 0.3,
    bevel: true,
  },
};

const projects = [
  {
    title: "Domino's Cliker",
    description:
      "Jeu de clic interacif.\nAchetez des ingrédients\nmulplicateurs !\nEt multipliez vos parts de pizza !",
    texture: "/logo-pizza.png",
    color: "#FF0033",
    url: "https://wildcodeschool-2024-09.github.io/JS-RemoteFR-Vendangeurs-P1-Dominos-Clicker/",
  },
  {
    title: "Jam",
    description:
      "Une Plateforme d'écoute musicale\nconnectée à la librairie compléte\nDeezer où vous pouvez écouter\nvos artistes préférés.",
    texture: "/jam.png",
    color: "#FF7300",
    url: "https://jam-music-client-vojs.vercel.app/",
  },
  {
    title: "Wildcom",
    description:
      "Le réseau social\ndes développeurs.\nPartagez vos projets,\nvos idées, et collaborez !",
    texture: "/logo-wildcom.png",
    color: "#00FFFF",
  },
];

export default function VerticalProjectCarousel() {
  const groupRef = useRef<THREE.Group>(null);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const textures = useLoader(TextureLoader, projects.map((p) => p.texture));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      let next = selected;

      if (e.key === "ArrowDown") {
        next = Math.min(projects.length - 1, selected + 1);
      } else if (e.key === "ArrowUp") {
        next = Math.max(0, selected - 1);
      } else if (e.key === "Enter") {
        const selectedProject = projects[selected];
        if (selectedProject.url) {
          window.open(selectedProject.url, "_blank");
        } else {
          console.log("Projet validé :", selectedProject.title);
        }
      } else if (e.key === "Escape") {
        navigate("/");
      }

      if (next !== selected) {
        setSelected(next);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, navigate]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const targetY = selected * 2.5;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.1
      );

      groupRef.current.children.forEach((child, i) => {
        const baseY = -i * 2.5;
        const float = Math.sin(t * 0.5 + i) * 0.05;
        child.position.y = baseY + float;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const isSelected = i === selected;
        const settings = cardSettings[project.title] || {};
        const titlePosition = settings.titlePosition || [-1, -0.1, 0];
        const titleSize = settings.titleSize || 0.3;
        const bevel = settings.bevel || false;

        return (
          <group key={i}>
            {/* Carte */}
            <mesh>
              <planeGeometry args={[3, 1]} />
              <meshBasicMaterial
                color={isSelected ? "#00ffff" : "#222288"}
                transparent
                opacity={0.2}
              />
            </mesh>

            {/* Titre */}
            <Text3D
              key={project.title}
              position={titlePosition}
              font="/fonts/Orbitron_Regular.json"
              size={titleSize}
              height={0.04}
              curveSegments={12}
              bevelEnabled={bevel}
              bevelSize={bevel ? 0.015 : 0}
              bevelThickness={bevel ? 0.03 : 0}
              bevelSegments={bevel ? 5 : 0}
            >
              {project.title}
              <meshStandardMaterial
                color={isSelected ? project.color : "#4444ff"}
                emissive={isSelected ? project.color : "#000000"}
                emissiveIntensity={isSelected ? 1.2 : 0}
              />
            </Text3D>

            {/* Logo + Description + Indicateur */}
            {isSelected && (
              <>
                {/* Logo */}
                <mesh position={[-2.5, 0, 0]} rotation={[0, 0.5, 0]}>
                  <planeGeometry args={[1, 1]} />
                  <meshBasicMaterial map={textures[i]} transparent />
                </mesh>

                {/* Description */}
                <mesh position={[1.8, 0.2, 0]} rotation={[0, 0, 0]}>
                  <Text3D
                    font="/fonts/Orbitron_Regular.json"
                    size={0.08}
                    height={0.0}
                    curveSegments={6}
                    bevelEnabled={false}
                  >
                    {project.description}
                    <meshStandardMaterial
                      color={project.color}
                      emissive={project.color}
                      emissiveIntensity={1}
                    />
                  </Text3D>
                </mesh>

                {/* Indicateur d’action si cliquable */}
                {project.url && (
                  <mesh position={[0, -0.7, 0]}>
                    <Text3D
                      font="/fonts/Orbitron_Regular.json"
                      size={0.08}
                      height={0.01}
                      curveSegments={4}
                      bevelEnabled={false}
                    >
                      
                      <meshStandardMaterial
                        color={project.color}
                        emissive={project.color}
                        emissiveIntensity={0.8}
                      />
                    </Text3D>
                  </mesh>
                )}
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}
