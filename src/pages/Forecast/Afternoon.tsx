import { Unmask } from "../../components/Unmask";
import { getRainLabel, getSnowLabel, weatherDescription } from "../../utilities";

export function Afternoon({ n, forecast, label }: { n: number; forecast: any; label: string }) {
  const q = forecast;
  const later = n === 0 ? "this afternoon" : "later today";
  const classNames = n === 0 ? "forecast-next" : "forecast-later";
  const rain = getRainLabel(q.rain, q.showers, label);
  const snowfall = getSnowLabel(q.snowfall, label);
  const description = weatherDescription(q.weatherCode, q.isDay);
  const temperature = Math.round(q.temperature);

  return (
    <p className={`${classNames} ${classNames}__afternoon`}>
      <Unmask label={`${description} with a high of ${temperature}° ${later}.`} />
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
