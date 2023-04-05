const path = require("path");


module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'cn'],
        localeDetection: false,
        localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
        defaultNS: 'common',

    },
}