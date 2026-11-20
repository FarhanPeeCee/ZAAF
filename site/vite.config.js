import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Inside Figma Make the dev server must bind the port and host it is given.
// Outside it, the usual Vite defaults apply.
const inFigma = Boolean(process.env.FIGMA);

export default defineConfig({
  plugins: [react()],
  server: {
    port: inFigma ? Number(process.env.PORT) : 5173,
    host: inFigma ? (process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0') : true,
    strictPort: inFigma,
  },
});
