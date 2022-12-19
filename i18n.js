module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'cn'],
    },
    localePath: typeof window === 'undefined' ? 'public/locales' : 'locales'
  }