// Vstup pro předgenerování HTML při buildu (scripts/prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { pageFor } from "./routes";

export { pages, headTags } from "./seo";
export { openItems } from "./data/legal";

export function render(path: string) {
  const Page = pageFor(path);
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
