import { Alert, Button, Input, Snackbar } from '@mui/material';
import { type ChangeEvent, memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { PromoCodeContainer } from './styled';

const InputPromo: React.FC = () => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [inputEntered, setInputEntered] = useState<boolean>(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPromoCode(event.target.value);
  };
  const handleInput = (): void => {
    if (promoCode.length > 0) {
      setInputEntered(true);
      setTimeout(() => {
        setInputEntered(false);
      }, 5000);
    }
  };

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return (
    <PromoCodeContainer>
      <Input
        placeholder={appLanguage === 'cs' ? 'Slevový kód' : 'Promo code'}
        sx={{ color: '#80797B', border: '1px solid #80797B', padding: '10px', width: '85%' }}
        value={promoCode}
        onChange={(event) => {
          handleChange(event);
        }}
      />
      <Button
        variant="outlined"
        sx={{ borderColor: '#80797B', color: '#80797B' }}
        onClick={handleInput}
      >
        <FormattedMessage id="app.cartpage.promoinput" />
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={inputEntered}
        autoHideDuration={5000}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {appLanguage === 'cs'
            ? `Tento promo kód - ${promoCode} - neexistuje!`
            : `This promo code - ${promoCode} - does not exist!`}
        </Alert>
      </Snackbar>
    </PromoCodeContainer>
  );
};

export const PromoInput = memo(InputPromo);
