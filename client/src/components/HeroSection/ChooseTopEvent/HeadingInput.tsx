import React, { useState } from 'react';
import { FormControl } from '@mui/material';
import CZFlag from '../../../../public/CZ.png';
import SKFlag from '../../../../public/SK.png';
import { FormattedMessage } from 'react-intl';
import {
  ChooseTopFlagImg,
  HeadingInputBox,
  HeadingInputMenuItem,
  HeadingInputTypography,
  SelectCountry
} from '../../../styles/styles';

import '../../../pages/App.css';

const HeadingInput: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Czech');

  /*   const handleChange = (event: SelectChangeEvent<string>): void => {
    setSelectedCountry(event.target.value);
  }; */

  return (
    <HeadingInputBox>
      <HeadingInputTypography>Top Events</HeadingInputTypography>
      <FormControl>
        <SelectCountry
          value={selectedCountry}
          onChange={(event) => {
            setSelectedCountry(event.target.value as string);
          }}
          MenuProps={{
            MenuListProps: {
              disablePadding: true
            }
          }}
        >
          <HeadingInputMenuItem value="Czech">
            <ChooseTopFlagImg src={CZFlag} alt="Czech republic" />
            <span style={{ color: '#fff' }}>
              <FormattedMessage id="app.choosetop.czech" />
            </span>
          </HeadingInputMenuItem>
          <HeadingInputMenuItem value="Slovak">
            <ChooseTopFlagImg src={SKFlag} alt="Slovak republic" />
            <span style={{ color: '#fff' }}>
              <FormattedMessage id="app.choosetop.slovak" />
            </span>
          </HeadingInputMenuItem>
        </SelectCountry>
      </FormControl>
    </HeadingInputBox>
  );
};

export default HeadingInput;
