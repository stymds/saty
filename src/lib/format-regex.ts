export const formatRegex = new RegExp(
  [
    String.raw`\*(?<bold>.+?)\*`,
    String.raw`_(?<italic>.+?)_`,
    String.raw`~(?<strike>.+?)~`,
    // eslint-disable-next-line no-useless-backreference
    String.raw`\x60(?<code>.+?)\x60`,
    String.raw`(?<!\w)\+(?<underline>.+?)\+(?!\w)`,
    String.raw`\{(?<bracket>big|small|red|pink|yellow|green):(?<bracketText>(?:[^{}]|\{[^{}]*\})+)\}`,
    String.raw`\[(?<linkText>[^\]]+)\]\((?<linkUrl>https?:\/\/[^\s)]+)\)`,
  ].join("|"),
  "g"
);
