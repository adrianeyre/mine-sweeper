import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is served from the root of https://mine-sweeper.adrianeyre.co.uk, so
 * asset URLs must not carry the `/mine-sweeper/` repo prefix that Pages needed
 * back when it was hosted at adrianeyre.github.io/mine-sweeper. A relative
 * `base` emits `./assets/...`, which resolves correctly from the domain root
 * and from a subpath alike, so neither host can 404 on the scripts and styles.
 */
export default defineConfig({
	base: './',
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
