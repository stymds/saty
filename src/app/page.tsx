import { Typewriter } from "@/components/typewriter";
import { FloatingBubbles } from "@/components/floating-bubbles";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Grid background */}
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

      {/* Floating bubbles */}
      <FloatingBubbles />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <Typewriter />

          <a
            href="mailto:satyamdas020399@gmail.com"
            className="mt-12 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800/50 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            say hi
          </a>
        </div>
      </div>
    </main>
  );
}
