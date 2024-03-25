import { Grid, Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {
  FavoriteBannerGridContainer,
  MobileBannerTypographyHeading,
  MobileBannerTypographyText
} from '../../styles/styles';

const MobileAppBanner: React.FC = () => {
  return (
    <FavoriteBannerGridContainer container sx={{ minHeight: '300px' }}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          padding: '20px',
          display: { xs: 'block', lg: 'flex' },
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Box>
          <MobileBannerTypographyHeading
            sx={{
              marginTop: { lg: '50px' }
            }}
          >
            <FormattedMessage id="app.mobilebanner.heading" />
          </MobileBannerTypographyHeading>

          <MobileBannerTypographyText>
            <FormattedMessage id="app.mobilebanner.note" />
          </MobileBannerTypographyText>
          <Box
            sx={{
              display: { xs: 'block', md: 'block', lg: 'flex' },
              justifyContent: 'space-evenly'
            }}
          >
            <Typography sx={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="/logos/appstore.png" alt="App Store Logo" />
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              <img src="/logos/googleplay.png" alt="Google Play Logo" />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' }, marginLeft: '30%' }}>
          <img src="/logos/Mobils.png" alt="Two mobile phones with mobile app" />
        </Box>
      </Grid>
    </FavoriteBannerGridContainer>
  );
};

export default MobileAppBanner;
