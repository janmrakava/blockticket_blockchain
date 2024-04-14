/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { memo } from 'react';
import {
  CartItemContainer,
  CartItemHeading,
  CartItemText,
  CartItemTextBox,
  CartItemTextBoxForText,
  CartItemTextSmaller,
  CartTextContainer
} from './styled';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../../../pages/store';
import { countDate } from '../../../../../utils/function';

const CartItem: React.FC<ICartItemProps> = ({ artist, imgSrc, date, quantity, ticketType }) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const renderDate = countDate(date);
  return (
    <CartItemContainer>
      <Box>
        <img src={imgSrc} alt="Image of event" style={{ height: '100px' }} />
      </Box>
      <CartTextContainer>
        <CartItemHeading sx={{ fontWeight: 800 }}>
          {appLanguage === 'cs' ? artist.cs : artist.en}
        </CartItemHeading>
        <CartItemText>{renderDate}</CartItemText>
        <CartItemTextBox>
          <CartItemTextBoxForText>
            <CartItemTextSmaller>{ticketType}</CartItemTextSmaller>
          </CartItemTextBoxForText>
          <CartItemTextBoxForText>
            <CartItemTextSmaller>{quantity}x</CartItemTextSmaller>
          </CartItemTextBoxForText>
        </CartItemTextBox>
      </CartTextContainer>
    </CartItemContainer>
  );
};

export const ItemCart = memo(CartItem);
