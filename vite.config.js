import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // For GitHub project Pages: VITE_BASE_PATH=/portfolio/ (or --base=/portfolio/).
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
});
