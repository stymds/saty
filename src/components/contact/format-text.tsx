import React from "react";
import { formatRegex } from "@/lib/format-regex";

const sizeMap: Record<string, string> = { big: "text-lg", small: "text-xs" };
const colorMap: Record<string, string> = {
  red: "text-red-400",
  pink: "text-pink-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
};

function formatText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  const regex = new RegExp(formatRegex.source, formatRegex.flags);
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const g = match.groups!;
    const k = match.index;
    if (g.bold) parts.push(<strong key={k}>{formatText(g.bold)}</strong>);
    else if (g.italic) parts.push(<em key={k}>{formatText(g.italic)}</em>);
    else if (g.strike) parts.push(<s key={k}>{formatText(g.strike)}</s>);
    else if (g.code)
      parts.push(
        <code key={k} className="bg-sub/10 px-1 rounded text-sub text-sm">
          {g.code}
        </code>
      );
    else if (g.underline) parts.push(<u key={k}>{formatText(g.underline)}</u>);
    else if (g.bracket && g.bracketText) {
      const cls = sizeMap[g.bracket] || colorMap[g.bracket];
      if (cls) parts.push(<span key={k} className={cls}>{formatText(g.bracketText)}</span>);
    } else if (g.linkText && g.linkUrl)
      parts.push(
        <a
          key={k}
          href={g.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline decoration-cyan-400/50 hover:decoration-cyan-400"
        >
          {formatText(g.linkText)}
        </a>
      );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : [text];
}

export function formatMessage(message: string): React.ReactNode | null {
  if (!message) return null;

  const lines = message.split("\n");
  const blocks: React.ReactNode[] = [];
  let bulletBuffer: React.ReactNode[] = [];
  let blockKey = 0;

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={blockKey++} className="list-disc list-inside space-y-0.5">
        {bulletBuffer}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((line, i) => {
    if (/^- .+/.test(line)) {
      bulletBuffer.push(
        <li key={i}>{formatText(line.slice(2))}</li>
      );
    } else {
      flushBullets();
      if (line.trim() === "") {
        blocks.push(<p key={blockKey++} className="h-2" />);
      } else {
        blocks.push(<p key={blockKey++}>{formatText(line)}</p>);
      }
    }
  });
  flushBullets();

  return <div className="space-y-1">{blocks}</div>;
}
