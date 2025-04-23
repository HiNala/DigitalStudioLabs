import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./spline-overrides.css"; // Import custom CSS to hide Spline attribution

createRoot(document.getElementById("root")!).render(
  <App />
);
