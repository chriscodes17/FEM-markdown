import NavBar from "./components/NavBar";
import Editor from "./components/Editor";
import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <NavBar />
        <Editor />
      </div>
    </ThemeProvider>
  );
}

export default App;
