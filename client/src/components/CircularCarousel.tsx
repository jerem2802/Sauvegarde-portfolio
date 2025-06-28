import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";

export default function CircularInfoCarousel() {
  const radius = 4;
  const { camera } = useThree();
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);
  const [photoRatio, setPhotoRatio] = useState(1);
  const carouselRef = useRef<THREE.Group>(null);

  // 🟢 Place la caméra au centre et oriente-la vers l'avant
 useEffect(() => {
  camera.position.set(0, 1.5, 0);
  const forward = new THREE.Vector3(0, 1.5, -radius);
  camera.lookAt(forward);
}, [camera]);


  // 📸 Charge la photo avec ratio réel
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

  // 🌀 Rotation lente du carousel
  useFrame(() => {
    if (carouselRef.current) {
      carouselRef.current.rotation.y += 0.002; // rotation douce
    }
  });

  const cards = [
    { title: "À propos de moi", content: "Je suis Jérémy Tichané, créatif 3D..." },
    { title: "Crédits", content: "Modèles : PolyPizza, Musique : Pixabay..." },
    { title: "Contact", content: "jeremy@example.com" },
    { title: "Photo", image: "/1000029319.jpg" },
  ];

  return (
    <group ref={carouselRef}>
      {cards.map((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const cardPosition = new THREE.Vector3(x, 1.5, z);
        const target = new THREE.Vector3(0, 1.5, 0);
        const lookDir = new THREE.Vector3().subVectors(target, cardPosition);
        const angleY = Math.atan2(lookDir.x, lookDir.z);

        return (
          <group
            key={i}
            position={[x, 1.5, z]}
            rotation={[0, angleY, 0]}
            // ❌ plus de zoom au clic
          >
            {card.image && photoTexture ? (
              <mesh>
                <planeGeometry args={[2, 2 * photoRatio]} />
                <meshBasicMaterial map={photoTexture} toneMapped={false} />
              </mesh>
            ) : (
              <>
                <mesh>
                  <planeGeometry args={[2, 1.2]} />
                  <meshPhysicalMaterial
                    color="white"
                    transparent
                    opacity={0.3}
                    transmission={0.9}
                    roughness={0.2}
                    thickness={0.1}
                  />
                </mesh>
                <Text
                  fontSize={0.1}
                  color="white"
                  maxWidth={1.8}
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.01]}
                >
                  {card.title + "\n" + (card.content || "")}
                </Text>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}
