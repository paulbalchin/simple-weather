import { type ReactNode, createContext } from "react";
import { useLocalStorage } from "../utilities";

type TimeStamp = string;

type Context = {
  timestamp: TimeStamp;
  setTimestamp: (timestamp: TimeStamp) => void;
};

const defaultState = {
  timestamp: "",
  setTimestamp: () => {},
};

const TimestampContext = createContext<Context>(defaultState);

type TimestampProviderProps = {
  children: ReactNode;
};

const TimestampProvider = ({ children }: TimestampProviderProps) => {
  const [timestamp, setTimestamp] = useLocalStorage<TimeStamp>("timestamp", "");

  return (
    <TimestampContext
      value={{
        timestamp,
        setTimestamp,
      }}
    >
      {children}
    </TimestampContext>
  );
};

export { type TimeStamp, TimestampContext, TimestampProvider };
