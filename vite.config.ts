import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
          scss: {
            // Указываем путь к файлу с глобальными переменными
            additionalData: `@use "@/assets/styles/_variables.scss" as *;`
          },
        },
    },
    server: {
        // Дополнительные настройки сервера (например, если нужно указать порт)
        port: 3000
    }
});