import React from 'react';
import HeadingInput from './HeadingInput';
import ChooseTypeEventsButton from './ChooseTypeEventsButton';
import { Grid, type Theme, useMediaQuery, FormControl } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {
  MenuItemChooseType,
  SelectComp,
  ChooseEventGridCenter,
  ChooseEventGridCenterGap
} from '../../../styles/styles';

interface IChooseTopEventProps {
  selectedType: string;
  handleChange: (newActive: string) => void;
}

const ChooseTopEvent: React.FC<IChooseTopEventProps> = ({ selectedType, handleChange }) => {
  const isXs = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <HeadingInput />
      </Grid>
      {isXs ? (
        <ChooseEventGridCenter item xs={12}>
          <FormControl
            sx={{
              textAlign: 'center'
            }}>
            <SelectComp
              value={selectedType}
              onChange={(event) => {
                handleChange(event.target.value as string);
              }}
              MenuProps={{
                MenuListProps: {
                  disablePadding: true
                }
              }}
              fullWidth>
              <MenuItemChooseType value="music">
                <FormattedMessage id="app.navigation.music" />
              </MenuItemChooseType>
              <MenuItemChooseType value="sport">
                <FormattedMessage id="app.navigation.sport" />
              </MenuItemChooseType>
              <MenuItemChooseType value="family">
                <FormattedMessage id="app.navigation.family" />
              </MenuItemChooseType>
              <MenuItemChooseType value="vip">
                <FormattedMessage id="app.navigation.vip" />
              </MenuItemChooseType>
              <MenuItemChooseType value="art">
                <FormattedMessage id="app.navigation.art" />
              </MenuItemChooseType>
            </SelectComp>
          </FormControl>
        </ChooseEventGridCenter>
      ) : (
        <ChooseEventGridCenterGap item sm={12} md={12} lg={12}>
          <ChooseTypeEventsButton
            type="music"
            activeButton={selectedType}
            handleChange={handleChange}
          />
          <ChooseTypeEventsButton
            type="sport"
            activeButton={selectedType}
            handleChange={handleChange}
          />
          <ChooseTypeEventsButton
            type="family"
            activeButton={selectedType}
            handleChange={handleChange}
          />
          <ChooseTypeEventsButton
            type="vip"
            activeButton={selectedType}
            handleChange={handleChange}
          />
          <ChooseTypeEventsButton
            type="art"
            activeButton={selectedType}
            handleChange={handleChange}
          />
        </ChooseEventGridCenterGap>
      )}
    </Grid>
  );
};

export default ChooseTopEvent;
