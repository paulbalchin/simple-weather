import { createContext, type ReactNode } from "react";
import { useLocalStorage } from "../utilities";

type UnitTypes = {
  name: string;
  label: string;
  apiParam?: string;
  apiValue?: string;
};

type Units = {
  temperature: UnitTypes;
  windSpeed: UnitTypes;
  precipitation: UnitTypes;
  precipitation_snow: UnitTypes;
};

const MetricUnits: Units = {
  temperature: {
    name: "Celsius",
    label: "C",
    apiParam: "temperature_unit",
    apiValue: "celsius",
  },
  windSpeed: {
    name: "Kilometers per hour",
    label: "km/h",
    apiParam: "wind_speed_unit",
    apiValue: "kmh",
  },
  precipitation: {
    name: "Millimeters",
    label: "mm",
    apiParam: "precipitation_unit",
    apiValue: "mm",
  },
  // Non-standard values not supported by API, just for UI.
  precipitation_snow: {
    name: "Centimeters",
    label: "cm",
    // apiParam: "precipitation_unit",
    // apiValue: "mm",
  },
};

const ImperialUnits: Units = {
  temperature: {
    name: "Fahrenheit",
    label: "F",
    apiParam: "temperature_unit",
    apiValue: "fahrenheit",
  },
  windSpeed: {
    name: "Miles per hour",
    label: "mph",
    apiParam: "wind_speed_unit",
    apiValue: "mph",
  },
  precipitation: {
    name: "Inches",
    label: "inch",
    apiParam: "precipitation_unit",
    apiValue: "inch",
  },
  // Non-standard values not supported by API, just for UI.
  precipitation_snow: {
    name: "Centimeters",
    label: "cm",
    // apiParam: "precipitation_unit",
    // apiValue: "mm",
  },
};

type Context = {
  isMetric: boolean;
  setIsMetric: (isMetric: boolean) => void;
  units: Units;
  altUnits: Units;
};

const defaultState = {
  isMetric: true,
  setIsMetric: () => {},
  units: MetricUnits,
  altUnits: ImperialUnits,
};

const UnitsContext = createContext<Context>(defaultState);

type UnitsProviderProps = {
  children: ReactNode;
};

function UnitsProvider({ children }: UnitsProviderProps) {
  const [isMetric, setIsMetric] = useLocalStorage<boolean>("is_metric", true);

  const units: Units = isMetric ? { ...MetricUnits } : { ...ImperialUnits };
  const altUnits: Units = isMetric ? { ...ImperialUnits } : { ...MetricUnits };

  return (
    <UnitsContext
      value={{
        units,
        altUnits,
        isMetric,
        setIsMetric,
      }}
    >
      {children}
    </UnitsContext>
  );
}
export { type Units, type Context, type UnitTypes, UnitsContext, UnitsProvider };
