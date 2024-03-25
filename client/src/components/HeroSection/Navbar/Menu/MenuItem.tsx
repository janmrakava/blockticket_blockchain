import React from 'react';
import { Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface IItemMenuProps {
  type: string;
}

const ItemMenu: React.FC<IItemMenuProps> = ({ type }) => {
  return (
    <Button>
      <Link to={`/events/${type}`} style={{ textDecoration: 'none' }}>
        <MenuItem sx={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
          <FormattedMessage id={`app.navigation.${type}`} />
        </MenuItem>
      </Link>
    </Button>
  );
};

export default ItemMenu;
