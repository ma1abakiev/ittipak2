/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    container: {
      padding: '150px',
    },
    fontFamily: {
      serif: ['Roboto'],
      sans: ['Roboto'],
    },
    colors: {
      uygur: '#549DE2',
      white: '#FEFEFE',
      black: '#020617',
    },
    extend: {
      backgroundImage: {
        'intro-img': "url('./public/uygur.jpg')",
      },
    },
  },
  plugins: [],
}
