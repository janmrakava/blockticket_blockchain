import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { CartSteps } from '../components/Cart/CartSteps';
import { PromoInput } from '../components/Cart/PromoInput';
import { CashOut } from '../components/Cart/Cashout';
import { useSelector } from 'react-redux';
import { type RootState } from './store';
import { useEffect, useState } from 'react';
import CartReviewItem from '../components/Cart/CartReviewItem';

const Cart: React.FC = () => {
  const theme = useTheme();
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const [price, setPrice] = useState<number>(0);
  const cart = useSelector((state: RootState) => state.cart);

  const handleCountPrice = (): void => {
    const sumPrice = cart.reduce((accumulator, item) => {
      if (appLanguage === 'cs') {
        return accumulator + item.quantity * item.prices.CZK;
      } else {
        return accumulator + item.quantity * item.prices.EUR;
      }
    }, 0);

    setPrice(sumPrice);
  };

  useEffect(() => {
    handleCountPrice();
  }, [cart]);

  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid
      container
      sx={{
        color: '#fff',
        maxWidth: '1228px',
        margin: '0 auto'
      }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '40px', fontWeight: 900, padding: '20px' }}>
          <FormattedMessage id="app.cartpage.heading" />
        </Typography>
        {isMd && (
          <Grid item md={12} lg={12}>
            <CartSteps active="review" />
          </Grid>
        )}
        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        {cart.length === 0 ? (
          <Box sx={{ padding: '20px', textAlign: 'center', fontSize: '50px' }}>
            <FormattedMessage id="app.cartpage.emptycart" />
          </Box>
        ) : (
          cart.map((item, index) => {
            return (
              <CartReviewItem
                key={index}
                eventId={item.eventId}
                ticketType={item.ticketType}
                quantity={item.quantity}
                imageSrc={item.imageSrc}
                name={item.name}
                nameOfPlace={item.nameOfPlace}
                date={item.date}
                prices={item.prices}
                ticketName={item.ticketName}
                countPrice={handleCountPrice}
              />
            );
          })
        )}

        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PromoInput />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <CashOut sumPrice={price} discount={0} showButton={cart.length !== 0} />
      </Grid>
    </Grid>
  );
};

export default Cart;
