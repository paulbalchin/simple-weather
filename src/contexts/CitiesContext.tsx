import { type ReactNode, createContext } from "react";
import { useLocalStorage, type City } from "../utilities";

type Cities = City[];

type Context = {
  cities: Cities;
  setCities: (cites: Cities) => void;
};

const defaultState = {
  cities: [],
  setCities: () => {},
};

const CitiesContext = createContext<Context>(defaultState);

type CitiesProviderProps = {
  children: ReactNode;
};

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [cities, setCities] = useLocalStorage<Cities>("cities", []);

  return (
    <CitiesContext
      value={{
        cities,
        setCities,
      }}
    >
      {children}
    </CitiesContext>
  );
};

export { type Cities, type City, CitiesContext, CitiesProvider };
