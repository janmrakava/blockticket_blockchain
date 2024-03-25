import { Box, Button, Divider, Typography } from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { FormattedMessage } from 'react-intl';
import { CartBox, IconButtonBox } from './styled';
import { ItemCart } from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../../../pages/store';

const iconStyle = {
  color: '#fff',
  fontSize: '30px'
};

const CartClick: React.FC<ICartClick> = ({ isXs }) => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);

  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);

  const navigateToCart = (): void => {
    navigate('/cart');
  };

  const handleCartClick = (): void => {
    if (isXs) {
      navigateToCart();
    } else {
      setShowCart((prev) => !prev);
    }
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (cartRef.current != null && !cartRef.current.contains(e.target as Node)) {
      handleCartClick();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <IconButtonBox>
      <Button onClick={handleCartClick}>
        <ShoppingBasketIcon style={iconStyle} />
      </Button>
      {showCart && (
        <CartBox ref={cartRef}>
          <Typography
            sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', padding: '20px' }}>
            <FormattedMessage id="app.reviewcart.heading" />
          </Typography>
          <Divider sx={{ background: '#80797b', margin: '0 10px' }} />
          {cart.map((item, index) => {
            return (
              <Box key={index}>
                <ItemCart
                  artist={item.name}
                  imgSrc={item.imageSrc}
                  date={item.date}
                  quantity={item.quantity}
                  ticketType={item.ticketType}
                />
                <Divider sx={{ background: '#80797b', margin: '0 10px' }} />
              </Box>
            );
          })}

          <Divider sx={{ background: '#80797b', margin: '0 10px' }} />
          <Box sx={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={navigateToCart}>
              <FormattedMessage id="app.cartclick.showbasket" />
            </Button>
          </Box>
        </CartBox>
      )}
    </IconButtonBox>
  );
};

export const CartReview = memo(CartClick);
