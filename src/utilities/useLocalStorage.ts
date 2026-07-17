import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : initialValue;
    } catch (error) {
      console.error(`Failed to parse "${key}" localStorage data:`, error);
      return initialValue; // Fallback default value
    }
  });

  useEffect(() => {
    try {
      if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Failed to save "${key}" to localStorage:`, error);
    }
  }, [value]);

  return [value, setValue];
}
