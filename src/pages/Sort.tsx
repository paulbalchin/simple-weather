import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { type Cities, CitiesContext } from "../contexts";
import { getCityName } from "../utilities";
import { Sortable } from "./Sort/Sortable";
import { PageHeader } from "../components";

import "./Sort/Sort.scss";

/**
 * See the following links for documentation.
 * Reference page: https://dnd-kit.com/react/hooks/use-sortable/
 * Codesandbox.io: https://codesandbox.io/p/sandbox/r858s9?file=%2Fsrc%2FApp.tsx%3A20%2C41
 */

function createRange(length: number) {
  return Array.from({ length }, (_, i) => i + 1);
}

export function Sort() {
  const { cities, setCities } = useContext(CitiesContext);
  const [sortedCityIds] = useState(() => {
    return cities.map((city) => city.id);
  });
  const [items, setItems] = useState(createRange(cities.length));
  const [deleteAction, setDeleteAction] = useState(false);
  const navigate = useNavigate();

  const handleDeleteItem = (index: number) => {
    setDeleteAction(true);

    const newItems: number[] = [...items];
    const newCities: Cities = [...cities];
    newItems.splice(index - 1, 1);
    newCities.splice(index, 1);

    setItems(newItems);
    setCities(newCities);
  };

  // If the user deleted the last remaining item, then go to the /search page.
  useEffect(() => {
    if (cities.length === 0) {
      navigate("/search");
    }
  }, [cities, navigate]);

  // After onDragEnd > setItems, re-sort `cities` to match `items` and save.
  useEffect(() => {
    // Skip this useEffect if the user deleted an item, and reset deleteAction.
    if (deleteAction) {
      setDeleteAction(false);
      return;
    }

    // `sortedCityIds` is what synchronizes the order of the array of `cities` and dnd-kit's sort order.

    // Issue: there are no common attributes between `cities` (location data) and `items` (dnd-kit's sort array).

    // Solution:
    // 1. Initialize `sortedCityIds` to the initial array of `cities` in their original order. (see setState above)
    //    This array doesn't change over the lifetime of this component.
    // 2. On sort, create a new, temporary array of city ids, sorted based on `items` ids.

    const newSortedCityIds: number[] = [];

    items.map((id) => {
      newSortedCityIds.push(sortedCityIds[id - 1]!);
    });

    // 3. Create a new array of `cities` based on the sort order of the temporary list.

    const newCities: Cities = [];
    newSortedCityIds.map((id) => {
      const city = cities.find((city) => id === city.id);
      if (city) {
        newCities.push(city);
      }
    });

    // 4. Save

    setCities(newCities);
  }, [items]);

  return (
    <div id="sort">
      <PageHeader title="Manage search results" />

      <p className="label">Press and hold a city to sort.</p>
      <p className="label">Click the "X" to remove it.</p>
      <DragDropProvider
        onDragEnd={(event) => {
          setItems((items) => move(items, event));
        }}
      >
        <ul className="cities-list">
          {items.map((id, index) => {
            const city = cities[index];
            const cityName = getCityName(city, "City, Country");
            return (
              <Sortable
                key={id}
                id={id}
                index={index}
                // isSelected={city.id === selectedCityId}
                cityName={`${cityName}`}
                onClickDelete={handleDeleteItem}
              />
            );
          })}
        </ul>
      </DragDropProvider>

      <Link to="/search">‹ Return to search</Link>
    </div>
  );
}
