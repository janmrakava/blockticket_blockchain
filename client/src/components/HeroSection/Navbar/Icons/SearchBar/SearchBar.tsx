import React, { useEffect, useRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import { Button, alpha, styled } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.6)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  color: '#fff',
  width: '250%'
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch'
    }
  }
}));
interface ISearchBarProps {
  showSearchBar: boolean;
  setShowSearchBar: (state: boolean) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ showSearchBar, setShowSearchBar }) => {
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const iconStyle = {
    color: '#fff',
    fontSize: '30px'
  };

  const handleShowSearchBar = (): void => {
    setShowSearchBar(true);
  };
  const handleClickOutside = (e: MouseEvent): void => {
    if (searchBarRef.current != null && !searchBarRef.current.contains(e.target as Node)) {
      setShowSearchBar(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Stack>
      {!showSearchBar && (
        <Button onClick={handleShowSearchBar}>
          <SearchIcon style={iconStyle} />
        </Button>
      )}
      {showSearchBar && (
        <Search ref={searchBarRef}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
      )}
    </Stack>
  );
};
export default SearchBar;
