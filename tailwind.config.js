/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    container: {
      center: true,
      padding: '150px',
    },
    fontFamily: {
      serif: ['Roboto'],
      sans: ['Roboto'],
    },
    colors: {
      uygur: '#549DE2',
      // uygur: '#2d90ed',
      intro: 'rgba(0,0,0,.4)',
      white: '#FEFEFE',
      black: '#020617',
    },
    extend: {
      backgroundImage: {
        'intro-img': "url('./public/mucams.jpeg')",
        ittipak: "url('./public/ittipak_page-0001.jpg')",
      },
    },
  },
  plugins: [],
}
