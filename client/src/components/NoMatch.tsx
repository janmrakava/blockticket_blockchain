import { Grid, Typography } from '@mui/material';

const NoMatch: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: '1228px',
        color: '#fff',
        margin: '0 auto',
        marginTop: '100px',
        marginBottom: '100px'
      }}>
      <Grid item xs={12} md={12} lg={12} sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: '800' }}>
          Požadovanou stránku se nepovedlo nalézt. Omlouváme se a doufám, že další průzkum naší
          aplikace se obejde bez podobných chyb.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoMatch;
