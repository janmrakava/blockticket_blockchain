import { Box, CircularProgress } from '@mui/material';

const PaymentProcessLoader: React.FC = () => {
  return (
    <Box
      sx={{
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
        width: '100%',
        minHeight: '550px',
        gap: '30px'
      }}>
      <h1>Platba se zpracovává</h1>
      <CircularProgress size="200px" />
    </Box>
  );
};

export default PaymentProcessLoader;
