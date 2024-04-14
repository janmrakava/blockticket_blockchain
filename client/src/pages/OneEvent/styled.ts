import { Box, Divider, Typography } from '@mui/material';
import styled from 'styled-components';

export const EventInfoBoxText = styled(Box)`
  font-size: 25px;
  font-weight: 400;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;

export const PegiContainer = styled(Box)`
  width: 128px;
  background-color: #131021;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  padding: 5px;
`;
export const GetTicketsContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ff0051;
  border-radius: 20px;
  margin-top: 20px;
  padding: 0 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const EventDescriptionDivider = styled(Divider)`
  background: #80797b;
  margin-top: 10px;
`;
export const EventDescriptionSectionHeading = styled(Typography)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 5px;
  font-family: 'Lexend';
`;
export const EventDescriptionSectionText = styled(Typography)`
  margin-top: 15px;
  color: #80797b;
  font-size: 15px;
  font-family: 'Lexend';
`;

export const SimilarEventsHeading = styled(Typography)`
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 8.5px;
  text-transform: uppercase;
  margin-top: 20px;
`;
