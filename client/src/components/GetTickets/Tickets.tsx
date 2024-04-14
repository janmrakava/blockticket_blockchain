/* eslint-disable react/prop-types */
import { Box, Divider, Grid } from '@mui/material';
import { memo } from 'react';

import { FormattedMessage } from 'react-intl';

const TicketsBanner: React.FC<ITicketsProps> = ({ ticketPrice, numberOfTickets }) => {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <h1>
        <FormattedMessage id="app.gettickets.ticketsHeading" />
      </h1>
      <Divider sx={{ background: '#80797B', marginTop: '10px' }} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
        <Box>
          <p style={{ fontWeight: '900' }}>Název vstupenky</p>
          <p style={{ marginTop: '20px' }}>Standardní vstupenka</p>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ fontWeight: '900' }}>Cena</p>
          <p style={{ marginTop: '20px' }}>{ticketPrice?.toString()}</p>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ fontWeight: '900' }}>Počet dostupných vstupenek</p>
          <p style={{ marginTop: '20px' }}>{numberOfTickets?.toString()}</p>
        </Box>
      </Box>
    </Grid>
  );
};

export const Tickets = memo(TicketsBanner);
