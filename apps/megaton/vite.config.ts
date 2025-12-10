/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { version } from './package.json';
import path from 'path';
import { writeVersion } from './plugins/write-version';

const BUILD_PATH = path.resolve('./dist');
const BUILD_VERSION = `${version}.${Date.now()}`;

export default defineConfig(({ command }) => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/megaton',
  base: '/',
  server: {
    port: 3000,
    host: 'localhost',
  },
  preview: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), writeVersion(BUILD_PATH, BUILD_VERSION, version)],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          state: ['zustand', '@tanstack/react-query'],
          'state-cache': [
            '@tanstack/react-query-persist-client',
            '@tanstack/query-async-storage-persister'
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-avatar',
            '@radix-ui/react-label',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-accordion',
            '@radix-ui/react-switch',
            '@radix-ui/react-scroll-area',
            'lucide-react',
            'react-select'
          ],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          charts: ['recharts'],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend'
          ],
          utils: [
            'date-fns',
            'ky',
            'clsx',
            'class-variance-authority',
            'tailwind-merge'
          ]
        }
      }
    }
  }
  ,
  test: {
    name: '@apollo/megaton',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));

