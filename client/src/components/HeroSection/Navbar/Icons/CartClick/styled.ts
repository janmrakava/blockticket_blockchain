import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const IconButtonBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
export const CartBox = styled(Box)`
  position: absolute;
  top: 100%;
  width: 350px;
  margin-top: 10px;
  min-height: 200px;
  background-color: #131021;
  border: 1px solid #025ab3;
  border-radius: 10px;
  color: #fff;
`;
export const CartItemContainer = styled(Box)`
  display: flex;
  margin: 10px;
  gap: 20px;
`;
export const CartTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 20px;
  width: 50%;
`;
export const CartItemHeading = styled(Typography)`
  font-size: 15px;
`;
export const CartItemText = styled(Typography)`
  font-size: 12px;
`;
export const CartItemTextBolder = styled(CartItemText)`
  font-weight: 900;
`;
export const CartItemTextSmaller = styled(CartItemText)`
  font-size: 10px;
  color: #80797b;
`;
export const CartItemTextBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CartItemTextBoxForText = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50px;
`;
