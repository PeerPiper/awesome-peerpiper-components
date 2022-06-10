// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import path from 'path';
import { spawn } from 'child_process';

// -c : compile only
// -cw compile and watch for file changes during development
const args = process.env.NODE_ENV === 'development' ? '-cw' : '-c';

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

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
		vite: {
			resolve: {
				alias: {
					'@peerpiper/awesome-peerpiper-components': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;
