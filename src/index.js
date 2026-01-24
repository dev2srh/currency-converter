import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./App.css";
import ErrorBoundary from "./Components/ErrorBoundary";

createRoot(document.querySelector("#root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
