import { createContext } from 'react';

export const LocaleContext = createContext<{
  locale: string;
  setLocale: (lang: string) => void;
}>({
  locale: 'cs',
  setLocale: (lang) => {
    console.warn(`LocaleContext setLocale is not implemented for locale: ${lang}`);
  }
});
