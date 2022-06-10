// compile individual components into their own es modules
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { globbySync } from 'globby';

const production = !process.env.ROLLUP_WATCH;
const formats = ['es'];
const compPath = 'src/lib/components';
const components = globbySync('src/lib/components/**/*.svelte').map((path) => ({
	// get the folder preceding the file name
	namespace: path.split('/')[path.split('/').length - 2],
	component: path.split('/')[path.split('/').length - 1]
}));

const config = components.map(({ namespace, component }) => ({
	input: `src/lib/components/${namespace}/${component}`,
	output: {
		file: `dist/${namespace}/${component}.js`,
		format: 'es'
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			},
			emitCss: false
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		terser()
	],
	watch: {
		clearScreen: false
	}
}));

export default config;
