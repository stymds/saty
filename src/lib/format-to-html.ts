import { formatRegex } from "./format-regex";

const sizeStyles: Record<string, string> = {
  big: "font-size:18px;",
  small: "font-size:12px;",
};

const colorStyles: Record<string, string> = {
  red: "color:#f87171;",
  pink: "color:#f472b6;",
  yellow: "color:#facc15;",
  green: "color:#4ade80;",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTextToHtml(text: string): string {
  const parts: string[] = [];
  let lastIndex = 0;

  const regex = new RegExp(formatRegex.source, formatRegex.flags);
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(escapeHtml(text.slice(lastIndex, match.index)));
    }

    const g = match.groups!;

    if (g.bold) {
      parts.push(`<strong>${formatTextToHtml(g.bold)}</strong>`);
    } else if (g.italic) {
      parts.push(`<em>${formatTextToHtml(g.italic)}</em>`);
    } else if (g.strike) {
      parts.push(
        `<span style="text-decoration:line-through;">${formatTextToHtml(g.strike)}</span>`
      );
    } else if (g.code) {
      parts.push(
        `<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:14px;">${escapeHtml(g.code)}</code>`
      );
    } else if (g.underline) {
      parts.push(
        `<span style="text-decoration:underline;">${formatTextToHtml(g.underline)}</span>`
      );
    } else if (g.bracket && g.bracketText) {
      const style = sizeStyles[g.bracket] || colorStyles[g.bracket];
      if (style) {
        parts.push(
          `<span style="${style}">${formatTextToHtml(g.bracketText)}</span>`
        );
      }
    } else if (g.linkText && g.linkUrl) {
      if (/^https?:\/\//i.test(g.linkUrl)) {
        parts.push(
          `<a href="${escapeHtml(g.linkUrl)}" target="_blank" rel="noopener noreferrer" style="color:#22d3ee;text-decoration:underline;">${formatTextToHtml(g.linkText)}</a>`
        );
      } else {
        parts.push(escapeHtml(g.linkText));
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(escapeHtml(text.slice(lastIndex)));
  }

  return parts.join("");
}

export function formatMessageToHtml(message: string): string {
  const lines = message.split("\n");
  const blocks: string[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      `<ul style="margin:0;padding-left:20px;">${bulletBuffer.join("")}</ul>`
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    if (/^- .+/.test(line)) {
      bulletBuffer.push(
        `<li style="margin:2px 0;">${formatTextToHtml(line.slice(2))}</li>`
      );
    } else {
      flushBullets();
      if (line.trim() === "") {
        blocks.push(`<p style="margin:0;height:8px;">&nbsp;</p>`);
      } else {
        blocks.push(
          `<p style="margin:4px 0;">${formatTextToHtml(line)}</p>`
        );
      }
    }
  }
  flushBullets();

  return blocks.join("");
}
