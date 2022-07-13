// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import preprocessConfig from './svelte.preprocess.config.js';

import { mdsvex } from 'mdsvex';

import path, { dirname } from 'path';
import { spawn } from 'child_process';

import mm from 'micromatch';
import { highlight } from './prism/prism.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -c : compile only
// -cw compile and watch for file changes during development
const args = process.env.NODE_ENV === 'development' ? '-cw' : '-c';

if (true || process.env.NODE_ENV !== 'development') {
	// rollup the components tocompiled code into /dist/ folder
	let server = spawn('rollup', [args], {
		stdio: ['ignore', 'inherit', 'inherit'],
		shell: true
	});

	process.on('SIGTERM', () => {
		if (server) server.kill(0);
	});
	process.on('exit', () => {
		if (server) server.kill(0);
	});
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md', '.svelte.md'],
	preprocess: [
		sveltePreprocess({
			sourceMap: process.env.NODE_ENV !== 'development',
			postcss: true // set postcss: true if postcss-load-config is installed and svelte-preprocess will look for a PostCSS config file in your project.,
		}),
		mdsvex({
			extensions: ['.svx', '.md', '.svelte.md'],
			layout: {
				demo: 'src/layouts/demo.svelte'
			},
			highlight: {
				alias: {
					ts: 'typescript',
					mdx: 'markdown',
					svelte: 'svelte',
					svx: 'svx',
					mdsvex: 'svx',
					sig: 'ts'
				}
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		prerender: { default: true },
		paths: {
			// change below to your repo name
			base: process.env.NODE_ENV === 'development' ? '' : '/awesome-peerpiper-components'
		},
		package: {
			exports: (filepath) => {
				if (filepath.endsWith('.svx')) return false;
				return mm.isMatch(filepath, ['!**/_*', '!**/internal/**']);
			},
			files: mm.matcher('!**/build.*')
		},
		vite: {
			resolve: {
				alias: {
					'@peerpiper/awesome-peerpiper-components': path.resolve('src/lib')
				}
			},
			server: {
				fs: {
					strict: false
				}
			}
		}
	}
};

export default config;
