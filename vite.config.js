import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import react from '../sprint4-eden-ran-yahav-backend/public'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // 'global' : {}
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200, 
    outDir: '../oneday-backend/public',
    emptyOutDir: true,
  },
});
