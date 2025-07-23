import { Text, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, ReactNode } from "react";
import * as THREE from "three";
import NeonGlow from "./NeonGlow";


// Icônes
import { TiHtml5 } from "react-icons/ti";
import { FaCss3Alt, FaJs, FaReact, FaNodeJs, FaFigma, FaGithub } from "react-icons/fa";
import { SiGit, SiMysql, SiThreedotjs, SiTypescript } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";


// Tableau des compétences avec icônes
const skills: { name: string; icon: ReactNode }[] = [
  { name: "HTML", icon: <TiHtml5 size={4} color="#FF5722" /> },
  { name: "CSS", icon: <FaCss3Alt size={4} color="#2196F3" /> },
  { name: "Tailwind CSS", icon: <RiTailwindCssLine  size={4} color="#38B2AC" /> },
  { name: "JavaScript", icon: <FaJs size={4} color="#F7DF1E" /> },
  { name: "TypeScript", icon: <SiTypescript size={4} color="#3178C6" /> },
  { name: "React", icon: <FaReact size={4} color="#61DBFB" /> },
  { name: "Node.js", icon: <FaNodeJs size={4} color="#3C873A" /> },
  { name: "Figma", icon: <FaFigma size={4} color="#F24E1E" /> },
  { name: "MySQL", icon: <SiMysql size={4} color="#4479A1" /> },
  { name: "Git", icon: <SiGit size={4} color="#F05032" /> },
  { name: "GitHub", icon: <FaGithub size={4} color="#ffffff" /> },
  { name: "Three.js", icon: <SiThreedotjs size={4} color="#ffffff" /> },
   
];

export default function CircularInfoCarousel() {
  const radius = 10;
  const { camera, scene } = useThree();
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);
  const [photoRatio, setPhotoRatio] = useState(1);
  const carouselRef = useRef<THREE.Group>(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const zoomGroupRef = useRef<THREE.Group>(new THREE.Group());

  useEffect(() => {
    camera.position.set(0, 1.5, 0);
    camera.lookAt(new THREE.Vector3(0, 1.5, -radius));
  }, [camera]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/1000029319.jpg", (texture) => {
      setPhotoTexture(texture);
      const img = texture.image;
      if (img && img.width && img.height) {
        setPhotoRatio(img.height / img.width);
      }
    });
  }, []);


  useEffect(() => {
    const zoomGroup = zoomGroupRef.current;
    camera.add(zoomGroup);
    scene.add(camera);
    return () => {
      camera.remove(zoomGroup);
    };
  }, [camera, scene]);

  useFrame(() => {
    if (carouselRef.current && focusedCardIndex === null) {
      carouselRef.current.rotation.y += 0.0006;
    }

    if (zoomGroupRef.current) {
      const scaleTarget = focusedCardIndex !== null ? 1.2 : 0.001;
      const positionTarget =
        focusedCardIndex !== null
          ? new THREE.Vector3(0, 0, -1.5)
          : new THREE.Vector3(0, 0, 0);

      zoomGroupRef.current.scale.lerp(
        new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget),
        0.03
      );
      zoomGroupRef.current.position.lerp(positionTarget, 0.03);
    }
  });

  const cards = [
    {
      title: "Qui suis-je ?",
      content:
        "Développeur web et web mobile full-stack. \nFraichement diplomé du titre RNCP, je cherche une entreprise pour poursuivre ma formation en alternance. \nCurieux, créatif et déterminé, j’aime transformer les idées en expériences interactives qui ont du sens. \nAprès une formation intense en développement web full-stack, je continue d’apprendre chaque jour avec passion. \nJ’aime les interfaces qui racontent quelque chose, les projets qui ont une âme, et les équipes qui partagent cette même envie de créer, ensemble.",
    },
    { title: "Crédits", content: "Modèles : PolyPizza, Musique : Pixabay..." },
    {
      title: "Contact",
      content:
        "Mail:  jeremytichane.dev@gmail.com \nPhone: 07.68.18.67.49 \nLinkedin: www.linkedin.com/in/jérémy-tichané \nGitHub: jerem2802",
    },
    { title: "Photo", image: "/1000029319.jpg", isStatic: true },
    { title: "Skills", content: "skills" }, // Carte spéciale Skills
  ];

  return (
    <>
      <group ref={carouselRef}>
        {cards.map((card, i) => {
          if (i === focusedCardIndex) return null;

          const angle = (i / cards.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          const position: [number, number, number] = [x, 1.5, z];
          const target = new THREE.Vector3(0, 1.5, 0);
          const cardPos = new THREE.Vector3(...position);
          const angleY = Math.atan2(target.x - cardPos.x, target.z - cardPos.z);

          return (
            <group
              key={i}
              position={position}
              rotation={[0, angleY, 0]}
              onClick={() => {
                if (!card.isStatic) setFocusedCardIndex(i);
              }}
            >
              <CardContent
                card={card}
                photoTexture={photoTexture}
                photoRatio={photoRatio}
              />
            </group>
          );
        })}
      </group>

      <group
        ref={zoomGroupRef}
        position={[0, 0, -1.5]}
        onClick={() => setFocusedCardIndex(null)}
      >
        {focusedCardIndex !== null && !cards[focusedCardIndex].isStatic && (
          <CardContent
            card={cards[focusedCardIndex]}
            photoTexture={photoTexture}
            photoRatio={photoRatio}
          />
        )}
      </group>
    </>
  );
}

// ---------------- CardContent ----------------
function CardContent({
  card,
  photoTexture,
  photoRatio,
}: {
  card: { title: string; content?: string; image?: string };
  photoTexture?: THREE.Texture | null;
  photoRatio?: number;
}) {
  const isSkillsCard = card.title === "Skills";
  const width = isSkillsCard ? 3.2 : 2.2;
  const height = isSkillsCard ? 2.0 : 1.3;

  // Gestion automatique de l'espacement vertical
  const spacing = 0.25; 
 

  if (card.image && photoTexture) {
    return (
      <mesh>
        <planeGeometry args={[2, 2 * (photoRatio || 1)]} />
        <meshBasicMaterial map={photoTexture} toneMapped={false} />
      </mesh>
    );
  }

  return (
    <group>
      <NeonGlow width={width + 0.5} height={height + 0.4} color="#00ffff" />

      {/* Carte principale */}
      <mesh>
        <boxGeometry args={[width, height, 0.08]} />
        <meshPhysicalMaterial
          color="#1c2a34"
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* Contour lumineux */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, 0.08)]} />
        <lineBasicMaterial color="#00ffff" linewidth={2} />
      </lineSegments>

      {/* Titre */}
      <Text
        fontSize={0.4}
        color="#00ffff"
        position={[0, height / 2 + 0.40, 0.06]}
        anchorX="center"
        anchorY="bottom"
      >
        {card.title}
      </Text>

      {/* Contenu */}
      {isSkillsCard ? (
        <group position={[-1, 0.5, 0.06]}>
          {Array.from({ length: 3 }).map((_, colIndex) => {
            const columnSkills = skills.slice(colIndex * 5, colIndex * 5 + 5);
            return (
              <group key={colIndex} position={[colIndex * 1, 0, 0]}>
                {columnSkills.map((skill, i) => (
                  <group key={i} position={[0, -i * spacing, 0]}>
                    {/* Icône */}
                    <Html position={[-0.20, 0, 0]} transform>
                      {skill.icon}
                    </Html>

                    {/* Texte */}
                    <Text
                      fontSize={0.06}
                      color="#ffffff"
                      anchorX="left"
                      position={[0.02, 0, 0]}
                    >
                      {skill.name}
                    </Text>
                  </group>
                ))}
              </group>
            );
          })}
        </group>
      ) : (
        <Text
          fontSize={0.05}
          color="#ffffff"
          maxWidth={width - 0.4}
          lineHeight={1.3}
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.06]}
        >
          {card.content || ""}
        </Text>
      )}
    </group>
  );
}
