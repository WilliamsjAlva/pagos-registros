import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias opcional para evitar rutas largas
    },
  },
  server: {
    port: 5173, // Cambia si tienes conflictos
  },
});
