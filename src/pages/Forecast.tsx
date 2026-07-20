import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWeatherApi } from "openmeteo";

import {
  CitiesContext,
  ForecastContext,
  SelectedCityIdContext,
  TimestampContext,
  UnitsContext,
} from "../contexts";
import { getCity, getWeatherData, tryCatch, weatherParams, weatherUrl } from "../utilities";
import { Now, LaterToday, Tomorrow } from "./Forecast/";
import { Loading, PageHeader } from "../components";

import "./Forecast/Forecast.scss";

export function Forecast() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { cities } = useContext(CitiesContext);
  const { setForecast } = useContext(ForecastContext);
  const { selectedCityId } = useContext(SelectedCityIdContext);
  const { setTimestamp } = useContext(TimestampContext);
  const { units, altUnits, isMetric, setIsMetric } = useContext(UnitsContext);

  const city = getCity(cities, selectedCityId);
  // to function
  const navigate = useNavigate();

  const fetchForecast = async (switchMetrics: boolean = false) => {
    setLoading(true);
    setError(undefined);

    const _weatherParams = {
      ...weatherParams,
      latitude: city?.latitude,
      longitude: city?.longitude,
      timezone: city?.timezone,
      temperature_unit: switchMetrics ? altUnits.temperature.apiValue : units.temperature.apiValue,
      wind_speed_unit: switchMetrics ? altUnits.windSpeed.apiValue : units.windSpeed.apiValue,
      precipitation_unit: switchMetrics
        ? altUnits.precipitation.apiValue
        : units.precipitation.apiValue,
    };

    const [error, response] = await tryCatch(fetchWeatherApi(weatherUrl, _weatherParams));

    if (error) {
      setError(error as Error);
      setLoading(false);
    } else {
      // Switch UI's metric/imperial units after data has successfully returned.
      switchMetrics && setIsMetric(!isMetric);
      setLoading(false);
      setTimestamp(new Date().toISOString());
      const current = getWeatherData(response[0]);

      // console.log(`current`, current);

      setForecast(current);
    }
  };

  useEffect(() => {
    if (city) {
      fetchForecast();
    } else {
      navigate("/search");
    }
  }, []);

  if (!!error) {
    return <p>{JSON.stringify(error, null, "  ")}</p>;
  }

  return (
    <div id="forecast">
      <PageHeader title="Forecast" />

      <Now />
      <LaterToday />
      <Tomorrow />

      {loading && <Loading />}
    </div>
  );
}
