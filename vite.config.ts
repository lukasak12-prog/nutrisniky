// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync, unlinkSync } from "fs";
import { join } from "path";

export default defineConfig({
  vite: {
    plugins: [
      {
        name: "remove-wrangler-json-from-client",
        apply: "build",
        enforce: "post",
        async closeBundle() {
          try {
            const wranglerPath = join(process.cwd(), "dist/client/wrangler.json");
            unlinkSync(wranglerPath);
            console.log("✓ Removed wrangler.json from dist/client/");
          } catch (e) {
            // Ignore if file doesn't exist
          }
        },
      },
    ],
  },
  tanstackStart: {
    server: { 
      entry: "src/server.ts",
      preset: "cloudflare-pages",
    },
  },
});
