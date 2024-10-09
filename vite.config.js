import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.ROBOFLOW_API_KEY": JSON.stringify(env.ROBOFLOW_API_KEY),
      "process.env.ROBOFLOW_API_URL": JSON.stringify(env.ROBOFLOW_API_URL),
    },
    plugins: [
      laravel({
        input: "resources/js/app.tsx",
        refresh: true,
      }),
      react(),
    ],
  };
});
