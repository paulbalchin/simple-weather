/**
 * Use fetch as an inline request.
 *
 * const [error, response] = await tryCatch(fetchWeatherApi(weatherUrl, _weatherParams));
 *
 * if (error) {
 *   // your code
 * } else {
 *   // your code
 * }
 *
 */

// prettier-ignore
export const tryCatch = async <T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> => {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error];
    });
};
