import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SupportGrid = styled(Grid)`
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 1228px;
`;

export const UserSettingsMenuGrid = styled(Grid)`
  border: 1px solid #80797b;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: space-around;
  max-width: 1228px;
  margin: 0 auto;

  & > div {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
  }

  @media (max-width: 600px) {
    & > div {
      flex-wrap: nowrap;
    }
  }
  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #80797b;
    border-radius: 1px;
  }

  &::-webkit-scrollbar-track {
    background-color: #afafbd;
    border-radius: 1px;
  }
`;

export const SupportBannerGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 353px;
  height: 178px;
  border: 1px solid #80797b;
  gap: 20px;
`;

export const SupportBannerHeading = styled(Typography)`
  font-size: 15px;
  font-family: 'Lexend';
  font-weight: 800;
`;

export const SupportBannerText = styled(Typography)`
  font-size: 10px;
  font-family: 'Lexend';
  margin-bottom: 20px;
  color: #80797b;
`;
