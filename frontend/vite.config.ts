import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '#service': path.resolve(__dirname, 'src/service'),
        '#controller': path.resolve(__dirname, 'src/controller'),
        '#viewModel': path.resolve(__dirname, 'src/viewModel'),
        '#view': path.resolve(__dirname, 'src/view'),
        '#shared': path.resolve(__dirname, 'src/shared'),
      },
    },
    test: {
      environment: 'node',
      globals: true,
      include: ['**/*.test.ts'],
      reporters: ['verbose'],
    },
    server: {
      host: true,
      port: parseInt(env.VITE_PORT, 10),
    },
    build: {
      minify: env.VITE_MINIFY === 'false' ? false : true,
    },
  };
});
