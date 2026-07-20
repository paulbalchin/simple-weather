import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CitiesContext, SelectedCityIdContext } from "../contexts";
import { type City, SEARCH_CITY_URL } from "../utilities";

import "./Search/Search.scss";

import { ErrorMessage, SearchInput, ListRecentSelections, ListSearchResults } from "./Search/";
import { Loading, PageHeader } from "../components";

type SearchResultsData = {
  results: Array<City>;
  generationtime_ms: number;
};

export function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [searchResultsData, setSearchResultsData] = useState<SearchResultsData | undefined>(
    undefined,
  );
  const { cities, setCities } = useContext(CitiesContext);
  const { setSelectedCityId } = useContext(SelectedCityIdContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement, Element>) => {
    setSearchText(e.target.value);
    setError(undefined);
  };

  const handleDeleteInput = () => {
    setSearchText("");
    setSearchResultsData(undefined);
    setError(undefined);
    inputRef.current?.blur();
  };

  const handleClickRecentCity = function (cityId: number) {
    setSelectedCityId(cityId);
    navigate("/");
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchResultsData(undefined);

    if (searchText.length === 0) {
      return false;
    }

    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(`${SEARCH_CITY_URL}${searchText}`);
      const json = await response.json();
      setLoading(false);
      // Hides the virtual keyboard on touch devices.
      inputRef.current?.blur();

      // Open-Meteo doesn't "throw" an error if no cities are found, it just returns {generationtime_ms: number}.
      // A successful request returns {results: [], generationtime_ms: number}
      if (json?.results) {
        setSearchResultsData(json);
        setError(undefined);
      } else {
        setSearchResultsData(undefined);
        setError(`Try entering “City” or “City, Country”.`);
      }
    } catch (error: any) {
      setLoading(false);
      setSearchResultsData(undefined);
      setError(error.reason);
    }
  };

  const handleClickResultsCity = function (city: City) {
    if (cities) {
      const duplicateCity = cities.find((c: City) => c.id === city.id);

      // If duplicateCity is true, then simply load that city without modifying `cities`,
      // else if duplicateCity is false, then prepend the new city.
      if (!duplicateCity) {
        const newCities = [...cities];
        newCities.unshift(city);
        setCities(newCities);
      }
    } else {
      setCities([city]);
    }

    setSelectedCityId(city.id);
    navigate("/");
  };

  const handleClickTryAgain = () => {
    setError(undefined);
    inputRef.current?.focus();
  };

  return (
    <>
      <PageHeader title="Search" />

      {cities.length === 0 && (
        <p style={{ marginBottom: "3em" }}>
          <b>No cities found.</b> Find and select a city to display.
        </p>
      )}

      <div id="search">
        <SearchInput
          onSubmitForm={handleSubmit}
          inputRef={inputRef}
          searchText={searchText}
          onChangeInput={handleChangeInput}
          onDelete={handleDeleteInput}
        />

        {cities?.length > 0 && !loading && searchText.length === 0 && (
          <ListRecentSelections cities={cities} onClick={handleClickRecentCity} />
        )}

        {searchText.length > 0 && !loading && !error && (
          <ListSearchResults cities={searchResultsData?.results} onClick={handleClickResultsCity} />
        )}

        {!loading && error && <ErrorMessage onClick={handleClickTryAgain} />}

        {loading && <Loading />}
      </div>
    </>
  );
}
