import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

const vercelApiMockPlugin = () => ({
  name: "vercel-api-mock",
  apply: "serve" as const, // GARANTE QUE O PLUGIN SÓ RODE NO MODO DE DESENVOLVIMENTO
  configureServer(server: any) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (req.url?.startsWith("/api/")) {
        try {
          const endpoint = req.url.split("?")[0].replace("/api/", "");
          const handlerModule = await import(`./api/${endpoint}.ts`);
          const handler = handlerModule.default;

          if (handler) {
            await handler(req, res);
            return;
          }
        } catch (err) {
          console.error(`Error loading API endpoint ${req.url}:`, err);
          res.statusCode = 404;
          res.end("API endpoint not found.");
          return;
        }
      }
      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiMockPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
