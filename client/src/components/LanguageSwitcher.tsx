import { useContext } from 'react';
import { locales } from '../services/i18n-config';
import { LocaleContext } from '../services/LocaleContext';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useContext(LocaleContext);
  const languageOptions = Object.keys(locales).map((local) => {
    const { name, img } = locales[local];
    return (
      <MenuItem key={local} value={local} onClick={() => handleChange(local)}>
        <img src={img} alt={name} style={{ marginRight: '8px', height: '24px' }} />
        {name}
      </MenuItem>
    );
  });

  const handleChange = (lang: string) => {
    setLocale(lang);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select label="čus" value={locale} sx={{ height: 40 }}>
        {languageOptions}
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
