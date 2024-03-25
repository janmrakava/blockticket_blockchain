/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { CartSteps } from '../components/Cart/CartSteps';

import { DetailContact } from '../components/Checkout/ContactDetail';
import { CheckoutEventBanner } from '../components/Checkout/EventBannerCheckout';
import { PromoInput } from '../components/Cart/PromoInput';
import { CashOut } from '../components/Cart/Cashout';
import { CardBanner } from '../components/Checkout/CardInput';
import { BankTransferBanner } from '../components/Checkout/BankTransferBanner';
import { PayBanner } from '../components/Checkout/PayBanner';

import { useCheckout } from '../customHooks/useCheckout';
import PaymentProcessLoader from '../components/Checkout/PaymentProcessLoader';
import { useState } from 'react';

const Checkout: React.FC = () => {
  const { activeMethod, renderPaymentMethods, price, cart, userInfo } = useCheckout();

  const [paymentInProcess, setShowPaymentInProcess] = useState<boolean>(false);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      sx={{ color: '#ffffff', maxWidth: '1228px', margin: '0 auto', marginBottom: '100px' }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '40px', fontWeight: 900, padding: '20px' }}>
          <FormattedMessage id="app.checkoutpage.heading" />
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {isMd && (
          <Grid item md={12} lg={12}>
            <CartSteps active="payment" />
          </Grid>
        )}
        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </Grid>
      {paymentInProcess ? (
        <PaymentProcessLoader />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row-reverse', lg: 'row-reverse' },
            alignItems: 'flex-start',
            width: '100%'
          }}>
          {isXs && <Divider sx={{ background: '#80797B', margin: '0 20px' }} />}
          <Grid item xs={12} md={12} lg={12} sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 900, padding: '20px', width: '100%' }}>
              <FormattedMessage id="app.checkoutpage.contactinfo" />
            </Typography>
            {userInfo && (
              <DetailContact
                firstName={userInfo.first_name}
                lastName={userInfo.last_name}
                email={userInfo.email}
                telNumber={userInfo.tel_number}
              />
            )}

            <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
            <Typography sx={{ fontSize: '20px', fontWeight: 900, padding: '20px' }}>
              <FormattedMessage id="app.checkoutpage.orderreview" />
            </Typography>
            {cart.map(
              (
                item: {
                  name: { cs: string; en: string };
                  imageSrc: string;
                  ticketType: string;
                  quantity: number;
                  prices: { USD: number; EUR: number; CZK: number };
                },
                index: number
              ) => {
                return (
                  <>
                    <CheckoutEventBanner
                      key={index}
                      artist={item.name}
                      imgSrc={item.imageSrc}
                      typeTicket={item.ticketType}
                      quantity={item.quantity}
                      prices={item.prices}
                    />
                    {index !== cart.length - 1 && (
                      <Divider sx={{ background: '#80797B', margin: '0 40px' }} />
                    )}
                  </>
                );
              }
            )}

            <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
            <PromoInput />
            <Box sx={{ marginTop: '40px' }}>
              <CashOut discount={0} sumPrice={price} showButton={false} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}>
            {isXs && <Divider sx={{ background: '#80797B', margin: '0 20px' }} />}
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 900, padding: '20px 20px 10px 20px' }}>
              <FormattedMessage id="app.checkoutpage.paymentmethodheading" />
            </Typography>

            {renderPaymentMethods}
            {activeMethod === 'card' && (
              <CardBanner setShowPaymentInProcess={setShowPaymentInProcess} price={price} />
            )}
            {activeMethod === 'banktransfer' && <BankTransferBanner />}
            {activeMethod === 'paypal' && <PayBanner type="paypal" />}
            {activeMethod === 'applepay' && <PayBanner type="applepay" />}
            {activeMethod === 'googlepay' && <PayBanner type="googlepay" />}
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default Checkout;
