import { useEffect, useState } from "react";

export default function LoaderCharacter() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8;
        return next >= 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 ">
      {/* Icône animée ou cercle de chargement */}
      <div className="w-16 h-16 border-4 border-orange-400 border-dashed rounded-full animate-spin mb-6" />

      {/* Texte de chargement */}
      <div className="text-orange-400 text-3xl font-mono tracking-widest animate-pulse">
        Chargement... {Math.floor(progress)}%
      </div>
    </div>
  );
}
