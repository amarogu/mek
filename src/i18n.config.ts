export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'fr', 'it', 'de', 'es']
} as const;

export type Locale = (typeof i18n)['locales'][number] 