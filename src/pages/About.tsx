import { Link } from "react-router-dom";
import { PageHeader, Unmask } from "../components/";

export function About() {
  return (
    <>
      <PageHeader title="About" />

      <div id="search">
        <ul>
          <li>
            <b>{import.meta.env.VITE_APP_NAME}</b>{" "}
            <mark className="app-version">
              <Unmask label={`v${import.meta.env.VITE_APP_VERSION}`} />
            </mark>
          </li>
          <li>
            API:{" "}
            <Link to="https://open-meteo.com/" target="_blank">
              <Unmask label="open-meteo.com" />
            </Link>
          </li>
          <li>
            CODE:{" "}
            <Link to="https://github.com/paulbalchin/simple-weather/" target="_blank">
              <Unmask label="github.com" />
            </Link>
          </li>
          <li>
            FONT:{" "}
            <Link to="https://departuremono.com/" target="_blank">
              <Unmask label="Departure Mono" />
            </Link>
          </li>
          <li>
            <Unmask label="© Paul Balchin" />
          </li>
        </ul>
      </div>
    </>
  );
}
