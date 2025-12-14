import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Automatically open the app in the default browser on start
    open: true,
    port: 5173,
    host: true
  }
});