import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledGridContainer = styled(Grid)`
  max-width: 1228px;
  margin: 0 auto;
  color: #fff;
  margin-bottom: 50px;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 200px;
`;

export const StyledForm = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-left: 20px;
`;
export const StyledGridForm = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
`;
