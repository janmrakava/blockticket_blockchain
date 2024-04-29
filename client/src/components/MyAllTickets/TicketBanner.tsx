/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/prop-types */
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ITicketBannerProps {
  ticketID: string;
}

const MyTicketBanner: React.FC<ITicketBannerProps> = ({ ticketID }) => {
  const navigate = useNavigate();
  const handleClickMoreInfo = (): void => {
    navigate(`/myticket/${ticketID}`);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '#80797B 0px 0px 0px 3px'
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>ID Vstupenky </Typography>
        <Typography>{ticketID}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleClickMoreInfo}>
          Více informací o vstupence
        </Button>
      </Box>
    </Box>
  );
};

export default MyTicketBanner;
