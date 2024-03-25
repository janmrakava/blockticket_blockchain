import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import LogoutImg from '../../../../../../public/icons_imgs/Logout.png';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const LogoutItem: React.FC = () => {
  const cookies = new Cookies();
  const token = cookies.get('authToken');
  const navigate = useNavigate();
  const handleLogOut = (): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      cookies.remove('authToken');
      navigate(0);
    }
  };
  return (
    <Box onClick={handleLogOut} sx={{ cursor: 'pointer' }}>
      <Typography
        variant="h5"
        sx={{
          margin: '10px 0',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
        <img src={LogoutImg} alt="Settings icon" style={{ width: '24px', height: '24px' }} />
        <FormattedMessage id={`app.userClick.logout`} />
      </Typography>
    </Box>
  );
};

export default LogoutItem;
