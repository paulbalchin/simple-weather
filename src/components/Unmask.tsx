import { useEffect, useState } from "react";

import "./Unmask.scss";

type UnmaskProps = {
  label: string;
  mask?: string;
  onComplete?: () => void;
};

// ░ ▒ ▓ █;

/**
 * Starts with a redacted block and reveals the original text one letter at a time.
 */
export function Unmask({ label, mask = "█", onComplete = () => {} }: UnmaskProps) {
  const [count, setCount] = useState(label.length);
  const [unmaskedLength, setUnmaskedLength] = useState(0);
  const [result, setResult] = useState("");

  // Create a mask the same length as the label.
  let maskedCharacters = "";
  for (let i = 0; i < label.length; i++) {
    maskedCharacters += mask;
  }
  const unmask = () => {
    let unmasked = "";

    for (let i = 0; i < label.length; i++) {
      unmasked += maskedCharacters.charAt(maskedCharacters.length);
    }

    setResult(label.slice(0, unmaskedLength));
    setCount((x) => x - 1);

    // Add a random number of letters to better simulate typing.
    setUnmaskedLength((x) => x + 1 + Math.round(Math.random() * 3));
  };

  useEffect(() => {
    // Consistent speed.
    // const delay = 40 * Math.random() * 5 + (slow ? 100 : 0);
    // Inverse to the length of the label: the longer the label, the shorter the delay.
    const delay = 1500 / label.length;

    const timeoutId = setTimeout(() => {
      if (count > 0) {
        unmask();
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

  return (
    <>
      {result}
      {count > 0 && <span className="mask">{maskedCharacters.slice(unmaskedLength)}</span>}
    </>
  );
}
