// compile individual components into their own es modules
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { globbySync } from 'globby';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const production = !process.env.ROLLUP_WATCH;
const formats = ['es'];
const compPath = 'src/lib/components';

// build a list of components to individually compile
const components = globbySync([
	'src/lib/components/**/*.svelte', // include all svelte components
	'!src/lib/components/**/_**/*.svelte', // exclude sub-components
	'!src/lib/components/**/_*.svelte' // exclude sub-components
]).map((path) => ({
	// get the folder preceding the file name
	namespace: path.split('/')[path.split('/').length - 2],
	component: path.split('/')[path.split('/').length - 1]
}));

const config = components.map(({ namespace, component }) => ({
	input: `src/lib/components/${namespace}/${component}`,
	output: {
		file: `compiled/${namespace}/${component.replace('.js', '')}.js`,
		format: 'es',
		inlineDynamicImports: true
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: false,
				// postcss: true,
				postcss: {
					configFilePath: path.resolve(__dirname, './postcss.config.js'),
					prependData: `@import '${path.resolve('./src/lib/app.css')}';`
				}
			}),
			compilerOptions: {
				dev: false,
				accessors: true,
				css: true,
				cssHash: ({ hash, css }) =>
					`svelte-${hash(css + '' + component)}-${component.replace('.svelte', '')}`
			},
			emitCss: false
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		copy({
			targets: [
				{
					src: 'src/lib/components/@peerpiper/index.js',
					dest: 'compiled/@peerpiper/'
				}
			]
		})
		// css({ output: `${component.replace('.js', '')}.css` })
		// terser()
	],
	watch: {
		clearScreen: false
	}
}));

export default config;
