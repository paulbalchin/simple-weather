import { useContext } from "react";
import { Unmask } from "../../components/Unmask";
import {
  getCity,
  getHumidity,
  getTemperature,
  getTime,
  getWindValues,
  weatherDescription,
} from "../../utilities";
import {
  CitiesContext,
  ForecastContext,
  SelectedCityIdContext,
  TimestampContext,
  UnitsContext,
} from "../../contexts";

export function Now() {
  const { cities } = useContext(CitiesContext);
  const { forecast } = useContext(ForecastContext);
  const { selectedCityId } = useContext(SelectedCityIdContext);
  const { timestamp } = useContext(TimestampContext);
  const { units } = useContext(UnitsContext);
  const city = getCity(cities, selectedCityId);

  if (!city || !forecast || !timestamp || !units) return;

  console.log(`forecast`, forecast);

  const fc = forecast.current;
  const description = weatherDescription(fc.weather_code, fc.is_day);
  const temperature = Math.round(fc.temperature_2m);
  const feelsLike = getTemperature(fc.apparent_temperature, "°");
  const time = getTime(forecast.current.time, forecast.timezone, "h:mm a");
  const { windLabel } = getWindValues(fc.wind_speed_10m, fc.wind_gusts_10m, units.windSpeed.label);
  const humidity = getHumidity(fc.relative_humidity_2m, "%");

  return (
    <ul className="size--md">
      <li className="columns-2 label-value">
        <div className="label-value__temperature">
          <span className="label">Temperature</span>{" "}
          <span className="value size--xl">
            {temperature}°<span className="visually-hidden">{units.temperature.label}</span>
          </span>
        </div>
        <div className="label-value label-value__humidex">
          <span className="label">Feels like</span>{" "}
          <span className="value">
            <Unmask label={`${feelsLike}`} />
          </span>
        </div>
      </li>
      <li className="columns-2 label-value">
        <div className="label-value__location">
          <span className="label">Location</span>{" "}
          <span className="value">
            <Unmask label={city.name} />
          </span>
        </div>{" "}
        <div className="label-value label-value__time">
          <span className="label">Time</span>{" "}
          <span className="value">
            <Unmask label={time} />
          </span>
        </div>
      </li>
      <li className="label-value label-value__conditions">
        <span className="label">Conditions</span>{" "}
        <span className="value">
          <Unmask label={description} />
        </span>
      </li>
      <li className="columns-2 label-value">
        <div className="label-value__wind">
          <span className="label">Wind</span>{" "}
          <span className="value size--md">
            <Unmask label={windLabel || "0"} />
          </span>
        </div>
        <div className="label-value label-value__humidity">
          <span className="label">Humidity</span>{" "}
          <span className="value">
            <Unmask label={`${humidity}`} />
          </span>
        </div>
      </li>
    </ul>
  );
}
