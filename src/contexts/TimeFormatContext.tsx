import { createContext, type ReactNode } from "react";
import { useLocalStorage } from "../utilities";

type Context = {
  is12hFormat: boolean;
  setIs12hFormat: (is12hFormat: boolean) => void;
};

const defaultState = {
  is12hFormat: true,
  setIs12hFormat: () => {},
};

const TimeFormatContext = createContext<Context>(defaultState);

type TimeFormatProviderProps = {
  children: ReactNode;
};

function TimeFormatProvider({ children }: TimeFormatProviderProps) {
  const [is12hFormat, setIs12hFormat] = useLocalStorage<boolean>("is_12h_format", true);

  return (
    <TimeFormatContext
      value={{
        is12hFormat,
        setIs12hFormat,
      }}
    >
      {children}
    </TimeFormatContext>
  );
}
export { TimeFormatContext, TimeFormatProvider };
