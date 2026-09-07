import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * GitHub Pages serves this project at `/<repo>/`, not at the domain root, so
 * every asset URL the build emits has to carry that prefix. Vite's `base` is
 * what puts it there; without it the deployed page requests `/assets/...` and
 * gets Pages' 404 for every script and image.
 */
export default defineConfig({
	base: '/mine-sweeper/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 3000,
		open: false,
	},
	preview: {
		host: true,
		port: 4173,
	},
	build: {
		// `dist-web` rather than Vite's default `dist`, because the release
		// workflow uploads that path to Pages.
		outDir: 'dist-web',
		emptyOutDir: true,
		sourcemap: true,
		target: 'es2022',
	},
});
