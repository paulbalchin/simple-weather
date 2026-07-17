import { useContext } from "react";
import { Link } from "react-router-dom";

import { CitiesContext, SelectedCityIdContext } from "../contexts";
import { getCity } from "../utilities";
import { Unmask } from "../components/Unmask";
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
          <li>
            <Link to="/">{city && <Unmask label={`Forecast: ${city.name}`} />}</Link>
          </li>
          <li>
            <Link to="/search">
              <Unmask label="Search for cities" />
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <Unmask label="Settings" />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Unmask label="About" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
