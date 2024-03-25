/* eslint-disable react/prop-types */
import { FormControl, Select } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { MenuItemChooseType } from '../../styles/styles';

interface ISelectComponentProps {
  active: string;
  valueArray?: Array<{ city: string; countryShortcut: string }> | null;
  handleStateChange: (newState: string) => void;
  type: string;
  enumValues?: string[];
}

const SelectComponent: React.FC<ISelectComponentProps> = ({
  active,
  valueArray,
  handleStateChange,
  type,
  enumValues
}) => {
  let renderArray;
  let renderEnum;

  if (valueArray != null) {
    renderArray = valueArray.map((value) => {
      return (
        <MenuItemChooseType key={value.city} value={value.city}>
          {value.city},{value.countryShortcut}
        </MenuItemChooseType>
      );
    });
  }

  if (enumValues != null) {
    if (type === 'event') {
      renderEnum = enumValues.map((value) => {
        return (
          <MenuItemChooseType key={value} value={value}>
            <FormattedMessage id={`app.findbanner.event.${value}`} />
          </MenuItemChooseType>
        );
      });
    } else if (type === 'time') {
      renderEnum = enumValues.map((value) => {
        return (
          <MenuItemChooseType key={value} value={value}>
            <FormattedMessage id={`app.findbanner.time.${value}`} />
          </MenuItemChooseType>
        );
      });
    }
  }

  const handleChange = (newState: string): void => {
    handleStateChange(newState);
  };

  const isEventOrTime = type === 'event' || type === 'time';

  return (
    <FormControl>
      <Select
        size="small"
        value={active}
        sx={{
          fontSize: isEventOrTime ? { xs: '25px', lg: '35px' } : '20px',
          fontWeight: isEventOrTime ? { xs: 'bold', lg: '900' } : '500',
          color: isEventOrTime ? '#017CCC' : '#fff'
        }}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        MenuProps={{
          MenuListProps: {
            disablePadding: true
          }
        }}
        fullWidth
      >
        {renderArray}
        {renderEnum}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
