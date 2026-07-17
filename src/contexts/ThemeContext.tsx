import { type ReactNode, createContext, useEffect } from "react";
import { useLocalStorage } from "../utilities";

type Theme = "light" | "dark" | undefined;

type Context = {
  theme: Theme;
  altTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const defaultState = {
  theme: undefined,
  altTheme: undefined,
  setTheme: () => {},
};

const ThemeContext = createContext<Context>(defaultState);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const altTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    // 1. Remove all possible themes.
    document.body.classList.remove("light-theme", "dark-theme");
    // 2. Apply active theme.
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <ThemeContext
      value={{
        theme,
        altTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
};

export { type Theme, ThemeContext, ThemeProvider };
