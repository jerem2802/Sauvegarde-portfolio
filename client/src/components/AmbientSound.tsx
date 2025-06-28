import { useEffect, useRef, useState } from "react";

export default function AmbientSound({ initialVolume = 0.01 }: { initialVolume?: number }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = muted ? 0 : volume;
    audioRef.current = audio;

    const startAudio = () => {
      if (!hasStarted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setHasStarted(true);
          })
          .catch((err) => {
            console.warn("Lecture audio bloquée :", err);
          });
      }
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    // 🧼 ARRÊT PROPRE du son quand le composant est démonté (donc sortie de page)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []); // se déclenche une seule fois au montage/démontage

  // Mute et volume en temps réel
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [muted, volume]);

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2 text-white">
      <button
        onClick={() => setMuted((prev) => !prev)}
        className="bg-white/10 px-3 py-1 rounded text-sm hover:bg-white/20 transition"
      >
        {muted ? "🔇 OFF" : "🔊 ON"}
      </button>
      <input
        type="range"
        min={0}
        max={0.3}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          setVolume(v);
          setMuted(v === 0);
        }}
        className="w-24"
      />
    </div>
  );
}
