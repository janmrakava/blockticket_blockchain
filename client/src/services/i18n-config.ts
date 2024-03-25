import enMessages from './locales/en-US.json';
import czMessages from './locales/cs-CZ.json';
import CZFlag from '../../public/CZ.png';
import ENFlag from '../../public/EN.png';
export const defaultLocale = 'cs';

interface LocaleData {
  name: string;
  img: string;
  messages: Record<string, string>;
}
type Locales = Record<string, LocaleData>;

export const locales: Locales = {
  cs: {
    name: 'Čeština',
    img: CZFlag,
    messages: czMessages
  },
  en: {
    name: 'English',
    img: ENFlag,
    messages: enMessages
  }
};
