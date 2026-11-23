import React from "react";
import ReactDOM from "react-dom/client";
import { pageFor } from "./routes";
import "./styles.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

// Jednoduché rozlišení stránek podle adresy.
const Page = pageFor(window.location.pathname);

const rootEl = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);

// Na produkci je HTML předgenerované (scripts/prerender.mjs) → jen ho „oživíme“.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
