import { useContext } from "react";
import { getDateObject } from "../../utilities";
import { ForecastContext, TimestampContext, UnitsContext } from "../../contexts";
import { Afternoon, Evening, Morning, Overnight } from "./";

export function LaterToday({}) {
  const { forecast } = useContext(ForecastContext);
  const { timestamp } = useContext(TimestampContext);
  const { units } = useContext(UnitsContext);

  // Forecast: The next 24 hours in 6-hour (quarterly) sections.
  // e.g. Overnight | Morning | Afternoon | Evening
  const hour = Number(getDateObject(timestamp, forecast?.timezone).toFormat("H"));

  if (!forecast || !timestamp || !units) return;

  const f = forecast.hourly;
  let timeIndex: number;

  // Overnight:
  // If the current hour is later than 6 am, then we refer to the next night instead (+24).
  timeIndex = hour < 6 ? 0 : 24;

  const overnight = {
    label: "Overnight",
    index: timeIndex,
    timeIndex: timeIndex,
    isDay: false,
    temperature: -999,
    rain: 0,
    showers: 0,
    snowfall: 0,
    weatherCode: 0,
  };

  for (let i = overnight.index; i <= overnight.index + 6; i++) {
    // Accumulate the following for Overnight.
    overnight.rain += f.rain[i];
    overnight.showers += f.showers[i];
    overnight.snowfall += f.snowfall[i];
    // Find the single worst weather conditon (0 = "Clear", 99 = "Heavy thunderstorm with heavy hail")
    overnight.weatherCode = Math.max(overnight.weatherCode, f.weather_code[i]);

    // Find the f.time[index] that represents the lowest temp between midnight and noon.
    if (overnight.temperature > f.temperature_2m[i]) {
      overnight.timeIndex = i;
      overnight.temperature = f.temperature_2m[i];
    }
  }

  // Morning:
  // If the current hour is later than 6 am, then we refer to the next morning instead (+24).
  timeIndex = 8 + (hour <= 6 ? 0 : 24);

  const morning = {
    label: "Morning",
    index: timeIndex,
    timeIndex: timeIndex,
    isDay: true,
    // Use the f.time[index] that represents 8 am.
    temperature: f.temperature_2m[timeIndex],
    rain: 0,
    showers: 0,
    snowfall: 0,
    weatherCode: 0,
  };

  for (let i = morning.index; i <= morning.index + 6; i++) {
    // Accumulate the following for Morning.
    morning.rain += f.rain[i];
    morning.showers += f.showers[i];
    morning.snowfall += f.snowfall[i];
    // Find the single worst weather conditon (0 = "Clear", 99 = "Heavy thunderstorm with heavy hail")
    morning.weatherCode = Math.max(morning.weatherCode, f.weather_code[i]);
  }

  // Afternoon:
  // Find the f.time[index] that represents the highest temp between noon and midnight.
  timeIndex = 12 + (hour < 18 ? 0 : 24);

  const afternoon = {
    label: "Afternoon",
    index: timeIndex,
    timeIndex: timeIndex,
    isDay: true,
    temperature: -999,
    rain: 0,
    showers: 0,
    snowfall: 0,
    weatherCode: 0,
  };

  for (let i = afternoon.index; i <= afternoon.index + 6; i++) {
    // Accumulate the following for afternoon.
    afternoon.rain += f.rain[i];
    afternoon.showers += f.showers[i];
    afternoon.snowfall += f.snowfall[i];
    // Find the single worst weather conditon (0 = "Clear", 99 = "Heavy thunderstorm with heavy hail")
    afternoon.weatherCode = Math.max(afternoon.weatherCode, f.weather_code[i]);

    // Find the f.time[index] that represents the lowest temp between midnight and noon.
    if (afternoon.temperature < f.temperature_2m[i]) {
      afternoon.timeIndex = i;
      afternoon.temperature = f.temperature_2m[i];
    }
  }

  // Evening:
  // If the current hour is later than 8 pm, then we refer to the next evening instead (+24).
  timeIndex = 20 + (hour <= 18 ? 0 : 24);

  const evening = {
    label: "Evening",
    index: timeIndex,
    timeIndex: timeIndex,
    isDay: false,
    // Use the f.time[index] that represents 8 pm.
    temperature: f.temperature_2m[timeIndex],
    rain: 0,
    showers: 0,
    snowfall: 0,
    weatherCode: 0,
  };

  for (let i = evening.index; i <= evening.index + 6; i++) {
    // Accumulate the following for evening.
    evening.rain += f.rain[i];
    evening.showers += f.showers[i];
    evening.snowfall += f.snowfall[i];
    // Find the single worst weather conditon (0 = "Clear", 99 = "Heavy thunderstorm with heavy hail").
    evening.weatherCode = Math.max(evening.weatherCode, f.weather_code[i]);
  }

  let forecastOrder: any[];
  if (hour < 6) {
    forecastOrder = [overnight, morning, afternoon, evening];
  } else if (hour < 12) {
    forecastOrder = [morning, afternoon, evening, overnight];
  } else if (hour < 18) {
    forecastOrder = [afternoon, evening, overnight, morning];
  } else {
    forecastOrder = [evening, overnight, morning, afternoon];
  }

  // if 0 = overnight, then next 6 hours.
  // if 0 = morning, then next 6 and 12 hours.
  // if 0 = afternoon, then next 6 and 12 hours.
  // if 0 = evening, then next 6 hours.

  if (forecastOrder[0].label === "Overnight") {
    return <Overnight forecast={forecastOrder[0]} label={units.precipitation.label} />;
  }

  if (forecastOrder[0].label === "Morning") {
    return (
      <>
        <Morning forecast={forecastOrder[0]} label={units.precipitation.label} />
        <Afternoon n={1} forecast={forecastOrder[0]} label={units.precipitation.label} />
      </>
    );
  }

  if (forecastOrder[0].label === "Afternoon") {
    return (
      <>
        <Afternoon n={0} forecast={forecastOrder[0]} label={units.precipitation.label} />
        <Evening n={1} forecast={forecastOrder[1]} label={units.precipitation.label} />
      </>
    );
  }

  if (forecastOrder[0].label === "Evening") {
    return <Evening n={0} forecast={forecastOrder[0]} label={units.precipitation.label} />;
  }
}
