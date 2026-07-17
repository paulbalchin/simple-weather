import { useEffect, useState } from "react";

type TypeProps = {
  label: string;
  slow?: boolean;
  onComplete?: () => void;
};

/**
 * Reveals the original text one letter at a time in a way that tries to emulate human typing.
 */
export function Type({ label, slow = false, onComplete = () => {} }: TypeProps) {
  const [count, setCount] = useState(label.length);
  const [typedLength, setTypedLength] = useState(0);
  const [result, setResult] = useState("");
  let characters = label;

  const decode = () => {
    let typed = "";

    for (let i = 0; i < label.length; i++) {
      typed += characters.charAt(characters.length);
    }

    setResult(label.slice(0, typedLength) + typed.slice(typedLength));
    setCount((x) => x - 1);

    // Add a random number of letters to better simulate typing.
    setTypedLength((x) => x + 1 + Math.round(Math.random() * 3));
  };

  useEffect(() => {
    const delay = 40 * Math.random() * 5 + (slow ? 200 : 0);

    const timeoutId = setTimeout(
      () => {
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
      },
      // Randomly change speed to better simulate typing.
      delay,
    );

    return () => clearTimeout(timeoutId);
  }, [count]);

  return result;
}
