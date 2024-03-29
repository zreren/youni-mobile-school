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
      height:{
        px18:"18px",
        px1:"1px",
        px185:"185px"
      },
      padding:{
        0.25:"0.1rem"
      },
      width:{
        px18:"18px"
      },
      textColor: {
        darkYellow:'#D9A823',
        score1: '#D07775',
        score2: '#7D85C0',
        score3: '#6FAF6E',
        brown:"#8C6008",
        price:"#FF7978",
        priceGray:"#A9B0C0",
        score4: '#6CA6C1',
        score5: '#CB9A65',
        blueTitle: '#37455C',
        gold:"rgba(249, 230, 195, 1)",
        lightGray:"#DCDDE1",
        secondGray:"#A9B0C0",
        primary: '#FFD036',
      },
      backgroundColor: {
        primary: '#F7F8F9',
      },
      colors: {
        bg: '#f6f6f6',
        price:"#FF7978",
        userColor:"#798195",
        postContent:"#37455C",
        border:"rgb(247,248,249)",
        gold:"rgba(249, 230, 195, 1)",
        'light-yellow': '#f6f6f6',
      },
      fontFamily: {
        "pingFang":["pingFang"]
      },
      fontSize:{
        '8':'0.5rem',
        '10':"0.6rem",
        px10:"10px",
        '10':"0.6rem"
      },
      rotate:{
        "220":"235deg"
      }
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
};
