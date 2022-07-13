/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				toxic: '#0eff02'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
