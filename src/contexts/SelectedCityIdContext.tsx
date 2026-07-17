import { type ReactNode, createContext } from "react";
import { useLocalStorage } from "../utilities";

type SelectedCityId = number | undefined;

type Context = {
  selectedCityId: SelectedCityId;
  setSelectedCityId: (selectedCityId: SelectedCityId) => void;
};

const defaultState = {
  selectedCityId: undefined,
  setSelectedCityId: () => {},
};

const SelectedCityIdContext = createContext<Context>(defaultState);

type SelectedCityIdProviderProps = {
  children: ReactNode;
};

function SelectedCityIdProvider({ children }: SelectedCityIdProviderProps) {
  const [selectedCityId, setSelectedCityId] = useLocalStorage<SelectedCityId>(
    "selected_city_id",
    undefined,
  );

  return (
    <SelectedCityIdContext
      value={{
        selectedCityId,
        setSelectedCityId,
      }}
    >
      {children}
    </SelectedCityIdContext>
  );
}

export { type SelectedCityId, SelectedCityIdContext, SelectedCityIdProvider };
