module.exports = {
	plugins: {
		'postcss-import': {}, // so we can use: <style lang="postcss"> @import '../app.css' </style>
		'tailwindcss/nesting': {},
		tailwindcss: {}, // so we can use: <style> @tailwind utilities;
		autoprefixer: {}
	}
};
