/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useTicketVerification } from './useTicketVerification';
import { StyledForm, StyledGridContainer, StyledGridForm } from './styled';

const TicketVerification: React.FC = () => {
  const {
    appLanguage,
    handleChange,
    handleSubmit,
    ticketID,
    isTicketValid,
    txArr,
    renderTicketInfo
  } = useTicketVerification();
  console.log(txArr);

  return (
    <StyledGridContainer container>
      <Grid item xs={12} md={12} lg={12} sx={{ marginTop: '50px' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 900, padding: '20px' }}>
          Ověření vstupenky
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '18px', fontWeight: 400, padding: '20px' }}>
          Vítejte na stránce pro ověření vstupenek. Zde můžete snadno zkontrolovat platnost vaší
          vstupenky zadáním jejího ID čísla do níže uvedeného pole. Stačí vložit číslo vstupenky a
          kliknout na tlačítko &#34;Ověřit&#34;, abychom pro vás mohli okamžitě zkontrolovat její
          stav a platnost. Děkujeme, že využíváte naše služby!{' '}
        </Typography>
      </Grid>
      <StyledGridForm item xs={12} md={12} lg={8} sx={{}}>
        <StyledForm
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}>
          <TextField
            label={appLanguage === 'cs' ? 'ID Vstupenky' : 'Ticket ID'}
            variant="filled"
            value={ticketID}
            placeholder={appLanguage === 'cs' ? 'ID Vstupenky' : 'ID Ticket'}
            name="eventName"
            type="text"
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px' }}
            InputProps={{
              style: { color: '#80797B' }
            }}
            fullWidth
          />
          <Button type="submit" variant="contained">
            {appLanguage === 'cs' ? 'Ověřit vstupenku' : 'Verify Ticket'}
          </Button>
        </StyledForm>
      </StyledGridForm>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 400,
            padding: '20px'
          }}>
          Vstupenka je:{' '}
          <span style={{ color: isTicketValid ? 'green' : 'red', fontWeight: '900' }}>
            {isTicketValid ? 'platná' : 'neplatná'}
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 900,
            padding: '20px'
          }}>
          Informace o vstupence
        </Typography>
        <Box sx={{ marginLeft: '20px' }}>
          {!isTicketValid ? <div>Neplatná vstupenka</div> : renderTicketInfo}
        </Box>
      </Grid>
    </StyledGridContainer>
  );
};

export default TicketVerification;
