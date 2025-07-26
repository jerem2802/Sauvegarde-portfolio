import { useEffect, useRef, useState } from "react";

type AmbientSoundProps = {
  url: string;
  initialVolume?: number;
};

export default function AmbientSound({ url, initialVolume = 0.01 }: AmbientSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);

  // ✅ Ne recrée pas l'audio à chaque changement de volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = muted ? 0 : volume;
    audioRef.current = audio;

    const playAudio = () => {
      audio
        .play()
        .catch((err) => console.warn("🔇 Lecture bloquée :", err));
    };

    window.addEventListener("click", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [url, muted]); // ✅ Retiré: `volume`

  // ✅ Gère volume indépendamment
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [muted, volume]);

  return (
    <div className="absolute top-3 right-8 z-50 flex flex-col items-end gap-1 text-white text-xs scale-110">
      <button
        onClick={() => setMuted((prev) => !prev)}
        className="bg-white/10 px-4 py-0.5 rounded text-[10px] hover:bg-white/20 transition flex items-center gap-1"
      >
        <span>{muted ? "🔇 OFF" : "🔊 ON"}</span>
      </button>
   <input
  type="range"
  min={0}
  max={0.4}
  step={0.01}
  value={muted ? 0 : volume}
  onChange={(e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMuted(v === 0);
  }}
  className="w-24 h-1"
  style={{
    WebkitAppearance: "none",
    appearance: "none",
    height: "4px",
    backgroundColor: "#FE6D59", // Couleur de la barre
    borderRadius: "10px",
    outline: "none",
  }}
/>
    </div>
  );
}
