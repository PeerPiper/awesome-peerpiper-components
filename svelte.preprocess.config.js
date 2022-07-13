// svelte.preprocess.config.js

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	sourceMap: process.env.NODE_ENV !== 'development',
	// scss: true,
	// postcss: true, // set postcss: true if postcss-load-config is installed and svelte-preprocess will look for a PostCSS config file in your project.,
	postcss: {
		configFilePath: path.resolve(__dirname, './postcss.config.js'),
		prependData: `@import '${path.resolve('./src/app.css')}';`
	},
	globalStyle: {} // enables us to have :global css
};
