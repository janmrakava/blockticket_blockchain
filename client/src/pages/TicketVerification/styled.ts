import { Box, Grid } from '@mui/material';
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
export const StyledContainerTicketInfo = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #80797b;
`;
export const StyledContainerButtonTicket = styled(StyledContainerTicketInfo)`
  justify-content: flex-end;
  border: none;
`;
export const StyledContainerTransaction = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: #80797b 0px 0px 0px 3px;
  padding: 20px;
  gap: 10px;
`;
