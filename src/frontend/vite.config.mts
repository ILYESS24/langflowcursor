import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  API_ROUTES,
  BASENAME,
  PORT,
  PROXY_TARGET,
} from "./src/customization/config-constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const envAllAIResult = dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
  });

  const envAllAI = envAllAIResult.parsed || {};

  const apiRoutes = API_ROUTES || ["^/api/v1/", "^/api/v2/", "/health"];

  const target =
        env.VITE_PROXY_TARGET || PROXY_TARGET || "https://web-production-3b8f.up.railway.app";

  const port = Number(env.VITE_PORT) || PORT || 3000;

  const proxyTargets = apiRoutes.reduce((proxyObj, route) => {
    proxyObj[route] = {
      target: target,
      changeOrigin: true,
      secure: false,
      ws: true,
    };
    return proxyObj;
  }, {});

      return {
        base: BASENAME || "",
        build: {
          outDir: "build",
          sourcemap: false,
          minify: "esbuild",
          target: "es2020",
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ["react", "react-dom"],
                ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
                router: ["react-router-dom"],
                query: ["@tanstack/react-query"]
              }
            }
          },
          chunkSizeWarningLimit: 1000
        },
    define: {
      "process.env.BACKEND_URL": JSON.stringify(
        envAllAI.BACKEND_URL ?? "https://web-production-3b8f.up.railway.app",
      ),
      "process.env.VITE_API_URL": JSON.stringify(
        envAllAI.VITE_API_URL ?? "https://web-production-3b8f.up.railway.app",
      ),
      "process.env.ACCESS_TOKEN_EXPIRE_SECONDS": JSON.stringify(
        envAllAI.ACCESS_TOKEN_EXPIRE_SECONDS ?? 60,
      ),
      "process.env.CI": JSON.stringify(envAllAI.CI ?? false),
            "process.env.ALL_AI_AUTO_LOGIN": JSON.stringify(
              envAllAI.ALL_AI_AUTO_LOGIN ?? "true",
            ),
      "process.env.ALL_AI_MCP_COMPOSER_ENABLED": JSON.stringify(
        envAllAI.ALL_AI_MCP_COMPOSER_ENABLED ?? "true",
      ),
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      port: port,
      proxy: {
        ...proxyTargets,
      },
    },
  };
});
