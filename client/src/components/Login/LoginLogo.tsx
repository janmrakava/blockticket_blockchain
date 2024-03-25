import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const LoginLogo: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '50px'
      }}
    >
      <img src="/logo.png" alt="Logo of TicketBlock" style={{ width: '100px', height: '100px' }} />
      <Typography sx={{ fontSize: '40px', fontWeight: 900 }}>TicketBlock</Typography>
    </Box>
  );
};

export const LogoLogin = memo(LoginLogo);
