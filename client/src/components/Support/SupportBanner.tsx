/* eslint-disable react/prop-types */
import { FormattedMessage } from 'react-intl';
import {
  SupportBannerGrid,
  SupportBannerHeading,
  SupportBannerText
} from '../../styles/supportStyles';
import { useNavigate } from 'react-router-dom';

interface ISupportBanner {
  text: string;
}

const SupportBanner: React.FC<ISupportBanner> = ({ text }) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/support/${text}`, { state: { text } });
  };
  return (
    <SupportBannerGrid item xs={8} md={5} lg={3} onClick={handleClick}>
      <img src={`/support-img/${text}.jpg`} alt={`${text}`} style={{ marginTop: 20, width: 60 }} />
      <SupportBannerHeading>
        <FormattedMessage id={`app.support.${text}.heading`} />
      </SupportBannerHeading>
      <SupportBannerText>
        <FormattedMessage id={`app.support.${text}.text`} />
      </SupportBannerText>
    </SupportBannerGrid>
  );
};

export default SupportBanner;
