// https://open-meteo.com/en/docs/geocoding-api#json_return_object

export type City = {
  id: number | undefined;
  name: string; //         e.g. "Ottawa"
  latitude: number; //     e.g. 45.41117
  longitude: number; //    e.g. -75.69812
  // country_code: string; // e.g. "CA"
  timezone: string; //     e.g. "America/Toronto"
  // country_id: number;
  country: string; //      e.g. "Canada"
  admin1: string; //       e.g. "Ontario"
};
