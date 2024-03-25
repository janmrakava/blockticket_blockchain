/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { FormattedMessage } from 'react-intl';

const EventBannerCheckout: React.FC<IEventBannerCheckoutProps> = ({
  artist,
  imgSrc,
  prices,
  quantity,
  typeTicket
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const price = appLanguage === 'cs' ? quantity * prices.CZK : quantity * prices.EUR;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        justifyContent: 'space-between',
        minWidth: '353px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: { xs: '10px', md: '30px', lg: '50px' }
        }}
      >
        <Box>
          <img src={imgSrc} alt="Image of event" style={{ width: '100px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: { xs: '15px', md: '20px', lg: '25px' }, fontWeight: 800 }}>
            {appLanguage === 'cs' ? artist.cs : artist.en}
          </Typography>
          <Typography sx={{ fontSize: '15px', color: '#80797B' }}>{typeTicket}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ fontSize: { xs: '15px', md: '20px', lg: '20px' }, fontWeight: 400 }}>
          {price} {appLanguage === 'cs' ? 'CZK' : 'EUR'}
        </Typography>
        <Typography sx={{ fontSize: '15px', color: '#80797B' }}>
          <FormattedMessage id="app.checkoutpage.quantity" /> {quantity}
        </Typography>
      </Box>
    </Box>
  );
};

export const CheckoutEventBanner = memo(EventBannerCheckout);
