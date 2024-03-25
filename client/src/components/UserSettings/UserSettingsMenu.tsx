import React from 'react';
import { UserSettingsMenuGrid } from '../../styles/supportStyles';
import UserSettingsMenuItem from './UserSettingsMenuItem';

interface IUserSettingsMenuProps {
  active: string;
}

const UserSettingsMenu: React.FC<IUserSettingsMenuProps> = ({ active }) => {
  return (
    <UserSettingsMenuGrid container>
      <UserSettingsMenuItem
        route="settings"
        nameToRender="settings"
        active={active === 'settings'}
      />
      <UserSettingsMenuItem
        route="myTickets"
        nameToRender="mytickets"
        active={active === 'mytickets'}
      />
      <UserSettingsMenuItem
        route="previousorders"
        nameToRender="previousorders"
        active={active === 'previousorders'}
      />
      <UserSettingsMenuItem route="support" nameToRender="support" active={active === 'support'} />
      <UserSettingsMenuItem
        route="favorites"
        nameToRender="favorites"
        active={active === 'favorites'}
      />
      <UserSettingsMenuItem route="logout" nameToRender="logout" active={active === 'logout'} />
    </UserSettingsMenuGrid>
  );
};

export default UserSettingsMenu;
