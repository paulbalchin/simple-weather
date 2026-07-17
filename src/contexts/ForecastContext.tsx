import { createContext, useState, type ReactNode } from "react";

// There are WAY too many data points to map out.
// Allow for any, for now anyways.
type Forecast = {
  [key: string]: any;
};

type Context = {
  forecast: Forecast | undefined;
  setForecast: (forecast: Forecast) => void;
};

const defaultState = {
  forecast: undefined,
  setForecast: () => {},
};

const ForecastContext = createContext<Context>(defaultState);

type ForecastProviderProps = {
  children: ReactNode;
};

function ForecastProvider({ children }: ForecastProviderProps) {
  const [forecast, setForecast] = useState<Forecast>();

  return (
    <ForecastContext
      value={{
        forecast,
        setForecast,
      }}
    >
      {children}
    </ForecastContext>
  );
}

export { type Forecast, ForecastContext, ForecastProvider };
