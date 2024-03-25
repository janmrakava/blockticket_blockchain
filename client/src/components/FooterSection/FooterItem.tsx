import { Box, Button, Grow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { FooterItemBox } from '../../styles/styles';

interface IFooterItemProps {
  name: string;
  showOptions: boolean;
  handleChangeShow: (type: string) => void;
  options: string[];
  isLargeScreen: boolean;
}

const FooterItem: React.FC<IFooterItemProps> = ({
  name,
  showOptions,
  handleChangeShow,
  options,
  isLargeScreen
}) => {
  const renderTypographyElements = (): JSX.Element[] => {
    return options.map((option) => (
      <Button key={option} sx={{ margin: '5px 0' }}>
        <Link to={`/${option}`} style={{ textDecoration: 'none', color: '#80797B' }}>
          <FormattedMessage id={`app.footeritem.${option}`} />
        </Link>
      </Button>
    ));
  };
  return (
    <Box>
      <FooterItemBox>
        <FormattedMessage id={`app.footer.${name}`} />
        <Button
          sx={{ display: isLargeScreen ? 'none' : 'block' }}
          onClick={() => {
            handleChangeShow(name);
          }}
        >
          <Typography
            sx={{
              transform: showOptions ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '0.3s ease'
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </Typography>
        </Button>
      </FooterItemBox>
      <Box sx={{ display: showOptions ? 'flex' : 'none' }}>
        <Grow
          in={showOptions}
          style={{ transformOrigin: '0 0 0' }}
          {...(showOptions ? { timeout: 1000 } : { timeout: 1000 })}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {renderTypographyElements()}
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

export default FooterItem;
