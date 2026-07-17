import { type City } from "./types";

type Abbreviation = {
  [key: string]: string | undefined;
};

const abbreviatedCountry: Abbreviation = {
  "New Zealand": "NZ",
  "United Arab Emirates": "UAE",
  "United Kingdom": "UK",
  "United States": "USA",
};

const abbreviatedState: Abbreviation = {
  Alberta: "AB",
  "British Columbia": "BC",
  Manitoba: "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Nova Scotia": "NS",
  Ontario: "ON",
  "Prince Edward Island": "PE",
  Quebec: "QC",
  Saskatchewan: "SK",
  "Northwest Territories": "NT",
  Nunavut: "NU",
  Yukon: "YT",
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
  Guam: "GU",
  "Marshall Islands": "MH",
  "Northern Mariana Island": "MP",
  "Puerto Rico": "PR",
  "Virgin Islands": "VI",
};

export function getCityName(
  city: City,
  format:
    | "City"
    | "City, State"
    | "City, Country"
    | "City, State, Country" = "City, State, Country",
) {
  let name: string = city.name;
  let state: string | undefined = abbreviatedState?.[city.admin1] || city.admin1;
  let country: string | undefined = abbreviatedCountry?.[city.country] || city.country;

  // Reduce duplication, e.g. "Oslo, Oslo, Norway" --> "Oslo, Norway"
  if (name === state) {
    state = undefined;
  }

  // e.g. "Ottawa, Ontario, Canada"
  // e.g. "London, England, United Kingdom" --> "London, England, UK"
  if (state && country && format === "City, State, Country") {
    return `${name}, ${state}, ${country}`;
  }

  if (state && format === "City, State") {
    return `${name}, ${state}}`;
  }

  // e.g. "Oslo, Oslo, Norway" --> "Oslo, Norway"
  if (country && (format === "City, Country" || format === "City, State, Country")) {
    return `${name}, ${country}`;
  }

  // e.g. "McMurdo Station Pegasus Field, undefined, undefined"
  return `${name}`;
}
