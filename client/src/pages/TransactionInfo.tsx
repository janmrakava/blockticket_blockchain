import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import UserSettingsMenu from '../components/UserSettings/UserSettingsMenu';

const TransactionInfo: React.FC = () => {
  const { transactionID } = useParams();
  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        color: '#fff',
        flexDirection: 'column',
        margin: '0 auto'
      }}>
      <UserSettingsMenu active="previousorders" />

      <Grid item xs={12} md={12} lg={12} sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <h1>Info o transakci s id</h1>
        <p>ID: {transactionID}</p>
      </Grid>
    </Grid>
  );
};

export default TransactionInfo;
