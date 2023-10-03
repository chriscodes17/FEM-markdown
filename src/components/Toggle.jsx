import { useTheme } from "../context/ThemeContext";
import lightMode from "../assets/icon-light-mode.svg";
import darkMode from "../assets/icon-dark-mode.svg";
import "../styles/Toggle.css";

export default function Toggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-toggle-container">
      <img className={theme === "light" ? "current" : ""} src={lightMode} alt="" />
      <label className="switch">
        <input onClick={toggleTheme} type="checkbox" />
        <span className="slider round"></span>
      </label>
      <img className={theme === "dark" ? "current" : ""} src={darkMode} alt="" />
    </div>
  );
}
