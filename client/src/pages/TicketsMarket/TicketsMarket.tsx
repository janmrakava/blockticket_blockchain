/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import { useTicketMarkets } from './useTicketsMarket';
import { type ITicketFromContract } from '../../customHooks/useMyTickets';
import { convertToDate } from '../../utils/function';

const TicketsMarket: React.FC = () => {
  const { ticketsForSale, events, isError, isLoading } = useTicketMarkets();

  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: '1228px', color: '#fff', margin: '0 auto', marginBottom: '200px' }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '30px', fontWeight: 900, padding: '20px' }}>
          Tržiště se vstupenkami
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          ticketsForSale.map((ticket: ITicketFromContract, index: number) => {
            const event = events[ticket.ticketID];

            const convertedDate = convertToDate(event?.dateOfEvent);
            const renderDate = `${convertedDate.getDate()}.${
              convertedDate.getMonth() + 1
            }.${convertedDate.getFullYear()}`;
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  boxShadow: '#80797b 0px 0px 0px 3px',
                  padding: '20px'
                }}>
                <Box>
                  <img src={event?.eventImage} alt="Image of event" style={{ height: '200px' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: '200px'
                  }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '800' }}>
                    {event?.eventName}
                  </Typography>
                  <Typography>Datum konání akce: {renderDate}</Typography>
                  <Typography>ID Vstupenky: {ticket?.ticketID}</Typography>
                  <Typography>Adresa vlastníka: {ticket?.ticketOwner}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between'
                    }}>
                    <Typography>Cena za koupi: {ticket?.salePrice.toString()} CZK</Typography>
                    <Button variant="contained" color="success">
                      Koupit za {ticket?.salePrice.toString()} CZK
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Grid>
    </Grid>
  );
};

export default TicketsMarket;
