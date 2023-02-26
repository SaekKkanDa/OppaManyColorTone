import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "vite-plugin-babel";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        loader: "jsx",
    },
    server: { host: "0.0.0.0", port: 3000 },
    plugins: [react(), babel()],
    resolve: {
        alias: {
            "@Components": path.resolve(__dirname, "./src/components"),
            "@Constant": path.resolve(__dirname, "./src/constant"),
            "@Hooks": path.resolve(__dirname, "./src/hooks"),
            "@Pages": path.resolve(__dirname, "./src/pages"),
            "@Utils": path.resolve(__dirname, "./src/utils"),
            "@Styles": path.resolve(__dirname, "./src/styles"),
        },
    },
    build: {
        rollupOptions: {
            external: ["firebase-admin"],
        },
    },
});
