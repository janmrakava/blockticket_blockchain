import { FormattedMessage } from 'react-intl';
import { PopularBannerBox, PopularBannerTypography } from '../../styles/styles';

const PopularBanner: React.FC = () => {
  return (
    <PopularBannerBox>
      <PopularBannerTypography>
        <FormattedMessage id="app.eventbanner.popular" />
      </PopularBannerTypography>
    </PopularBannerBox>
  );
};

export default PopularBanner;
