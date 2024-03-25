import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

export const TextFieldStyled = styled(TextField)`
  input {
    color: white;
  }
  label {
    color: white;
  }
`;
export const TicketsBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
