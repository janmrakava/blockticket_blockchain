import React from 'react';

import { Grid } from '@mui/material';

import ItemMenu from './MenuItem';
import { MenuTypography } from '../../../../styles/styles';

const Menu: React.FC = () => {
  return (
    <Grid item xs={5} md={5} lg={5} sx={{ display: { xs: 'none', sm: 'none', lg: 'block' } }}>
      <MenuTypography>
        <ItemMenu type="deals" />
        <ItemMenu type="music" />
        <ItemMenu type="sport" />
        <ItemMenu type="family" />
        <ItemMenu type="vip" />
        <ItemMenu type="art" />
      </MenuTypography>
    </Grid>
  );
};

export default Menu;
