import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from "path";

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('../src', import.meta.url)),
            buffer: 'buffer',
            process: 'process/browser',
        }
    },
    css: {
        postcss: path.resolve(__dirname, "./postcss.config.js"),
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/assets/styles/_variables.scss" as *;`
          },
        },
    },
    server: {
        port: 3000
    }
});

function checker(arg0: { typescript: boolean; }): import("vite").PluginOption {
    throw new Error('Function not implemented.');
}
