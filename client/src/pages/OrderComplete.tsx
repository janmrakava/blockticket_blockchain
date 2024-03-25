import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartSteps } from '../components/Cart/CartSteps';

const OrderComplete: React.FC = () => {
  const [orderResult, setOrderResult] = useState<boolean>(true);
  const location = useLocation();

  const navigate = useNavigate();
  const handleClick = (): void => {
    if (orderResult) {
      navigate('/events');
    } else {
      navigate('/support/paymentdelivery', { state: { text: 'paymentdelivery' } });
    }
  };

  useEffect(() => {
    const state = location.state.success;
    setOrderResult(state);
  }, []);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid container sx={{ color: '#ffffff', maxWidth: '1228px', margin: '0 auto' }}>
      <Grid item xs={12} md={12} lg={12}>
        {isMd && (
          <Grid item md={12} lg={12}>
            <CartSteps active="confirmation" />
          </Grid>
        )}
        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 800, padding: '20px' }}>
          {orderResult ? (
            <FormattedMessage id="app.ordercompletepage.succesfull" />
          ) : (
            <FormattedMessage id="app.ordercompletepage.failed" />
          )}
        </Typography>
        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 800, padding: '20px' }}>
          {orderResult ? (
            <FormattedMessage id="app.ordercompletepage.succesfulltext" />
          ) : (
            <FormattedMessage id="app.ordercompletepage.failedtext" />
          )}
        </Typography>
        <Box
          sx={{
            width: '350px',
            height: '350px',
            border: '1px solid #4B4958',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%'
          }}>
          <img
            src={orderResult ? '/complete_order/succesfull.png' : '/complete_order/wrong.png'}
            alt="Image of Succesfull order"
            style={{ width: '200px' }}
          />
        </Box>
        <Typography sx={{ marginTop: '20px', fontSize: '15px' }}>
          {orderResult ? (
            <FormattedMessage id="app.ordercompletepage.succesfullmoreinfotext" />
          ) : (
            <FormattedMessage id="app.ordercompletepage.failedmoreinfotext" />
          )}
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ margin: '20px', padding: '10px 40px', fontWeight: 800, fontSize: '18px' }}>
          {orderResult ? (
            <FormattedMessage id="app.ordercompletepage.succesfullbuttontext" />
          ) : (
            <FormattedMessage id="app.ordercompletepage.failedbuttontext" />
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderComplete;
