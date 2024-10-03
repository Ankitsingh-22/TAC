import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// Optional: Import the visualizer plugin for analyzing bundle size
//import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    // Optional: Use this plugin to generate a visualization of your bundle size
    //visualizer({ open: true }), // Will automatically open the stats page after build
  ],
  build: {
    // Set the warning limit for chunk size (in KB)
    chunkSizeWarningLimit: 2000, // Adjust this as needed (e.g., 2000KB)

    // Rollup options for manual chunking
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dynamically split vendor (node_modules) code into separate chunks
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    sourcemap: false, // Disable sourcemaps for production builds to prevent errors
  },
});
