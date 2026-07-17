import { DateTime } from "luxon";

export const getDateObject = (timestamp: string, timezone: string) => {
  // This const: https://moment.github.io/luxon/#/parsing?id=js-date-object

  const dt = DateTime.fromJSDate(new Date(timestamp)).setZone(timezone);

  // returns this object: https://moment.github.io/luxon/#/tour?id=getting-at-components

  // and can be formatted with these tokens: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  // e.g.
  //  1. myDate = getDateObject( timestamp, timezone )
  //  2. myDate.toFormat("h a") --> "1 PM"
  //  3. myDate.toFormat("ha").toLowerCase() --> "1pm"

  return dt;
};
