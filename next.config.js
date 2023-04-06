/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const { i18n } = require('./next-i18next.config')


// const NextI18Next = require('next-i18next').default;

// const i18Next = new NextI18Next({
//   // Specify the languages you want to support
//   defaultLanguage: 'en',
//   otherLanguages: ['cn'],

//   // Specify the location of your translation files
//   localePath: typeof window === 'undefined' ? 'public/locales' : 'locales'
// });

const withSvgr = require('next-svgr');
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  'react-vant',
  'antd-mobile',
  "masonic",
]);

module.exports = withPlugins([
  withTM,
  withSvgr,
  {
    images: {
      domains: ['fakeimg.pl',
        'goflash.pincman.com', "source.unsplash.com", 'youni-admin.kuizuo.cn',
        'dummyimage.com'
      ],
    },
    compiler: {
      styledComponents: true,
    },
    i18n:i18n.i18n
  },
]);
