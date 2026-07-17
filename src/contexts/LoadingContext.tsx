import { type ReactNode, createContext, useState } from "react";

type Context = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const defaultState = {
  loading: false,
  setLoading: () => {},
};

const LoadingContext = createContext<Context>(defaultState);

type LoadingProviderProps = {
  children: ReactNode;
};

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext>
  );
};

export { LoadingContext, LoadingProvider };
