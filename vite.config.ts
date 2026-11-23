import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Jen pro lokální vývoj (npm run dev): napodobí /api/poukaz, aby šlo vyzkoušet objednávku poukazu.
// Nic se neodesílá. Na Cloudflare Pages obsluhuje /api/poukaz soubor functions/api/poukaz.ts.
function mockVoucherApi(): Plugin {
  return {
    name: "mock-voucher-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/kontakt", (req, res) => {
        req.resume();
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: true }));
      });
      server.middlewares.use("/api/odstoupeni", (req, res) => {
        req.resume();
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: true, emailSent: true, sentAt: "23. listopadu 2026 v 12:00:00" }));
      });
      server.middlewares.use("/api/poukaz", (req, res) => {
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", () => {
          console.log("[mock /api/poukaz] objednávka (nic se neodesílá):", raw);
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: true, emailSent: true }));
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), mockVoucherApi()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
});
