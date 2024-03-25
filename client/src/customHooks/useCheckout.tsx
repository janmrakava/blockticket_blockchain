import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../pages/store';
import { Divider } from '@mui/material';
import { PaymentBanner } from '../components/Checkout/PaymentBanner';

export const useCheckout = (): any => {
  const [activeMethod, setActiveMethod] = useState<string>('card');
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const changePaymentMethod = (type: string): void => {
    setActiveMethod(type);
  };
  const paymentMethods = ['card', 'banktransfer', 'paypal', 'applepay', 'googlepay'];

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
  const renderPaymentMethods = paymentMethods.map((method, index) => {
    return (
      <>
        <PaymentBanner
          type={method}
          active={method === activeMethod}
          key={index}
          onClick={() => {
            changePaymentMethod(method);
          }}
        />
        <Divider sx={{ background: '#80797B', margin: '0 20px' }} />
      </>
    );
  });

  return {
    activeMethod,
    changePaymentMethod,
    renderPaymentMethods,
    price,
    cart
  };
};
