/* eslint-disable react/prop-types */
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PayBannerContainer } from './styles';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';

const BannerToPay: React.FC<IPayBannerProps> = ({ type }) => {
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const handleClick = (): void => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 5000);
  };

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return (
    <PayBannerContainer onClick={handleClick}>
      <Box>
        <Typography sx={{ fontSize: '15px', fontWeight: 800, marginBottom: '10px' }}>
          <FormattedMessage id={`app.checkoutpage.${type}`} />
        </Typography>
        <Typography sx={{ fontSize: '12px' }}>
          <FormattedMessage id={`app.checkoutpage.${type}text`} />
        </Typography>
      </Box>
      <img src={`/payment_methods/${type}_color.png`} alt="Image of method payment" />
      <Snackbar
        open={showSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {appLanguage === 'cs'
            ? 'Platební metoda v současný okamžik nefunguje'
            : 'The payment method does not work at the moment'}
        </Alert>
      </Snackbar>
    </PayBannerContainer>
  );
};

export const PayBanner = memo(BannerToPay);
