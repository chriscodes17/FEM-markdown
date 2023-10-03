import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MarkdownEditorProvider } from "./context/MarkdownEditorContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MarkdownEditorProvider>
    <App />
  </MarkdownEditorProvider>
);
