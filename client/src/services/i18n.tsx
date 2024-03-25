import { IntlProvider } from 'react-intl';
import { defaultLocale, locales } from './i18n-config';
import { type ReactNode, useState } from 'react';
import { LocaleContext } from './LocaleContext';

interface I18nProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function I18n(props: I18nProps) {
  const [locale, setLocale] = useState<string>(defaultLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={locales[locale].messages}
      >
        {props.children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
