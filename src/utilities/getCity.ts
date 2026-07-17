import { type City } from "../utilities";

/**
 * @param {City} cities - Array of previously selected cities
 * @param {number} id - Id of current city
 * @returns city details (lat, long, name, etc.)
 */
export function getCity(cities: Array<City>, id: number | undefined) {
  return cities?.find((city) => id === city.id);
}
