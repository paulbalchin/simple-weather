import React, { useEffect, useState, type ReactNode } from "react";

import { Unmask } from "../../components/Unmask";
import { getCityName } from "../../utilities";
import type { Cities, City } from "../../contexts";

type SearchResultsType = {
  cities: Cities | undefined;
  onClick: (city: City) => void;
};

export function ListSearchResults({ cities, onClick }: SearchResultsType) {
  const [, setRender] = useState(true);
  const [items, setItems] = useState<React.JSX.Element[]>([]);
  const [count, setCount] = useState<number>(0);
  // `data` will be populated by `cities` when ready.
  let data: ReactNode[] = [];

  // Stagger rendering per element in `data` array.
  useEffect(() => {
    if (count < data.length) {
      const timer = setTimeout(() => {
        setItems((prev: any) => [...prev, data[count]]);
        setCount((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setRender(false);
    }
  }, [count, data]);

  if (!cities || cities.length === 0) return;

  // Populate the `data` array.
  data = cities.map((city) => {
    const cityName = getCityName(city);

    return (
      <li key={city.id}>
        <button onClick={() => onClick(city)}>
          <Unmask label={cityName} />
        </button>
      </li>
    );
  });

  return (
    <div id="search-results">
      <span className="label">Search results</span>
      <ul>
        {items.map((item, index) => {
          return <React.Fragment key={index}>{item}</React.Fragment>;
        })}
      </ul>
    </div>
  );
}
