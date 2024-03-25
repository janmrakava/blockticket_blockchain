/* eslint-disable react/prop-types */
import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const ResultRegistration: React.FC<IResultRegistrationProps> = ({
  result,
  handleResetRegistration
}) => {
  const navigate = useNavigate();

  const handleHomePage = (): void => {
    navigate('/');
  };
  const handleFailedRegistraion = (): void => {
    handleResetRegistration();
  };
  return (
    <>
      {result && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px'
          }}
        >
          <Typography sx={{ fontSize: '23px', fontWeight: 800 }}>Úspěšná registrace</Typography>
          <img
            src="/complete_order/succesfull.png"
            alt="Image of successfull registration"
            style={{ width: '250px' }}
          />
          <Typography sx={{ fontSize: '30px', fontWeight: 800 }}>
            <FormattedMessage id="app.registerpage.youareregistered" />
          </Typography>
          <Typography>
            <FormattedMessage id="app.registerpage.introtext" />
          </Typography>
          <Button variant="contained" onClick={handleHomePage}>
            <FormattedMessage id="app.registerpage.succesfull" />
          </Button>
        </Box>
      )}
      {!result && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {' '}
          <Typography sx={{ fontSize: '23px', fontWeight: 800 }}>Neúspěšná registrace</Typography>
          <img
            src="/complete_order/wrong.png"
            alt="Image of unsuccessfull registration"
            style={{ width: '250px' }}
          />
          <Typography sx={{ fontSize: '30px', fontWeight: 800 }}>
            <FormattedMessage id="app.registerpage.registrationfailed" />
          </Typography>
          <Typography>
            <FormattedMessage id="app.registerpage.registrationfailedtext" />
          </Typography>
          <Button variant="contained" onClick={handleFailedRegistraion} sx={{ marginTop: '20px' }}>
            <FormattedMessage id="app.registerpage.repeat" />
          </Button>
        </Box>
      )}
    </>
  );
};

export const RegistrationResult = memo(ResultRegistration);
