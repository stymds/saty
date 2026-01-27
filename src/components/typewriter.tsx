"use client";

import { useState, useEffect } from "react";

const lines = [
  { text: "hi, ", highlight: "Saty", suffix: " here...", size: "text-xl sm:text-2xl md:text-3xl" },
  { text: "i will be right back...", highlight: "", suffix: "", size: "text-lg sm:text-xl md:text-2xl" },
];

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
          ? "font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          : ""
      }`}
      style={hoverColor && !isHighlight ? { color: hoverColor } : undefined}
    >
      {char}
    </span>
  );
}

export function Typewriter() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const currentLineData = lines[currentLineIndex];
    const fullText = currentLineData.text + currentLineData.highlight + currentLineData.suffix;

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
    } else if (currentLineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentCharIndex, currentLineIndex, isComplete]);

  const renderLine = (lineText: string, lineIndex: number) => {
    const lineData = lines[lineIndex];
    const prefixLength = lineData.text.length;
    const highlightLength = lineData.highlight.length;

    return lineText.split("").map((char, charIndex) => {
      const isHighlight =
        charIndex >= prefixLength && charIndex < prefixLength + highlightLength;
      return <HoverLetter key={charIndex} char={char} isHighlight={isHighlight} />;
    });
  };

  return (
    <div className="font-mono text-zinc-200 leading-relaxed">
      {displayedLines.map((line, index) => (
        <div key={index} className={`min-h-[1.5em] ${lines[index]?.size || ""}`}>
          {renderLine(line, index)}
          {index === displayedLines.length - 1 && (
            <span className="animate-blink">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
