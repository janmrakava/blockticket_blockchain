import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ChooseTypeEventButton, ChooseTypeEventButtonActive } from '../../../styles/styles';

interface IChooseTypeEventProps {
  type: string;
  activeButton: string;
  handleChange: (newActive: string) => void;
}

const ChooseTypeEventsButton: React.FC<IChooseTypeEventProps> = ({
  type,
  activeButton,
  handleChange
}) => {
  const typeOfButton = activeButton === type;
  return (
    <>
      {typeOfButton ? (
        <ChooseTypeEventButtonActive
          onClick={() => {
            handleChange(type);
          }}
        >
          <FormattedMessage id={`app.navigation.${type}`} />
        </ChooseTypeEventButtonActive>
      ) : (
        <ChooseTypeEventButton
          onClick={() => {
            handleChange(type);
          }}
        >
          <FormattedMessage id={`app.navigation.${type}`} />
        </ChooseTypeEventButton>
      )}
    </>
  );
};

export default ChooseTypeEventsButton;
