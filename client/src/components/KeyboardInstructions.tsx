import { Html } from "@react-three/drei";

export default function KeyboardInstructions() {
  return (
    <Html
      position={[16, 4.6, -11]}
      transform
      occlude
      rotation={[-0.1, -0.001, 0]} 
      center
      zIndexRange={[10, 0]} 
    >
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          color: "#00ffff",
          background: "rgba(0, 0, 0, 0.25)",
          padding: "0.7rem 1.2rem",
          border: "1px solid #00ffff",
          borderRadius: "12px",
          fontSize: "0.9rem",
          lineHeight: "1.6",
          backdropFilter: "blur(4px)",
          boxShadow: "0 0 10px #00ffff88",
          whiteSpace: "pre-line",
        }}
      >
        <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Contrôles</div>
        <div>
          <kbd style={kbdStyle}>↑</kbd> / <kbd style={kbdStyle}>↓</kbd> : Naviguer
        </div>
        <div>
          <kbd style={kbdStyle}>Entrée</kbd> : Valider
        </div>
        <div>
          <kbd style={kbdStyle}>Échap</kbd> : Quitter
        </div>
      </div>
    </Html>
  );
}

const kbdStyle = {
  background: "#00ffff44",
  border: "1px solid #00ffff",
  borderRadius: "6px",
  padding: "2px 6px",
  margin: "0 4px",
  fontSize: "0.8rem",
};
