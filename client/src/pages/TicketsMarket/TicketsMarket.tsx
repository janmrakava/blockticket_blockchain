import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { getTicketsForSale } from '../../utils/smartContractFunctions/TicketContract';

const TicketsMarket: React.FC = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        Tržiště se vstupenkami
      </Grid>
    </Grid>
  );
};

export default TicketsMarket;
