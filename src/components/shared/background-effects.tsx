export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(120, 119, 198, 0.15), transparent)",
        }}
      />

      {/* Glowing arc */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 opacity-20"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(100, 150, 255, 0.1) 60deg, rgba(100, 150, 255, 0.2) 120deg, transparent 180deg, transparent 360deg)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
