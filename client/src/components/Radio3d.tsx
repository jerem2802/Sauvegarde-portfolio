import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import Player from "./Player";
import AnimatedFloatingText from "./AnimatedFloatingText";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { Sky } from "@react-three/drei";
import ScrollingBetaBanner from "./ScrollingBetaBanner";
import { OrbitControls } from "three-stdlib";
import LoaderCharacter from "./LoaderCharacter";

const RadioModel = () => {
  const { scene } = useGLTF("/city.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        console.log(
          `🧱 Mesh "${obj.name}" → position:`,
          obj.position,
          " world position:",
          obj.getWorldPosition(new THREE.Vector3())
        );
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.8} />;
};

const InteriorRoom = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color="#999" />
      </mesh>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-3 + i * 3, 2, -4.95]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
};

export default function Radio3D() {
  const [inInterior, setInInterior] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();
  const navigate = useNavigate();
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const orbitRefExterior = useRef<OrbitControls>(null);
  const orbitRefInterior = useRef<OrbitControls>(null);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!inInterior && orbitRefExterior.current) {
      orbitRefExterior.current.target.set(0, 1.5, -4);
      orbitRefExterior.current.update();
    }
    if (inInterior && orbitRefInterior.current) {
      orbitRefInterior.current.target.set(0, 1.5, -2);
      orbitRefInterior.current.update();
    }
  }, [inInterior]);

 const handleTransitionTo = (targetPath: string) => {
  if (!groupRef.current || !overlayRef.current) return;

  setIsLoading(true); // 👈 Affiche le LoaderCharacter
  overlayRef.current.style.transition = "opacity 1s ";
  overlayRef.current.style.opacity = "1";

  let t = 1;
  const interval = setInterval(() => {
    t -= 0.05;
    if (groupRef.current) {
      groupRef.current.scale.set(t, t, t);
    }
    if (t <= 0.01) {
      clearInterval(interval);
      setTimeout(() => {
        navigate(targetPath);
        setInInterior(true);
      }, 1000);
    }
  }, 16);
};


  return (
    <div className="relative w-full h-screen bg-black">
      {isLoading && <LoaderCharacter />}

      <Canvas camera={{ position: [0, 0.6, 2], fov: 100 }} className="bg-black">
        <color attach="background" args={["#1a1a1a"]} />
        <fog attach="fog" args={["#1a1a1a", 2, 15]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Sky
          sunPosition={[9000, -4, -9000]}
          turbidity={20}
          rayleigh={2}
          mieCoefficient={0.001}
          mieDirectionalG={0.8}
        />

        <Suspense fallback={null}>
          <group ref={groupRef}>
            {!inInterior && (
              <>
                <AnimatedFloatingText />
                <RadioModel />
                <ScrollingBetaBanner />
              </>
            )}

            <Player
  key={inInterior ? "inside" : "outside"}
  startPosition={inInterior ? [0, 0.1, 0] : [-0.2779, 0.1, 1.44]}
  onEnterBuilding={(building) => {
    if (building === "about") handleTransitionTo("/a-propos");
    else if (building === "projects") handleTransitionTo("/projets");
    else if (building === "contact") handleTransitionTo("/contact");
  }}
/>


            {inInterior ? (
              <>
                <InteriorRoom />
                <DreiOrbitControls ref={orbitRefInterior} />
              </>
            ) : (
              <DreiOrbitControls ref={orbitRefExterior} />
            )}
          </group>
        </Suspense>

        {/* Masque des portes */}
        <mesh position={[0.03, 0.2, 0.27]}>
          <planeGeometry args={[0.11, 0.26]} />
          <meshStandardMaterial color="black" />
          <mesh position={[-0.645, 0, -0.10]}>
            <planeGeometry args={[0.13, 0.21]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </mesh>
      </Canvas>

      <div
        ref={overlayRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full bg-black opacity-0 z-50"
      />
    </div>
  );
}
