import { useContext } from "react";

import { ThemeContext } from "../contexts";
import { UnitsContext } from "../contexts";
import { Unmask } from "../components/Unmask";
import { PageHeader } from "../components";

export function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isMetric, setIsMetric } = useContext(UnitsContext);

  return (
    <>
      <PageHeader title="Settings" />

      <div id="search">
        <span className="size--xs">Units</span>
        <ul>
          <li>
            <input
              type="radio"
              id="celsius"
              name="unit"
              value="celsius"
              checked={isMetric}
              onChange={() => {
                setIsMetric(true);
              }}
            />
            <label htmlFor="celsius" className="as-a">
              <Unmask label="Celsius" />
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="fahrenheit"
              name="unit"
              value="fahrenheit"
              checked={!isMetric}
              onChange={() => {
                setIsMetric(false);
              }}
            />
            <label htmlFor="fahrenheit" className="as-a">
              <Unmask label="Fahrenheit" />
            </label>
          </li>
        </ul>
        <span className="size--xs">Theme</span>
        <ul>
          <li>
            <input
              type="radio"
              id="light"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={() => {
                setTheme("light");
              }}
            />
            <label htmlFor="light" className="as-a">
              <Unmask label="Light" />
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={() => {
                setTheme("dark");
              }}
            />
            <label htmlFor="dark" className="as-a">
              <Unmask label="Dark" />
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}
