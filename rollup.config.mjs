// compile individual components into their own es modules
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { globbySync } from 'globby';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;
const formats = ['es'];
const compPath = 'src/lib/components';

// build a list of components to individually compile
const components = globbySync([
	'src/lib/components/**/*.svelte', // include all svelte components
	'!src/lib/components/**/_**/*.svelte', // exclude sub-components
	'src/lib/components/**/index.js' // include all svelte components
]).map((path) => ({
	// get the folder preceding the file name
	namespace: path.split('/')[path.split('/').length - 2],
	component: path.split('/')[path.split('/').length - 1]
}));

const config = components.map(({ namespace, component }) => ({
	input: `src/lib/components/${namespace}/${component}`,
	output: {
		file: `compiled/${namespace}/${component.replace('.js', '')}.js`,
		format: 'es'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: true
			}),
			compilerOptions: {
				dev: !production,
				accessors: true
			},
			emitCss: false
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		css({ output: `${component}.css` }),
		terser()
	],
	watch: {
		clearScreen: false
	}
}));

export default config;
