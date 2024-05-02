/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import { useTicketMarkets } from './useTicketsMarket';
import { type ITicketFromContract } from '../../customHooks/useMyTickets';
import { convertToDate } from '../../utils/function';
import { StyledContainerButton, StyledTicketContainer, StyledTicketTextContainer } from './styled';

const TicketsMarket: React.FC = () => {
  const { account, ticketsForSale, events, isLoading, handleClickBuyButton } = useTicketMarkets();

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
        {ticketsForSale?.length === 0 && <div>Nejsou dostupné žádné vstupenky ke koupi.</div>}
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
              <StyledTicketContainer key={index}>
                <Box>
                  <img src={event?.eventImage} alt="Image of event" style={{ height: '200px' }} />
                </Box>
                <StyledTicketTextContainer>
                  <Typography sx={{ fontSize: '25px', fontWeight: '800' }}>
                    {event?.eventName}
                  </Typography>
                  <Typography>Datum konání akce: {renderDate}</Typography>
                  <Typography>ID Vstupenky: {ticket?.ticketID}</Typography>
                  <Typography>Adresa vlastníka: {ticket?.ticketOwner}</Typography>
                  <StyledContainerButton>
                    <Typography>Cena za koupi: {ticket?.salePrice.toString()} CZK</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleClickBuyButton(ticket.ticketID, ticket.salePrice.toString(), account)
                      }>
                      Koupit za {ticket?.salePrice.toString()} CZK
                    </Button>
                  </StyledContainerButton>
                </StyledTicketTextContainer>
              </StyledTicketContainer>
            );
          })
        )}
      </Grid>
    </Grid>
  );
};

export default TicketsMarket;
