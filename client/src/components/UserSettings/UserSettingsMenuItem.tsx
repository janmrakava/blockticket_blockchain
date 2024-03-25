/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IUserSettingsMenuItemProps {
  route: string;
  nameToRender: string;
  active: boolean;
}
// eslint-disable-next-line react/prop-types
const UserSettingsMenuItem: React.FC<IUserSettingsMenuItemProps> = ({
  route,
  nameToRender,
  active
}) => {
  return (
    <Box
      sx={{
        marginLeft: '50px',
        whiteSpace: 'nowrap'
      }}>
      <Link
        to={`/${route}`}
        style={{ textDecoration: active ? 'underline' : 'none', color: '#fff' }}>
        <FormattedMessage id={`app.usersettingsmenu.${nameToRender}`} />
      </Link>
    </Box>
  );
};

export default UserSettingsMenuItem;
