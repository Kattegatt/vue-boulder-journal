/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./public/**/*.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./index.html',
		'./src/**/*.{html,js}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['KyivRegion-Regular'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
