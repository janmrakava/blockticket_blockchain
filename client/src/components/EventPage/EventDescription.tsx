/* eslint-disable react/prop-types */
import { Box, Button, Grow } from '@mui/material';
import {
  EventDescriptionDivider,
  EventDescriptionSectionHeading,
  EventDescriptionSectionText
} from '../../pages/OneEvent/styled';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

interface IEventDescriptionProps {
  description: string;
  ticketPrice: number;
  numberOfTickets: number;
}

interface ISection {
  id: number;
  sectionText: string | JSX.Element;
  sectionName: string;
}

type SectionVisibility = Record<number, boolean>;

const EventDescription: React.FC<IEventDescriptionProps> = ({
  description,
  ticketPrice,
  numberOfTickets
}) => {
  const renderTickets = (
    <Box>
      <h1 style={{ fontSize: '20px', marginBottom: '5px' }}>Standardní vstupenka</h1>
      <p style={{ marginLeft: '10px', marginBottom: '20px' }}>Popis vstupenky</p>
      <p style={{ marginLeft: '10px', marginBottom: '20px', fontWeight: 700 }}>
        Cena vstupenky: {ticketPrice.toString()} CZK
      </p>
      <p style={{ marginLeft: '10px', marginBottom: '20px', fontWeight: 700 }}>
        Počet dostupných kusů: {numberOfTickets.toString()} ks
      </p>
    </Box>
  );

  const sections: ISection[] = [
    { id: 1, sectionText: description, sectionName: 'app.oneevent.description' },
    { id: 2, sectionText: renderTickets, sectionName: 'app.oneevent.tickets' },
    { id: 3, sectionText: 'app.oneevent.parkingtext', sectionName: 'app.oneevent.parking' }
  ];
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({});

  const handleShow = (sectionId: number): void => {
    setSectionVisibility((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId]
    }));
  };

  return (
    <>
      <Box sx={{ width: { xs: '100%', lg: '40%' } }}>
        <EventDescriptionSectionHeading>
          <FormattedMessage id="app.oneevent.aboutevent" />
        </EventDescriptionSectionHeading>
        <EventDescriptionSectionText>{description}</EventDescriptionSectionText>
        <EventDescriptionDivider />
      </Box>
      <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
        {sections.map((section, index) => {
          return (
            <>
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '15px'
                  }}>
                  <EventDescriptionSectionHeading>
                    <span style={{ marginRight: '20px' }}>0{index + 1}</span>
                    <FormattedMessage id={section.sectionName} />
                  </EventDescriptionSectionHeading>
                  <Button
                    onClick={() => {
                      handleShow(index);
                    }}>
                    <KeyboardArrowDown
                      sx={{
                        transform: sectionVisibility[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: '0.3s ease'
                      }}
                    />
                  </Button>
                </Box>
                <Box sx={{ display: sectionVisibility[index] ? 'flex' : 'none' }}>
                  <Grow
                    in={sectionVisibility[index]}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(sectionVisibility[index] ? { timeout: 1000 } : {})}>
                    {section.id === 3 ? (
                      <EventDescriptionSectionText>
                        <FormattedMessage id="app.oneevent.parkigntext" />
                      </EventDescriptionSectionText>
                    ) : (
                      <EventDescriptionSectionText>
                        {section.sectionText}
                      </EventDescriptionSectionText>
                    )}
                  </Grow>
                </Box>
                <EventDescriptionDivider sx={{ marginBottom: '10px' }} />
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default EventDescription;
