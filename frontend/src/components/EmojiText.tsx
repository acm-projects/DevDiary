import React from 'react';
import emojiDictionary from 'emoji-dictionary';
// ✅ Fix TypeScript typing issue
import { Emoji } from 'react-apple-emojis';
import type { FC } from 'react';

// Explicitly type it as a functional component
// const _AppleEmoji = AppleEmoji as unknown as FC<{
//   name: string;
//   size?: number;
//   className?: string;
//   style?: React.CSSProperties;
// }>;
// Regex to detect emojis (covers all Extended_Pictographic codepoints)
const emojiRegex = /(\p{Extended_Pictographic})/u;

interface EmojiTextProps {
  text: String;
  size?: number;
}

export default function EmojiText({ text, size = 20 }: EmojiTextProps) {
  // Split into text + emoji segments
  const parts = text.split(emojiRegex).filter(Boolean);
          console.log(emojiDictionary); // e.g. "red apple"
  
  return (
    <span>
      {parts.map((part, i) => {
        if (emojiRegex.test(part)) {
          const name = emojiDictionary.getName(part);
          console.log("name",name);
          if (name) {
            return <Emoji key={i} name={getEmojiName(part)} size={size} />;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
