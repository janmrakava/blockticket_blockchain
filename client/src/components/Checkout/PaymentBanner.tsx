/* eslint-disable react/prop-types */
import { memo } from 'react';
import { PaymentBannerContainer } from './styles';
import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const BannerPayment: React.FC<IPaymentBannerProps> = ({ type, active, onClick }) => {
  const handleClick = (type: string): void => {
    onClick(type);
  };

  const imgSrc = active ? `/payment_methods/${type}dark.png` : `/payment_methods/${type}.png`;
  return (
    <PaymentBannerContainer
      $active={active}
      onClick={() => {
        handleClick(type);
      }}
    >
      <img src={imgSrc} style={{ width: '30px', height: '30px' }} />
      <Typography sx={{ fontSize: '15px' }}>
        <FormattedMessage id={`app.checkoutpage.${type}`} />
      </Typography>
    </PaymentBannerContainer>
  );
};

export const PaymentBanner = memo(BannerPayment);
