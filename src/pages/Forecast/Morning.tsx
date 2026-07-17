import { Unmask } from "../../components/Unmask";
import { getRainLabel, getSnowLabel, weatherDescription } from "../../utilities";

export function Morning({ forecast, label }: { forecast: any; label: string }) {
  const q = forecast;
  const rain = getRainLabel(q.rain, q.showers, label);
  const snowfall = getSnowLabel(q.snowfall, label);
  const description = weatherDescription(q.weatherCode, q.isDay);
  const temperature = Math.round(q.temperature);

  return (
    <p className="forecast-next forecast-next__morning">
      <Unmask label={`${description} and ${temperature}° this ${q.label.toLowerCase()}.`} />
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
