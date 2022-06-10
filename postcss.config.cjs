module.exports = {
	plugins: {
		'postcss-import': {}, // so we can use: <style> @import '../app.css' </style>
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {}
	}
};
