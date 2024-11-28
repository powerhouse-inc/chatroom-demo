const emojis = [
  "😀",
  "😂",
  "🤣",
  "😍",
  "😎",
  "😊",
  "🙃",
  "😇",
  "🤔",
  "🥳",
  "🤯",
  "🤗",
  "😱",
  "👻",
  "🎃",
  "🐱",
  "🐶",
  "🐹",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐝",
  "🐞",
  "🐟",
  "🐬",
  "🐳",
  "🦋",
  "🌺",
  "🌸",
  "🌼",
  "🍀",
];

export function getEmojiFromString(input: string): string {
  // Generate a consistent hash from the input string
  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  const hash = hashString(input);
  return emojis[hash % emojis.length];
}
