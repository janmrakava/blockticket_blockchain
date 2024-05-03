import { Box, Grid } from '@mui/material';
import styled from 'styled-components';

export const MyEventPageContainer = styled(Grid)`
  color: #fff;
  padding: 20px;
  max-width: 1228px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 70px;
  justify-content: center;
  padding-bottom: 100px;
`;

export const InfoEventContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 25px;
  gap: 100px;
  border-bottom: 1px solid #80797b;
`;

export const InfoEventContainerEventID = styled(InfoEventContainer)`
  gap: 20px;
`;

export const StyledContainerTickets = styled(Box)`
  padding: 20px;
  box-shadow: #80797B 0px 0px 0px 3px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledTicketItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
