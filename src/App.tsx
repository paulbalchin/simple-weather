import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CitiesProvider,
  ForecastProvider,
  LoadingProvider,
  SelectedCityIdProvider,
  ThemeProvider,
  TimestampProvider,
  UnitsProvider,
} from "./contexts";

import { Forecast } from "./pages/Forecast";
import { Nav } from "./pages/Nav";
import { Search } from "./pages/Search";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";
import { Sort } from "./pages/Sort";

function App() {
  return (
    <CitiesProvider>
      <LoadingProvider>
        <ForecastProvider>
          <SelectedCityIdProvider>
            <ThemeProvider>
              <TimestampProvider>
                <UnitsProvider>
                  <BrowserRouter basename="/simple-weather/">
                    <Routes>
                      <Route path="/" element={<Forecast />} />
                      <Route path="/nav" element={<Nav />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/sort" element={<Sort />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </BrowserRouter>
                </UnitsProvider>
              </TimestampProvider>
            </ThemeProvider>
          </SelectedCityIdProvider>
        </ForecastProvider>
      </LoadingProvider>
    </CitiesProvider>
  );
}

export { App };
