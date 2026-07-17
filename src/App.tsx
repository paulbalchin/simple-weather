import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {
  CitiesProvider,
  ForecastProvider,
  LoadingProvider,
  SelectedCityIdProvider,
  ThemeProvider,
  TimeFormatProvider,
  TimestampProvider,
  UnitsProvider,
} from "./contexts";

// import { About, Forecast, Manage, Search, Settings } from "./pages";
import { Forecast } from "./pages/Forecast";
// import { Forecast } from "./pages/Forecast";
import { Nav } from "./pages/Nav";
import { Search } from "./pages/Search";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";
import { Sort } from "./pages/Sort";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Forecast />,
    },
    {
      path: "/nav",
      element: <Nav />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/sort",
      element: <Sort />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ]);

  return (
    <CitiesProvider>
      <LoadingProvider>
        <ForecastProvider>
          <SelectedCityIdProvider>
            <ThemeProvider>
              <TimeFormatProvider>
                <TimestampProvider>
                  <UnitsProvider>
                    <RouterProvider router={router} />
                  </UnitsProvider>
                </TimestampProvider>
              </TimeFormatProvider>
            </ThemeProvider>
          </SelectedCityIdProvider>
        </ForecastProvider>
      </LoadingProvider>
    </CitiesProvider>
  );
}

export { App };
