// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  vite: {
    plugins: [
      {
        name: "fix-wrangler-json-bom-and-triggers",
        apply: "build",
        enforce: "post",
        async closeBundle() {
          try {
            const wranglerPath = join(process.cwd(), "dist/client/wrangler.json");
            let content = readFileSync(wranglerPath, "utf-8");
            
            // Odstrani BOM znak pokud existuje
            if (content.charCodeAt(0) === 0xFEFF) {
              content = content.slice(1);
            }
            
            const wrangler = JSON.parse(content);
            
            // Musi zustat pouze tato pole pro Cloudflare Pages
            const allowedFields = [
              "name",
              "pages_build_output_dir",
              "compatibility_date",
              "compatibility_flags",
              "triggers",
              "routes",
              "build",
              "env",
              "vars"
            ];
            
            const cleanedWrangler = {};
            allowedFields.forEach(field => {
              if (wrangler.hasOwnProperty(field)) {
                cleanedWrangler[field] = wrangler[field];
              }
            });
            
            // Ujisti se, ze pages_build_output_dir je relativni cesta
            if (cleanedWrangler.pages_build_output_dir && 
                (cleanedWrangler.pages_build_output_dir.includes("\\") || cleanedWrangler.pages_build_output_dir.includes("C:"))) {
              cleanedWrangler.pages_build_output_dir = "dist/client";
            }
            
            // Zajisti spravnou strukturu triggers
            if (!cleanedWrangler.triggers || Object.keys(cleanedWrangler.triggers).length === 0) {
              cleanedWrangler.triggers = { crons: [] };
            }
            
            // Zapise bez BOM znaku
            const jsonContent = JSON.stringify(cleanedWrangler, null, 2);
            writeFileSync(wranglerPath, jsonContent, "utf-8");
            console.log("✓ Fixed wrangler.json - removed BOM, fixed triggers, cleaned invalid fields, and normalized paths");
          } catch (e) {
            console.warn("Note: Could not process wrangler.json:", e.message);
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
