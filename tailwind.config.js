/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      screens: {
        'xs-max': { max: '320px' },
        'sm-max': { max: '480px' },
        'md-max': { max: '768px' },
        'lg-max': { max: '1024px' },
        'xl-max': { max: '1440px' },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '10px',
          'xs-max': '10px',
          'sm-max': '20px',
          'md-max': '50px',
          'lg-max': '100px',
          'xl-max': '150px',
        },

        screens: {
          'xs-max': '360px',
          'sm-max': '480px', // Full width for sm-max screens
          'md-max': '768px', // Full width for md-max screens
          'lg-max': '1024px', // Specific width for lg-max screens
          'xl-max': '1440px', // Specific width for xl-max screens
        },
      },
    },
    fontFamily: {
      serif: ['Roboto'],
      sans: ['Roboto'],
    },
    colors: {
      uygur: '#549DE2',
      intro: 'rgba(0,0,0,.4)',
      white: '#FEFEFE',
      black: '#020617',
    },
    backgroundImage: {
      'intro-img': "url('./public/mucams.jpeg')",
      ittipak: "url('./public/ittipak_page-0001.jpg')",
    },
  },
  plugins: [],
}
