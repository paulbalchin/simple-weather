import { type Forecast } from "../contexts";

const weatherUrl = "https://api.open-meteo.com/v1/forecast";

/**
 * Reference URL for params
 * https://open-meteo.com/en/docs?latitude=45.4112&longitude=-75.6981&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,cloud_cover,visibility,wind_speed_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,rain_sum,showers_sum,snowfall_sum,sunshine_duration,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,precipitation,wind_gusts_10m&timezone=auto
 */

const weatherParams = {
  // Defaults
  forecast_days: 7,
  temperature_unit: "celsius",
  wind_speed_unit: "kmh",
  precipitation_unit: "mm",

  // COPY FROM SECTION "API Response > Typescript"
  daily: [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "sunrise",
    "sunset",
    "daylight_duration",
    "rain_sum",
    "showers_sum",
    "snowfall_sum",
    "sunshine_duration",
    "precipitation_sum",
    "precipitation_probability_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
  ],
  hourly: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation_probability",
    "precipitation",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "cloud_cover",
    "visibility",
    "wind_speed_10m",
    "wind_gusts_10m",
  ],
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "cloud_cover",
    "wind_speed_10m",
    "precipitation",
    "wind_gusts_10m",
  ],
  timezone: "auto",
};

const getWeatherData = function (response: Forecast) {
  //
  // COPY __SELECTIVELY__ FROM SECTION "API Response > Typescript"
  //
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Define Int64 variables so they can be processed accordingly
  // Used in "daily" below.
  const sunrise = daily.variables(3)!;
  const sunset = daily.variables(4)!;

  const weatherData = {
    // COPY FROM SECTION "API Response"
    latitude,
    longitude,
    elevation,
    timezone,
    timezoneAbbreviation,
    utcOffsetSeconds,

    // NOTE: INCLUDING utcOffsetSeconds WAS THE SOURCE
    // OF TIMESTAMPS STARTING AT 8PM THE DAY BEFORE
    // INSTEAD OF MIDNIGHT TODAY.
    // TESTED: YES, THAT WAS THE PROBLEM.

    // Note: The order of weather variables in params.current above AND the URL query AND the indices below need to match!
    current: {
      // time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      time: new Date(Number(current.time()) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
      showers: current.variables(5)!.value(),
      snowfall: current.variables(6)!.value(),
      weather_code: current.variables(7)!.value(),
      cloud_cover: current.variables(8)!.value(),
      wind_speed_10m: current.variables(9)!.value(),
      precipitation: current.variables(10)!.value(),
      wind_gusts_10m: current.variables(11)!.value(),
    },
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) =>
          // new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000),
          new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      apparent_temperature: hourly.variables(2)!.valuesArray(),
      precipitation_probability: hourly.variables(3)!.valuesArray(),
      precipitation: hourly.variables(4)!.valuesArray(),
      rain: hourly.variables(5)!.valuesArray(),
      showers: hourly.variables(6)!.valuesArray(),
      snowfall: hourly.variables(7)!.valuesArray(),
      weather_code: hourly.variables(8)!.valuesArray(),
      cloud_cover: hourly.variables(9)!.valuesArray(),
      visibility: hourly.variables(10)!.valuesArray(),
      wind_speed_10m: hourly.variables(11)!.valuesArray(),
      wind_gusts_10m: hourly.variables(12)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        // (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000),
        (_, i) => new Date((Number(daily.time()) + i * daily.interval()) * 1000),
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_max: daily.variables(1)!.valuesArray(),
      temperature_2m_min: daily.variables(2)!.valuesArray(),
      // Map Int64 values to according structure
      sunrise: [...Array(sunrise.valuesInt64Length())].map(
        // (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000),
        (_, i) => new Date(Number(sunrise.valuesInt64(i)) * 1000),
      ),
      // Map Int64 values to according structure
      sunset: [...Array(sunset.valuesInt64Length())].map(
        // (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000),
        (_, i) => new Date(Number(sunset.valuesInt64(i)) * 1000),
      ),
      daylight_duration: daily.variables(5)!.valuesArray(),
      rain_sum: daily.variables(6)!.valuesArray(),
      showers_sum: daily.variables(7)!.valuesArray(),
      snowfall_sum: daily.variables(8)!.valuesArray(),
      sunshine_duration: daily.variables(9)!.valuesArray(),
      precipitation_sum: daily.variables(10)!.valuesArray(),
      precipitation_probability_max: daily.variables(11)!.valuesArray(),
      wind_speed_10m_max: daily.variables(12)!.valuesArray(),
      wind_gusts_10m_max: daily.variables(13)!.valuesArray(),
    },
  };

  // console.log(
  //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
  //   `\nElevation: ${elevation}m asl`,
  //   `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
  //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s / ${utcOffsetSeconds / 60 / 60}h`,
  // );

  // console.log(`hourly.time()`, Number(hourly.time()));
  // console.log(`hourly.timeEnd()`, Number(hourly.timeEnd()));
  // console.log(`hourly.interval()`, hourly.interval());

  // console.log(
  //   `\nCurrent time: ${weatherData.current.time}\n`,
  //   `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
  //   `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
  //   `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
  //   `\nCurrent is_day: ${weatherData.current.is_day}`,
  //   `\nCurrent rain: ${weatherData.current.rain}`,
  //   `\nCurrent showers: ${weatherData.current.showers}`,
  //   `\nCurrent snowfall: ${weatherData.current.snowfall}`,
  //   `\nCurrent weather_code: ${weatherData.current.weather_code}`,
  //   `\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
  //   `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
  //   `\nCurrent precipitation: ${weatherData.current.precipitation}`,
  //   `\nCurrent wind_gusts_10m: ${weatherData.current.wind_gusts_10m}`,
  // );
  // console.log("\nHourly data:\n", weatherData.hourly);
  // console.log("\nDaily data:\n", weatherData.daily);

  return weatherData;
};

export { weatherParams, weatherUrl, getWeatherData };
