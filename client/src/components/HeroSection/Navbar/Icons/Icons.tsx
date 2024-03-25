import React, { useEffect, useState } from 'react';

import { Grid, useMediaQuery, Button, Stack, Avatar } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

import { useTheme } from '@mui/material/styles';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import UserClick from './UserClick/UserClick';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { CartReview } from './CartClick/CartClick';
import Cookies from 'universal-cookie';

const Icons: React.FC = () => {
  const cookies = new Cookies();
  const theme = useTheme();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showUserClick, setShowUserClick] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = cookies.get('authToken');
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  });

  const navigate = useNavigate();

  const iconStyle = {
    color: '#fff',
    fontSize: '30px'
  };
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = (state: boolean): void => {
    setOpenMenu(state);
  };
  const handleShowUserClick = (): void => {
    if (userLoggedIn) {
      setShowUserClick((prev) => !prev);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Grid item xs={3} md={2} lg={1} sx={{ marginTop: '12px', fontSize: 30 }}>
        <SearchBar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />
      </Grid>
      {!showSearchBar && (
        <>
          <Grid
            item
            xs={2}
            md={2}
            lg={1}
            sx={{
              marginTop: '12px',
              fontSize: 30,
              display: isXs && showSearchBar ? 'none' : 'block'
            }}>
            <Stack>
              <CartReview isXs={isXs} />
            </Stack>
          </Grid>
          <Grid
            item
            xs={2}
            md={3}
            lg={1}
            sx={{
              marginTop: '8px',
              fontSize: 30,
              display: isXs && showSearchBar ? 'none' : 'flex',
              flexDirection: 'column'
            }}>
            <Stack sx={{ marginRight: '20px' }}>
              <Button onClick={handleShowUserClick}>
                <Avatar>
                  <PersonIcon style={iconStyle} />
                </Avatar>
              </Button>
            </Stack>
            {showUserClick && <UserClick menuShow={showUserClick} setMenuShow={setShowUserClick} />}
          </Grid>
          {openMenu && isLg ? (
            <HamburgerMenu openMenu={openMenu} setMenuOpen={toggleMenu} />
          ) : (
            <Grid
              item
              xs={1}
              md={1}
              lg={0}
              sx={{
                marginTop: '12px',
                fontSize: 30,
                display: { xs: showSearchBar ? 'none' : 'block', sm: 'block', lg: 'none' }
              }}>
              <Stack>
                <Button>
                  <MenuIcon
                    style={iconStyle}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  />
                </Button>
              </Stack>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Icons;
