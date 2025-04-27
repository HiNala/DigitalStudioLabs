import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./spline-overrides.css"; // Import custom CSS to hide Spline attribution
import { initEmailJS } from './lib/emailjs';

// Initialize EmailJS at application startup
initEmailJS();

createRoot(document.getElementById("root")!).render(
  <App />
);
