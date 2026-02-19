"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string;
}

const colors = [
  { bg: "rgba(134, 239, 172, 0.15)", glow: "rgba(134, 239, 172, 0.3)" },
  { bg: "rgba(147, 197, 253, 0.15)", glow: "rgba(147, 197, 253, 0.3)" },
  { bg: "rgba(196, 181, 253, 0.15)", glow: "rgba(196, 181, 253, 0.3)" },
  { bg: "rgba(165, 243, 252, 0.15)", glow: "rgba(165, 243, 252, 0.3)" },
  { bg: "rgba(253, 186, 116, 0.12)", glow: "rgba(253, 186, 116, 0.25)" },
];

function generateInitialBubbles(count: number, width: number, height: number): Bubble[] {
  const bubbles: Bubble[] = [];
  const minDistance = 150;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let validPosition = false;
    let x = 0, y = 0;
    const size = Math.random() * 60 + 50; // 50-110px

    while (!validPosition && attempts < 50) {
      x = Math.random() * (width - size - 100) + 50;
      y = Math.random() * (height - size - 100) + 50;

      validPosition = true;
      for (const bubble of bubbles) {
        const dx = x - bubble.x;
        const dy = y - bubble.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance + (size + bubble.size) / 2) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }

    const colorSet = colors[Math.floor(Math.random() * colors.length)];
    const speed = 0.3 + Math.random() * 0.4; // slow speed
    const angle = Math.random() * Math.PI * 2;

    bubbles.push({
      id: i,
      size,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colorSet.bg,
      glowColor: colorSet.glow,
    });
  }

  return bubbles;
}

function checkBubbleCollision(b1: Bubble, b2: Bubble): boolean {
  const dx = b2.x - b1.x;
  const dy = b2.y - b1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = (b1.size + b2.size) / 2;
  return dist < minDist;
}

function resolveBubbleCollision(b1: Bubble, b2: Bubble): void {
  const dx = b2.x - b1.x;
  const dy = b2.y - b1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) return;

  const nx = dx / dist;
  const ny = dy / dist;

  const minDist = (b1.size + b2.size) / 2;
  const overlap = minDist - dist;

  // Separate bubbles
  b1.x -= nx * overlap / 2;
  b1.y -= ny * overlap / 2;
  b2.x += nx * overlap / 2;
  b2.y += ny * overlap / 2;

  // Calculate relative velocity
  const dvx = b1.vx - b2.vx;
  const dvy = b1.vy - b2.vy;
  const dvDotN = dvx * nx + dvy * ny;

  // Only resolve if bubbles are moving towards each other
  if (dvDotN > 0) {
    // Mass proportional to size
    const m1 = b1.size;
    const m2 = b2.size;
    const totalMass = m1 + m2;

    // Update velocities (elastic collision)
    b1.vx -= (2 * m2 / totalMass) * dvDotN * nx;
    b1.vy -= (2 * m2 / totalMass) * dvDotN * ny;
    b2.vx += (2 * m1 / totalMass) * dvDotN * nx;
    b2.vy += (2 * m1 / totalMass) * dvDotN * ny;
  }
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scrollRef.current = window.scrollY;

    // More bubbles on larger screens
    const bubbleCount = width >= 768 ? 9 : 6;

    const initialBubbles = generateInitialBubbles(bubbleCount, width, height);
    bubblesRef.current = initialBubbles;
    setBubbles([...initialBubbles]);

    const animate = () => {
      const currentBubbles = bubblesRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Scroll reactivity
      const scrollDelta = window.scrollY - scrollRef.current;
      scrollRef.current = window.scrollY;

      // Update positions
      for (const bubble of currentBubbles) {
        // Apply scroll impulse
        bubble.vy += scrollDelta * 0.08;

        // Clamp velocities
        bubble.vx = Math.max(-2.5, Math.min(2.5, bubble.vx));
        bubble.vy = Math.max(-2.5, Math.min(2.5, bubble.vy));

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Wall collisions
        const radius = bubble.size / 2;

        if (bubble.x - radius < 0) {
          bubble.x = radius;
          bubble.vx = Math.abs(bubble.vx);
        } else if (bubble.x + radius > w) {
          bubble.x = w - radius;
          bubble.vx = -Math.abs(bubble.vx);
        }

        if (bubble.y - radius < 0) {
          bubble.y = radius;
          bubble.vy = Math.abs(bubble.vy);
        } else if (bubble.y + radius > h) {
          bubble.y = h - radius;
          bubble.vy = -Math.abs(bubble.vy);
        }
      }

      // Bubble-to-bubble collisions
      for (let i = 0; i < currentBubbles.length; i++) {
        for (let j = i + 1; j < currentBubbles.length; j++) {
          if (checkBubbleCollision(currentBubbles[i], currentBubbles[j])) {
            resolveBubbleCollision(currentBubbles[i], currentBubbles[j]);
          }
        }
      }

      setBubbles([...currentBubbles]);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full transition-shadow duration-300"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color}, transparent 70%)`,
            boxShadow: `0 0 ${bubble.size / 2}px ${bubble.glowColor}`,
          }}
        />
      ))}
    </div>
  );
}
