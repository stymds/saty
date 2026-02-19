"use client";

import { useState, useEffect } from "react";

const staticLines = [
  { text: "hi, ", highlight: "Saty", suffix: " here...", size: "text-2xl sm:text-3xl md:text-4xl" },
  { text: "What are you building? ", highlight: "", suffix: "", size: "text-base sm:text-lg md:text-xl" },
];

const morphWords = ["SaaS MVPs?", "Landing Pages?", "Ecommerce Stores?", "AI-Powered Apps?"];

const lightColors = [
  "#f87171", // red-400
  "#fb923c", // orange-400
  "#fbbf24", // amber-400
  "#a3e635", // lime-400
  "#4ade80", // green-400
  "#2dd4bf", // teal-400
  "#22d3ee", // cyan-400
  "#38bdf8", // sky-400
  "#60a5fa", // blue-400
  "#a78bfa", // violet-400
  "#e879f9", // fuchsia-400
  "#f472b6", // pink-400
];

function getRandomColor() {
  return lightColors[Math.floor(Math.random() * lightColors.length)];
}

function HoverLetter({ char, isHighlight }: { char: string; isHighlight: boolean }) {
  const [hoverColor, setHoverColor] = useState<string | null>(null);

  if (char === " ") return <span>&nbsp;</span>;

  const handleMouseEnter = () => {
    if (!isHighlight) {
      setHoverColor(getRandomColor());
    }
  };

  const handleMouseLeave = () => {
    setHoverColor(null);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-all duration-150 hover:scale-125 cursor-default ${
        isHighlight
          ? "font-bold text-accent-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          : ""
      }`}
      style={hoverColor && !isHighlight ? { color: hoverColor } : undefined}
    >
      {char}
    </span>
  );
}

type Phase = "typing-static" | "typing-tagline" | "typing-morph" | "pausing" | "deleting-morph" | "pause-before-next";

const tagline = "India-based freelance developer turning ideas into fast, polished, user-friendly products.";

export function Typewriter() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing-static");
  const [morphIndex, setMorphIndex] = useState(0);
  const [morphText, setMorphText] = useState("");
  const [taglineText, setTaglineText] = useState("");

  // Phase: typing-static
  useEffect(() => {
    if (phase !== "typing-static") return;

    const lineData = staticLines[currentLineIndex];
    const fullText = lineData.text + lineData.highlight + lineData.suffix;

    if (currentCharIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = fullText.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < staticLines.length - 1) {
      if (currentLineIndex === 0) {
        // After greeting, type the tagline first
        const timeout = setTimeout(() => {
          setPhase("typing-tagline");
        }, 500);
        return () => clearTimeout(timeout);
      }
      // Move to next static line
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      // All static lines done, transition to morph phase
      const timeout = setTimeout(() => {
        setPhase("typing-morph");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentCharIndex, currentLineIndex]);

  // Phase: typing-tagline
  useEffect(() => {
    if (phase !== "typing-tagline") return;

    if (taglineText.length < tagline.length) {
      const timeout = setTimeout(() => {
        setTaglineText(tagline.slice(0, taglineText.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      // Tagline done, move to line 1
      const timeout = setTimeout(() => {
        setCurrentLineIndex(1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
        setPhase("typing-static");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase, taglineText]);

  // Phase: typing-morph
  useEffect(() => {
    if (phase !== "typing-morph") return;

    const word = morphWords[morphIndex];
    if (morphText.length < word.length) {
      const timeout = setTimeout(() => {
        setMorphText(word.slice(0, morphText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setPhase("pausing"), 0);
      return () => clearTimeout(timeout);
    }
  }, [phase, morphText, morphIndex]);

  // Phase: pausing
  useEffect(() => {
    if (phase !== "pausing") return;

    const timeout = setTimeout(() => {
      setPhase("deleting-morph");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Phase: deleting-morph
  useEffect(() => {
    if (phase !== "deleting-morph") return;

    if (morphText.length > 0) {
      const timeout = setTimeout(() => {
        setMorphText((prev) => prev.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setPhase("pause-before-next"), 0);
      return () => clearTimeout(timeout);
    }
  }, [phase, morphText]);

  // Phase: pause-before-next
  useEffect(() => {
    if (phase !== "pause-before-next") return;

    const timeout = setTimeout(() => {
      setMorphIndex((prev) => (prev + 1) % morphWords.length);
      setPhase("typing-morph");
    }, 300);
    return () => clearTimeout(timeout);
  }, [phase]);

  const renderStaticLine = (lineText: string, lineIndex: number) => {
    const lineData = staticLines[lineIndex];
    const prefixLength = lineData.text.length;
    const highlightLength = lineData.highlight.length;

    return lineText.split("").map((char, charIndex) => {
      const isHighlight =
        charIndex >= prefixLength && charIndex < prefixLength + highlightLength;
      return <HoverLetter key={charIndex} char={char} isHighlight={isHighlight} />;
    });
  };

  const showCursorOnStatic = phase === "typing-static";
  const showCursorOnTagline = phase === "typing-tagline";
  const showCursorOnMorph = phase !== "typing-static" && phase !== "typing-tagline";

  return (
    <div className="font-mono text-sub leading-relaxed">
      {/* Line 1: greeting */}
      <div className={`min-h-[1.5em] ${staticLines[0].size}`}>
        {renderStaticLine(displayedLines[0] || "", 0)}
        {showCursorOnStatic && currentLineIndex === 0 && (
          <span className="animate-blink">|</span>
        )}
      </div>

      {/* Tagline: typewritten at 2x speed */}
      <p className="font-sans text-sm sm:text-base text-dim relative">
        {/* Invisible full text to reserve height */}
        <span className="invisible" aria-hidden="true">{tagline}</span>
        {/* Visible typed text overlaid on top */}
        <span className="absolute inset-0">
          {taglineText}
          {showCursorOnTagline && <span className="font-mono animate-blink">|</span>}
        </span>
      </p>

      {/* Line 2: always rendered to reserve space */}
      <div className={`min-h-[1.5em] ${staticLines[1].size} ${displayedLines.length <= 1 ? "invisible" : ""}`}>
        {renderStaticLine(displayedLines[1] || "", 1)}
        {phase !== "typing-static" && (
          <>
            <span className="font-bold text-accent-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {morphText.split("").map((char, i) =>
                char === " " ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <span key={i} className="inline-block">
                    {char}
                  </span>
                )
              )}
            </span>
            {showCursorOnMorph && <span className="animate-blink">|</span>}
          </>
        )}
        {showCursorOnStatic && currentLineIndex === 1 && (
          <span className="animate-blink">|</span>
        )}
      </div>
    </div>
  );
}
