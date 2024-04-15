import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': 'window', // Map global to window in the browser environment
  },
  plugins: [react()],
  build: {
    outDir: '../oneday-backend/public',
    emptyOutDir: true,
  },
});
