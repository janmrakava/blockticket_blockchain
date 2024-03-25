import React from 'react';

import { Grid, Typography } from '@mui/material';

import {
  LogoImg,
  LogoImgText,
  LogoImgTextMedium,
  LogoTypographyBig,
  LogoTypographyMedium
} from '../../../../styles/styles';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <>
      <Grid item xs={3} md={4} lg={4} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography>
            <LogoImg src="/logo.png" alt="TicketBlock Logo" />
          </Typography>
        </Link>
      </Grid>
      <Grid
        item
        xs={4}
        md={4}
        lg={4}
        sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'none' } }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LogoTypographyMedium>
            <LogoImgTextMedium src="/logo.png" alt="TicketBlock Logo" />
            TicketBlock
          </LogoTypographyMedium>
        </Link>
      </Grid>
      <Grid item xs={4} md={4} lg={4} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LogoTypographyBig>
            <LogoImgText src="/logo.png" alt="TicketBlock Logo" />
            TicketBlock
          </LogoTypographyBig>
        </Link>
      </Grid>
    </>
  );
};

export default Logo;
