import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import UserSettingsMenu from '../components/UserSettings/UserSettingsMenu';

const TicketInfo: React.FC = () => {
  const { eventID, ticketID } = useParams();
  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        color: '#fff',
        flexDirection: 'column',
        margin: '0 auto'
      }}>
      <UserSettingsMenu active="mytickets" />

      <Grid item xs={12} md={12} lg={12} sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <h1>Info o vstupence s id</h1>
        <p>TICKET ID: {ticketID}</p>
        <p>EVENT ID: {eventID}</p>
      </Grid>
    </Grid>
  );
};

export default TicketInfo;
