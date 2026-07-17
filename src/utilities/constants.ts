import { getDateObject } from "./getDateObject";

// Lat and Long to Montreal
// https://api.open-meteo.com/v1/forecast?latitude=45.51&longitude=73.57&current=temperature_2m

export const SEARCH_CITY_URL = `https://geocoding-api.open-meteo.com/v1/search?name=` as const;

export function getTemperature(temperature: number, symbol?: string) {
  const _symbol = symbol ? `${symbol}` : "";

  return Math.round(temperature) + _symbol;
}

export function getHumidity(humidity: number, symbol?: string) {
  const _symbol = symbol ? `${symbol}` : "";

  return Math.round(humidity / 5) * 5 + _symbol;
}

export function getTime(timestamp: string, timezone: string, format: string) {
  return getDateObject(timestamp, timezone).toFormat(format).toLowerCase();
}

export function getRain(rain: number) {
  return Math.round(rain + 0.5);
}

export function getShowers(showers: number) {
  return Math.round(showers + 0.5);
}

/**
 *
 * @param snow cm or inches to 15 decimal places
 * @returns rounded integer
 */
export function getSnow(snow: number) {
  return Math.round(snow);
}

/**
 * @param rain mm or inches to 15 decimal places
 * @param showers mm or inches to 15 decimal places
 * @param units e.g. "mm" or "in"
 * @returns plain English string, e.g. "<1 mm"
 */
export function getRainLabel(rain: number, showers: number, units?: string) {
  const _units = units ? ` ${units}` : "";
  const _rain = Math.round(rain);
  const _showers = Math.round(showers);
  let value = "";

  if (_rain === 0 && _showers === 0) {
    return;
  }

  // "<1 mm" | "X mm"
  if (_rain > 0 && _showers === 0) {
    if (rain < 1) {
      value = "<1";
    } else if (_rain === 1) {
      value = "~1";
    } else {
      value = `${_rain}`;
    }
  } else if (_rain === 0 && _showers > 0) {
    // "0-X mm"
    value = showers < 1 ? "<1" : `${_showers}`;
  } else {
    // (rain > 0 && showers > 0)
    // "X-Y mm"
    value = `${_rain}-${Math.round(_showers)}`;
  }

  return value + _units;
}

/**
 * @param snow cm or inches to 15 decimal places
 * @param units e.g. "cm" or "in"
 * @returns plain English string, e.g. "<1 cm"
 */
export function getSnowLabel(snow: number, units?: string) {
  const _units = units ? ` ${units}` : "";
  const _snow = Math.round(snow);
  let value = "";

  if (_snow === 0) {
    return;
  }

  if (snow > 0) {
    if (snow < 1) {
      value = "<1";
    } else if (_snow === 1) {
      value = "~1";
    } else {
      value = `${_snow}`;
    }
  }

  return value + _units;
}

type ReturnWindType = { windSpeed?: number; windGusts?: number; windLabel?: string };

/**
 * @param speed kmh or mph to 15 decimal places
 * @param gusts kmh or mph to 15 decimal places
 * @param units e.g. "cm" or "in"
 * @returns plain English string, e.g. "10-20 km/h"
 */
export function getWindValues(speed: number, gusts: number, units?: string): ReturnWindType {
  // Round down speed, round up gusts, so that minimum range is "0-5"
  const windSpeed = Math.round(speed / 5) * 5 + 5;
  const windGusts = Math.round(gusts / 5) * 5;
  const _units = units ? ` ${units}` : "";
  let windLabel = "";

  if (speed === 0 && gusts === 0) {
    return { windSpeed: undefined, windGusts: undefined, windLabel: undefined };
  }

  if (speed > 0 && gusts > 0) {
    windLabel = `${windSpeed}-${windSpeed + windGusts}${_units}`;
  }

  if (speed > 0 && gusts === 0) {
    windLabel = speed < 1 ? `<1 ${_units}` : `${windSpeed}${_units}`;
  }

  if (speed === 0 && gusts > 0) {
    windLabel = gusts < 1 ? `<1 ${_units}` : `0-${windGusts}${_units}`;
  }

  return { windSpeed, windGusts, windLabel };
}
