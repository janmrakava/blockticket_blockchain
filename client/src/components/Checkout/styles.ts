import { Box } from '@mui/material';
import styled from 'styled-components';

interface ICardNumber {
  cardNumber: string;
}
export const PaymentBannerContainer = styled(Box)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
  min-width: 353px;
  height: 50px;
  background-color: ${(props) => (props.$active ? '#ffffff' : '#131021')};
  color: ${(props) => (props.$active ? '#06020f' : '#ffffff')};
  margin: 10px 20px;
`;
export const BankBannerContainer = styled(Box)<{ $active: boolean }>`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 40px;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? '#4b4958' : 'none')};

  &:hover {
    background-color: #4b4958;
  }
`;
export const PayBannerContainer = styled(Box)`
  margin: 20px;
  height: 100px;
  background: #4b4958;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
export const FormField = styled(Box)`
  position: relative;
  height: 80px;
  padding-top: 20px;
`;
export const CardNumberInput = styled.input<ICardNumber>`
  width: 100%;
  background: #4b4958
    url('${({ cardNumber }) =>
      cardNumber.startsWith('4')
        ? '/payment_methods/visa.png'
        : cardNumber.startsWith('2') || cardNumber.startsWith('5')
        ? '/payment_methods/mastercard.png'
        : ''}')
    right 10px center no-repeat;
  background-size: 25px;
  font-size: 14px;
  font-family: 'Lexend';
  border: none;
  margin-top: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  color: #80797b;
  &:focus {
    outline: none;
  }
`;

export const CartInputSmaller = styled.input`
  background: #4b4958;
  border: none;
  margin-top: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  color: #80797b;
  &:focus {
    outline: none;
  }
`;
