import React from 'react';
import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { UserClickLink } from '../../../../../styles/styles';

interface IUserClickItem {
  text: string;
  imgSrc: string;
  logout?: () => void;
}

const UserClickItem: React.FC<IUserClickItem> = ({ text, imgSrc, logout }) => {
  return (
    <>
      <Typography variant="h5" sx={{ margin: '10px 0', fontSize: '18px' }}>
        <UserClickLink to={`/${text}`}>
          <img src={imgSrc} alt="Settings icon" style={{ width: '24px', height: '24px' }} />
          <FormattedMessage id={`app.userClick.${text}`} />
        </UserClickLink>
      </Typography>
    </>
  );
};

export default UserClickItem;
