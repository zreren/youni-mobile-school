const path = require("path");


module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'cn'],
        localeDetection: false,
        localePath: path.resolve("./public/locales"),
        defaultNS: 'common',
        // reloadOnPrerender: process.env.NODE_ENV === 'development',
        fallbackLng: ["en"],
        localeSubpaths:{      
          cn: 'cn',    
          en: 'en'  
        }
    },
}