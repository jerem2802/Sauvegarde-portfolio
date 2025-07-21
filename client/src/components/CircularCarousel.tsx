import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MdPhoneAndroid } from "react-icons/md";

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
      const scaleTarget = focusedCardIndex !== null ? 1.8 : 0.001;
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
      title: "Je suis Jérémy.",
      content:
        "Développeur web et web mobile full-stack. \nFraichement diplomé du titre RNCP, je cherche une entreprise pour poursuivre ma formation en alternance. \nCurieux, créatif et déterminé, j’aime transformer les idées en expériences interactives qui ont du sens. \nAprès une formation intense en développement web full-stack, je continue d’apprendre chaque jour avec passion. \nJ’aime les interfaces qui racontent quelque chose, les projets qui ont une âme, et les équipes qui partagent cette même envie de créer, ensemble.",
    },
    { title: "Crédits", content: "Modèles : PolyPizza, Musique : Pixabay..." },
    { title: "Contact :", content:  "📨 Mail:  jeremytichane.dev@gmail.com \n📞 Phone 07.68.18.67.49 \n🔗 Linkedin :  www.linkedin.com/in/jérémy-tichané  " },
    { title: "Photo", image: "/1000029319.jpg" },
    { title: "Softs Skills", content: "" },
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
              onClick={() => setFocusedCardIndex(i)}
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
        {focusedCardIndex !== null && (
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

function CardContent({
  card,
  photoTexture,
  photoRatio,
}: {
  card: { title: string; content?: string; image?: string };
  photoTexture: THREE.Texture | null;
  photoRatio: number;
}) {
  return card.image && photoTexture ? (
    <mesh>
      <planeGeometry args={[2, 2 * photoRatio]} />
      <meshBasicMaterial map={photoTexture} toneMapped={false} />
    </mesh>
  ) : (
    <>
      <mesh>
        <planeGeometry args={[2, 1.2]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.5}
          roughness={0.05}
          metalness={0.1}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          ior={1.5}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      <Text
        fontSize={0.05}
        color="black"
        maxWidth={1.8}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.01]}
        outlineBlur={0.03}
        outlineColor="gray"
        outlineWidth={0.01}
        
        

      >
        {card.title + "\n" + (card.content || "")}
      </Text>
    </>
  );
}
