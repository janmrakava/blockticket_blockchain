/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import { memo } from 'react';
import { BankBannerContainer } from './styles';

const BannerBank: React.FC<IBankBannerProps> = ({ name, imgSrc, active, onClick }) => {
  return (
    <BankBannerContainer
      $active={active}
      onClick={() => {
        onClick(name);
      }}
    >
      <img
        src={`/bank_images/${imgSrc}`}
        alt="Bank of image - Moneta"
        style={{ width: '30px', marginLeft: '20px' }}
      />
      <Typography>{name}</Typography>
    </BankBannerContainer>
  );
};

export const BankBanner = memo(BannerBank);
