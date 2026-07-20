import { useContext } from "react";
import { Link } from "react-router-dom";

import { CitiesContext, SelectedCityIdContext } from "../contexts";
import { getCity } from "../utilities";
import { PageHeader } from "../components";

export function Nav() {
  const { cities } = useContext(CitiesContext);
  const { selectedCityId } = useContext(SelectedCityIdContext);
  const city = getCity(cities, selectedCityId);

  return (
    <>
      <PageHeader title="About" goBack />

      <div id="navigation" className="size--sm">
        <ul>
          {city && (
            <li>
              <Link to="/">Forecast &gt; {city.name}</Link>
            </li>
          )}
          {!city && (
            <li>
              <span className="disabled">Forecast: (city not selected)</span>
            </li>
          )}
          <li>
            <Link to="/search">Search for cities</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
