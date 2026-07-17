import { useContext } from "react";
import { Unmask } from "../../components/Unmask";
import { getRainLabel, getSnowLabel, getTemperature, weatherDescription } from "../../utilities";
import { ForecastContext, TimestampContext, UnitsContext } from "../../contexts";

export function Tomorrow() {
  const { forecast } = useContext(ForecastContext);
  const { timestamp } = useContext(TimestampContext);
  const { units } = useContext(UnitsContext);

  if (!forecast || !timestamp || !units) return;

  const f = forecast.daily;

  // forecast.daily[...][1] = tomorrow
  const description = weatherDescription(f.weather_code[1], true);
  const high = getTemperature(f.temperature_2m_max[1], "°");
  const low = getTemperature(f.temperature_2m_min[1], "°");
  const rain = getRainLabel(f.rain_sum[1], f.showers_sum[1], units.precipitation.label);
  const snowfall = getSnowLabel(f.snowfall_sum[1], units.precipitation.label);

  return (
    <p className="forecast-tomorrow">
      <Unmask label={`${description} tomorrow with a high of ${high} and low of ${low}.`} />
      {rain && (
        <>
          {" "}
          <mark>
            <Unmask label={`Expect ${rain} of rain.`} />
          </mark>
        </>
      )}
      {snowfall && (
        <>
          {" "}
          <mark>
            <Unmask label={`Expect ${snowfall} of snow.`} />
          </mark>
        </>
      )}
    </p>
  );
}
