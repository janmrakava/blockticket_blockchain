import { Box, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { FormattedMessage } from 'react-intl';
import {
  BoxFlexRow,
  FavoriteBannedGridItem,
  FavoriteBannerButton,
  FavoriteBannerGridContainer,
  FavoriteBannerLink,
  GridFavoriteBannerItem,
  TypographyFavoriteBannerHeader,
  TypographyFavoriteBannerText
} from '../../styles/styles';
import { Link } from 'react-router-dom';

const FavoriteBanner: React.FC = () => {
  return (
    <FavoriteBannerGridContainer container sx={{ minHeight: '300px' }}>
      <Box>
        <FavoriteBannedGridItem item xs={12} md={12} lg={12}>
          <TypographyFavoriteBannerHeader>
            <FormattedMessage id="app.favoritebanner.heading" />
            <FavoriteBorderIcon fontSize="large" />
          </TypographyFavoriteBannerHeader>
          <TypographyFavoriteBannerText>
            <FormattedMessage id="app.favoritebanner.note" />
          </TypographyFavoriteBannerText>
        </FavoriteBannedGridItem>
      </Box>
      <BoxFlexRow>
        <GridFavoriteBannerItem
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            gap: { lg: '100px' }
          }}
        >
          <Link to="/login">
            <FavoriteBannerButton size="large">
              <FormattedMessage id="app.login.login" />
            </FavoriteBannerButton>
          </Link>

          <IconButton>
            <FavoriteBannerLink to="/twitter">
              <TwitterIcon fontSize="large" />
            </FavoriteBannerLink>
          </IconButton>
          <IconButton>
            <FavoriteBannerLink to="/facebook">
              <FacebookIcon fontSize="large" />
            </FavoriteBannerLink>
          </IconButton>
        </GridFavoriteBannerItem>
      </BoxFlexRow>
    </FavoriteBannerGridContainer>
  );
};

export default FavoriteBanner;
