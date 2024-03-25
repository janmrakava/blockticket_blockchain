/* eslint-disable react/prop-types */
import { Box, Button, Divider, Typography } from '@mui/material';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { CashOutContainer, CashOutSectionContainer } from './styled';
import { useNavigate } from 'react-router-dom';

const Cash: React.FC<ICashOutProps> = ({ sumPrice, discount, showButton }) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/checkout');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CashOutContainer
        sx={{
          float: {
            xs: 'center',
            md: 'right',
            lg: 'right'
          }
        }}
      >
        <h1>
          <FormattedMessage id="app.cartpage.cashoutheading" />
        </h1>
        <CashOutSectionContainer>
          <Typography sx={{ fontSize: { xs: '12px', md: '13px', lg: '15px' } }}>
            <FormattedMessage id="app.cartpage.subtotal" />
          </Typography>
          <Typography>
            {sumPrice} {appLanguage === 'cs' ? 'CZK' : 'EUR'}
          </Typography>
        </CashOutSectionContainer>
        <CashOutSectionContainer>
          <Typography sx={{ fontSize: { xs: '12px', md: '13px', lg: '15px' } }}>
            <FormattedMessage id="app.cartpage.discount" />
          </Typography>
          <Typography>
            {discount} {appLanguage === 'cs' ? 'CZK' : 'EUR'}
          </Typography>
        </CashOutSectionContainer>
        <Divider sx={{ background: '#80797B', marginTop: '20px' }} />
        <CashOutSectionContainer>
          <Typography sx={{ fontSize: { xs: '12px', md: '13px', lg: '15px' } }}>
            <FormattedMessage id="app.cartpage.total" />
          </Typography>
          <Typography>
            {sumPrice + discount} {appLanguage === 'cs' ? 'CZK' : 'EUR'}
          </Typography>
        </CashOutSectionContainer>
      </CashOutContainer>
      {showButton && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end', lg: 'flex-end' }
          }}
        >
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              padding: '10px 20px',
              width: '200px',
              margin: '20px'
            }}
          >
            <FormattedMessage id="app.cartpage.checkout" />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const CashOut = memo(Cash);
