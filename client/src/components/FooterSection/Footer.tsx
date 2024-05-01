import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import SocialButton from './SocialButton';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import FooterItem from './FooterItem';
import FooterUrl from './FooterUrl';
import Copyright from './Copyright';
import {
  DividerThinner,
  FooterGridFlex,
  FooterGridMargin,
  FooterTypographyHeading
} from '../../styles/styles';

const Footer: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');

  const [showNetwork, setShowNetworks] = useState<boolean>(isLargeScreen);
  const [showHelp, setShowHelp] = useState<boolean>(isLargeScreen);
  const [showWhoWeAre, setShowWhoWeAre] = useState<boolean>(isLargeScreen);

  const networkOptions = ['live', 'international', 'verification', 'ticketsmarket'];
  const helpOptions = ['support', 'delivery', 'payment', 'places', 'cancel'];
  const whoweareOptions = ['aboutus', 'career', 'logo'];

  const handleChangeShow = (type: string): void => {
    switch (type) {
      case 'ournetwork':
        setShowNetworks((prev) => !prev);
        break;
      case 'help':
        setShowHelp((prev) => !prev);
        break;
      case 'whoweare':
        setShowWhoWeAre((prev) => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setShowNetworks(isLargeScreen);
    setShowHelp(isLargeScreen);
    setShowWhoWeAre(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: { lg: 'flex', xs: 'block' },
            flexDirection: 'column',
            marginLeft: '20px',
            marginTop: '20px'
          }}>
          <Grid item xs={12} lg={2} sx={{ margin: '20px' }}>
            <FooterTypographyHeading>TicketBlock</FooterTypographyHeading>
          </Grid>
          <FooterGridFlex item xs={12} lg={2}>
            <SocialButton type="twitter" Icon={TwitterIcon} />
            <SocialButton type="facebook" Icon={FacebookIcon} />
            <SocialButton type="instagram" Icon={InstagramIcon} />
            <SocialButton type="youtube" Icon={YouTubeIcon} />
            <SocialButton type="linkedin" Icon={LinkedInIcon} />
          </FooterGridFlex>
        </Box>
        <Grid item xs={12} sx={{ margin: '10px 20px', display: { xs: 'block', lg: 'none' } }}>
          <Typography>
            <FormattedMessage
              id="app.footer.terms"
              values={{
                Link: (chunks) => (
                  <Link to="/termofuse" style={{ color: '#fff' }}>
                    {chunks}
                  </Link>
                ),
                cta: (chunks) => <strong>{chunks}</strong>
              }}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sx={{ marginLeft: '20px', marginRight: '20px', marginTop: { lg: '20px' } }}>
          <FooterItem
            name="ournetwork"
            showOptions={showNetwork}
            handleChangeShow={handleChangeShow}
            options={networkOptions}
            isLargeScreen={isLargeScreen}
          />
          <DividerThinner />
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sx={{ marginLeft: '20px', marginRight: '20px', marginTop: { lg: '20px' } }}>
          <FooterItem
            name="help"
            showOptions={showHelp}
            handleChangeShow={handleChangeShow}
            options={helpOptions}
            isLargeScreen={isLargeScreen}
          />
          <DividerThinner />
        </Grid>
        <FooterGridMargin
          item
          xs={12}
          lg={2}
          sx={{
            marginTop: { lg: '20px' }
          }}>
          <FooterItem
            name="whoweare"
            showOptions={showWhoWeAre}
            handleChangeShow={handleChangeShow}
            options={whoweareOptions}
            isLargeScreen={isLargeScreen}
          />
          <DividerThinner />
        </FooterGridMargin>
        <Grid item xs={12} sx={{ margin: '10px 20px', marginBottom: '20px' }}>
          <FooterUrl />
        </Grid>
        <Grid item xs={12} sx={{ margin: '5px 20px 20px 20px' }}>
          <Copyright />
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
