// Vstup pro předgenerování HTML při buildu (scripts/prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import VouchersPage from "./VouchersPage";

export { pages, headTags } from "./seo";

export function render(path: string) {
  const Page = path === "/poukazy" ? VouchersPage : App;
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
