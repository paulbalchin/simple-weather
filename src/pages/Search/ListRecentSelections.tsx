import React, { useEffect, useState, type ReactNode } from "react";

import { getCityName } from "../../utilities";
import type { Cities } from "../../contexts";
import { Link } from "react-router";

type ListRecentSelectionsType = {
  cities: Cities;
  onClick: (id: number) => void;
};

export function ListRecentSelections({ cities, onClick }: ListRecentSelectionsType) {
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
    const cityName = getCityName(city, "City, Country");

    return (
      <li key={city.id}>
        <button onClick={() => onClick(city.id!)}>{cityName}</button>
      </li>
    );
  });

  return (
    <div id="recent-selections">
      <span className="label">Recent selections</span>
      <ul>
        {items.map((item, index) => {
          return <React.Fragment key={index}>{item}</React.Fragment>;
        })}
      </ul>
      <Link to="/sort">Manage this list ›</Link>
    </div>
  );
}
