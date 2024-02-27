import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const i18nConfig = {
    locales: ['en', 'pt', 'fr', 'it', 'de', 'es'],
    defaultLocale: 'en',
    prefixDefault: true,
    localeDetector: () => {
        let headers = { 'accept-language': 'en,pt,fr,it,de,es;q=0.5' };
        let languages = new Negotiator({ headers }).languages();
        let locales = ['en', 'pt', 'fr', 'it', 'de', 'es'];
        let defaultLocale = 'en';
        return match(languages, locales, defaultLocale)
    }
};
  
module.exports = i18nConfig;