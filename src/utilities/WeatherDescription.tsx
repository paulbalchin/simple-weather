// See https://open-meteo.com/en/docs at the bottom of the page.

// These descriptions are day/night agnostic.

// See `/src/components/WeatherIcon` for usage with icons.

export const weatherCode = {
  "0": "Clear",
  "1": "Mainly clear",
  "2": "Partly cloudy",
  "3": "Overcast",
  "45": "Light fog",
  "48": "Dense fog",
  "51": "Light drizzle",
  "53": "Moderate drizzle",
  "55": "Dense drizzle",
  "56": "Freezing light drizzle",
  "57": "Freezing dense drizzle",
  "61": "Slight rain",
  "63": "Moderate rain",
  "65": "Heavy rain",
  "66": "Slight freezing rain",
  "67": "Heavy freezing rain",
  "71": "Slight snow",
  "73": "Moderate snow",
  "75": "Heavy snow",
  "77": "Snow grains",
  "80": "Slight rain showers",
  "81": "Moderate rain showers",
  "82": "Violent rain showers",
  "85": "Slight snow showers",
  "86": "Heavy snow showers",
  "95": "Slight thunderstorm",
  "96": "Slight thunderstorm with slight hail",
  "99": "Heavy thunderstorm with heavy hail",
};

function weatherDescription(code: number | string, isDay: boolean = false): string {
  if (Number(code) <= 2 && isDay) {
    switch (code) {
      case 0:
        return "Sunny";
      case 1:
        return "Mostly sunny";
      case 2:
        return "Partly sunny";
    }
  }

  return weatherCode[String(code) as keyof typeof weatherCode];
}

type WeatherCodeProps = {
  code: number | string;
  isDay: boolean;
};

function WeatherDescription({ code, isDay = false }: WeatherCodeProps): string {
  return weatherDescription(code, isDay);
}

export { weatherDescription, WeatherDescription };

/*

The Weather Network descriptions are day-time specific or night-time agnostic

We can use current.is_day = 1 or 0

Open-Meteo has 4 descriptions for sky cover and is day/night agnostic: 
-   0% clear
-  33% mainly clear
-  67% partly cloudy
- 100% overcast

TWN has 5 descriptions for sky cover and is day-time specific or night-time agnostic: 
-   0% sunny, clear
-  25% mainly sunny, mainly clear
-  50% a mix of sun and clouds / partly cloudy
-  75% cloudy with sunny breaks / mainly cloudy
- 100% cloudy

*/
/**

TODO: Update above to match below

https://www.google.com/search?q=the+weather+channel+list+of+weather+descriptions:

Clear / Sunny: The sky is completely or mostly free of clouds.

Mostly Clear: The sky is mostly sunny with some thin or scattered clouds (typically less than a quarter of the sky covered).

Partly Cloudy / Partly Sunny: A mix of sun and clouds. Clouds cover roughly \(38\%\) to \(62\%\) of the sky.

Mostly Cloudy: The sky is predominantly cloudy with only occasional breaks of sunshine.

Cloudy / Overcast: A solid deck of clouds covering the entire sky.

Drizzle / Light Rain: Very light precipitation consisting of tiny water droplets (drizzle) or falling at \(0.1\) inches or less per hour (light rain).

Rain / Showers: Liquid precipitation falling steadily (rain) or dropping from convective clouds in varying intervals (showers).

Thunderstorms: Precipitation accompanied by lightning, thunder, and sometimes gusty winds or hail.

Snow / Snow Showers: Solid, frozen precipitation. "Showers" indicate snow that starts and stops suddenly and can rapidly change in intensity.

Flurries: Very light snow that falls from convective clouds, often characterized by quick starts and stops with little or no accumulation.

Blizzard / Blowing Snow: A severe winter storm with strong winds (over 56 km/h or 35 mph), low temperatures, and blowing snow that reduces visibility to near zero.

Freezing Rain: Rain that falls as a liquid but freezes immediately upon contact with cold surfaces, creating glaze ice.

Sleet: Frozen raindrops (ice pellets) that bounce when hitting the ground.

Fog / Mist: A low-lying cloud at ground level that reduces visibility. Fog is thicker and reduces visibility more drastically than mist.

Windy / Breezy: Sustained elevated wind speeds that are not necessarily associated with a storm event.

Haze / Smoke: Reduced visibility caused by microscopic particles (dust, smoke, or pollutants) suspended in the air.
 */
