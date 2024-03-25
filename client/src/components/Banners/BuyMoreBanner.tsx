import { FormattedMessage } from 'react-intl';
import {
  BuyMoreBox,
  BuyMoreGridContainer,
  BuyMoreGridItem,
  BuyMoreTypographyHeading,
  BuyMoreTypographyImg,
  BuyMoreTypographyText
} from '../../styles/styles';

const BuyMoreBanner: React.FC = () => {
  return (
    <BuyMoreGridContainer container>
      <BuyMoreGridItem item xs={12} md={12} lg={12}>
        <BuyMoreBox>
          <BuyMoreTypographyHeading>
            <FormattedMessage id="app.actionbanner.heading" />
          </BuyMoreTypographyHeading>
          <BuyMoreTypographyText>
            <FormattedMessage id="app.actionbanner.note" />
          </BuyMoreTypographyText>
        </BuyMoreBox>
        <BuyMoreTypographyImg>
          <img src="/logos/tickets.png" alt="Action tickets image" />
        </BuyMoreTypographyImg>
      </BuyMoreGridItem>
    </BuyMoreGridContainer>
  );
};

export default BuyMoreBanner;
