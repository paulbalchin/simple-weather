import { useEffect, useState } from "react";

const strings = {
  uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  lowercase: `abcdefghijklmnopqrstuvwxyz`,
  numbers: `0123456789`,
  special: `@#$%&?_-`,
};

type DecodeProps = {
  lowercase?: boolean;
  uppercase?: boolean;
  numbers?: boolean;
  special?: boolean;
  delay?: number;
  iterate?: number;
  label: string;
  onComplete?: () => void;
};

/**
 * Starts with random characters and reveals the original text one letter at a time.
 */
export function Decode({
  uppercase = false,
  lowercase = false,
  numbers = false,
  special = false,
  delay = 100,
  iterate = 2,
  label,
  onComplete = () => {},
}: DecodeProps) {
  const [count, setCount] = useState(label.length * iterate);
  const [decodedLength, setDecodedLength] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [result, setResult] = useState("");
  let characters = "";

  // If all string settings are false, then default to upper- and lower-case characters.
  if (!uppercase && !lowercase && !numbers && !special) {
    characters = strings.uppercase + strings.lowercase;
  } else {
    characters += lowercase ? strings.lowercase : "";
    characters += uppercase ? strings.uppercase : "";
    characters += numbers ? strings.numbers : "";
    characters += special ? strings.special : "";
  }

  const decode = () => {
    let scrambled = "";

    for (let i = 0; i < label.length; i++) {
      scrambled += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setResult(label.slice(0, decodedLength) + scrambled.slice(decodedLength));
    setIterations((x) => x + 1);
    setCount((x) => x - 1);

    if (iterations === iterate) {
      setDecodedLength((x) => x + 1);
      setIterations(0);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (count > 0) {
        decode();
      } else {
        clearTimeout(timeoutId);
        // setResult(label) solves an async state issue.
        // Whatever the `result` is at the time `count` is 0,
        // just stop everything and return the original label.
        setResult(label);
        onComplete();
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [count]);

  return result;
}
