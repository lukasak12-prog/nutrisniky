import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VouchersPage from "./VouchersPage";
import "./styles.css";

// Jednoduché rozlišení stránek podle adresy (Cloudflare Pages vrací index.html pro všechny cesty).
const path = window.location.pathname.replace(/\/+$/, "");
const Page = path === "/poukazy" ? VouchersPage : App;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
