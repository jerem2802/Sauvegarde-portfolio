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
    <div className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center z-[9999]">
      {/* Spinner */}
      <div className="w-12 h-12 border-[3px] border-orange-400 border-dashed rounded-full animate-spin mb-6" />
      {/* Texte de chargement */}
      <div className="text-orange-400 text-xl font-mono tracking-widest animate-pulse">
        Chargement... {Math.floor(progress)}%
      </div>
    </div>
  );
}
