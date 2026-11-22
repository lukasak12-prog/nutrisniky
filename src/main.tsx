import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VouchersPage from "./VouchersPage";
import "./styles.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

// Jednoduché rozlišení stránek podle adresy.
const path = window.location.pathname.replace(/\/+$/, "").replace(/\.html$/, "");
const Page = path === "/poukazy" ? VouchersPage : App;

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
