import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

export const TypographyStep = styled(Typography)<{ $active: boolean }>`
  border: ${(props) => (props.$active ? '1px solid #017CCC' : '1px solid #FFFFFF')};
  color: ${(props) => (props.$active ? '#017ccc' : '#ffffff')};
  border-radius: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartStepsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 121px;
  margin: 20px;
  padding: 20px;
  background-color: #06020f;
`;
export const TypographyStepName = styled(Typography)<{ $active: boolean }>`
  color: ${(props) => (props.$active ? '#017ccc' : '#ffffff')};
`;
export const PromoCodeContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px;
  max-width: 800px;
`;
export const CashOutContainer = styled(Box)`
  padding: 20px;
  margin: 20px;
  border: 1px solid #80797b;
`;
export const CashOutSectionContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
