/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      // "light",
      {
        mytheme: {
          primary: '#FFD036',

          secondary: '#FF7978',

          accent: '#3686FF',

          neutral: 'rgba(27, 36, 52, 0.05)',

          'base-100': '#FFFFFF',

          info: '#8CCAC1',

          success: '#9CB686',

          warning: '#FFD261',

          error: '#FC9783',
        },
      },
    ],
  },
  theme: {
    extend: {
      textColor: {
        score1: '#D07775',
        score2: '#7D85C0',
        score3: '#6FAF6E',
        score4: '#6CA6C1',
        score5: '#CB9A65',
        blueTitle: '#37455C',
        gold:"rgba(249, 230, 195, 1)",
      },
      colors: {
        bg: '#f6f6f6',
        gold:"rgba(249, 230, 195, 1)",
        'light-yellow': '#f6f6f6',
      },
      fontFamily: {
        "pingFang":["pingFang"]
      },
      fontSize:{
        '8':'0.5rem',
        '10':"0.6rem"
      }
    },
  },
  plugins: [require('daisyui')],
};
