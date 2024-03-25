/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import { FormattedMessage } from 'react-intl';
import SelectComponent from './SelectComponent';
import {
  BoxFlexRowCenter,
  FindBannerBox,
  FindBannerBoxFlex,
  FindBannerBoxMargin,
  FindBannerTypography,
  GridFindBanner
} from '../../styles/styles';
import { EventTypes, TimeTypes } from '../../utils/enum';

interface IFindEventsProps {
  cities: Array<{ city: string; countryShortcut: string }> | null;
  choosedCity: string;
  handleCityChange: (newActive: string) => void;
  choosedEventType: string;
  handleEventTypeChange: (newActive: string) => void;
  choosedTime: string;
  handleTimeTypeChange: (newActive: string) => void;
}

const FindEventsBanner: React.FC<IFindEventsProps> = ({
  cities,
  choosedCity,
  handleCityChange,
  choosedEventType,
  handleEventTypeChange,
  choosedTime,
  handleTimeTypeChange
}) => {
  const compareCity = (cityA: { city: string }, cityB: { city: string }): number => {
    return cityA.city.localeCompare(cityB.city);
  };

  cities?.sort(compareCity);

  return (
    <GridFindBanner
      container
      spacing={0}
      gap={3}
      sx={{ minHeight: '300px' }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <FindBannerBox>
          <PlaceOutlinedIcon />
          <SelectComponent
            active={choosedCity}
            valueArray={cities}
            handleStateChange={handleCityChange}
            type="city"
          />
        </FindBannerBox>
        <FindBannerBoxFlex>
          <BoxFlexRowCenter>
            <FindBannerTypography>
              <FormattedMessage id="app.findbanner.find" />
            </FindBannerTypography>
            <SelectComponent
              active={choosedEventType}
              handleStateChange={handleEventTypeChange}
              type="event"
              enumValues={Object.values(EventTypes)}
            />
          </BoxFlexRowCenter>
          <FindBannerBoxMargin>
            <FindBannerTypography>
              <FormattedMessage id="app.findbanner.this" />
            </FindBannerTypography>
            <SelectComponent
              active={choosedTime}
              handleStateChange={handleTimeTypeChange}
              type="time"
              enumValues={Object.values(TimeTypes)}
            />
          </FindBannerBoxMargin>
        </FindBannerBoxFlex>
      </Grid>
    </GridFindBanner>
  );
};

export default FindEventsBanner;
