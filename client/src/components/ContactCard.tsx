import { Html, Text } from "@react-three/drei";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";



const contactItems = [
   {
    icon: <GrLocationPin size={9} color="#550B0B" />,
    text: "Bordeaux",
    href: "https://www.bordeaux-metropole.fr/",
    offsetX: -0.82, 
  },
  {
    icon: <FaEnvelope size={8} color="#00ffff" />,
    text: "jeremytichane.dev@gmail.com",
    href: "mailto:jeremytichane.dev@gmail.com",
  },
  {
    icon: <FaPhone size={8} color="#00ffff" />,
    text: "07 68 18 67 49",
    href: "tel:0768186749",
    offsetX: -0.63, 
  },
  {
    icon: <FaLinkedin size={8} color="#0a66c2" />,
    text: "linkedin",
    href: "https://linkedin.com/in/jérémy-tichané",
     offsetX: -0.88, 
  },
  {
    icon: <FaGithub size={8} color="#00ffff" />,
    text: "Mon GitHub",
    href: "https://github.com/jerem2802",
    offsetX: -0.72, 
  },
];

const spacing = 0.5; // ESPACEMENT VERTICAL ENTRE LES ÉLÉMENTS !

export default function ContactCard() {
  return (
    <group position={[0, 0.6, 0]}>
 
      <mesh>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#111" transparent opacity={0.85} />
      </mesh>

 
<Text
  position={[-2.06, 1.7, 0.05]}
  fontSize={0.4}
  color="#3460FF"
  outlineBlur={0.02} 
 
  anchorX="left"
  anchorY="middle"
  outlineColor="#00ffff"
  outlineWidth={0.01}
  lineHeight={4}
>
  Travaillons ensemble !
</Text>




     
      {contactItems.map((item, index) => {
        const y = 0.5 - index * spacing;
        const textOffsetX = 0.2 + (item.offsetX || 0);
        return (
          <group key={index} position={[0, y, 0.01]}>
           
            <Html position={[-1.5, 0, 0]} transform>
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.icon}
              </div>
            </Html>

           
            <Html position={[textOffsetX, 0.1, 0]} transform>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  fontSize: "0.4rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.text}
              </a>
            </Html>
          </group>
        );
      })}

      {/* BOUTON DE TELECHARGEMENT */}
      <group position={[0, -2.8, 0]} scale={0.5}>
        <Html center transform>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.3rem",
              background: "#00ffff",
              color: "black",
              padding: "0.3rem 0.8rem",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "0.7rem",
              boxShadow: "0 0 8px rgba(0,255,255,0.4)",
              animation: "pulse 2s infinite",
            }}
          >
            📄
           <a
  href="cv_jeremy_tichane.pdf"
  download="cv_jeremy_tichane.pdf"
  style={{ color: "black", textDecoration: "none" }}
>
  Télécharger mon CV
</a>

          </div>
        </Html>
      </group>
    </group>
  );
}
