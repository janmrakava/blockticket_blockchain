import { Grid, MenuItem, Button } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IHamburgerItemProps {
  type: string;
}

const HamburgerItem: React.FC<IHamburgerItemProps> = ({ type }) => {
  return (
    <Grid item xs={12} md={12} sm={12} lg={0}>
      <Button>
        <Link to={`/${type}`} style={{ textDecoration: 'none' }}>
          <MenuItem sx={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
            <FormattedMessage id={`app.navigation.${type}`} />
          </MenuItem>
        </Link>
      </Button>
    </Grid>
  );
};

export default HamburgerItem;
