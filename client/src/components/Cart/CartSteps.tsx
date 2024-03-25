/* eslint-disable react/prop-types */
import { Box, Divider } from '@mui/material';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { NumberStep } from './NumberStep';
import { CartStepsContainer, TypographyStepName } from './styled';

const StepsCart: React.FC<ICartStepsProps> = ({ active }) => {
  return (
    <CartStepsContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NumberStep number={1} active={active === 'review'} />
        <TypographyStepName
          sx={{ fontSize: '25px', fontWeight: 800 }}
          $active={active === 'review'}>
          <FormattedMessage id="app.cartpage.reviewcart" />
        </TypographyStepName>
      </Box>
      <Divider sx={{ background: '#80797B', width: '10%' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NumberStep number={2} active={active === 'payment'} />
        <TypographyStepName
          sx={{ fontSize: '25px', fontWeight: 800 }}
          $active={active === 'payment'}>
          <FormattedMessage id="app.cartpage.paymentmethod" />
        </TypographyStepName>
      </Box>
      <Divider sx={{ background: '#80797B', width: '10%' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NumberStep number={3} active={active === 'confirmation'} />
        <TypographyStepName
          sx={{ fontSize: '25px', fontWeight: 800 }}
          $active={active === 'confirmation'}>
          <FormattedMessage id="app.cartpage.confirmation" />
        </TypographyStepName>
      </Box>
    </CartStepsContainer>
  );
};

export const CartSteps = memo(StepsCart);
