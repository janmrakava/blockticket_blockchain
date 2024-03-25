import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const LogoRegister: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src="/logo.png" alt="Logo of TicketBlock" style={{ width: '100px', height: '100px' }} />

      <Typography sx={{ fontSize: '40px', fontWeight: 900 }}>TicketBlock</Typography>
    </Box>
  );
};

export const RegisterLogo = memo(LogoRegister);
