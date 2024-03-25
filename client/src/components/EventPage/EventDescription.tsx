/* eslint-disable react/prop-types */
import { Box, Button, Grow } from '@mui/material';
import {
  EventDescriptionDivider,
  EventDescriptionSectionHeading,
  EventDescriptionSectionText
} from '../OneEvent/styled';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';

interface IEventDescriptionProps {
  description: string;
  tickets: TicketData[];
}

interface ISection {
  id: number;
  sectionText: string | JSX.Element[];
  sectionName: string;
}

type SectionVisibility = Record<number, boolean>;

const EventDescription: React.FC<IEventDescriptionProps> = ({ description, tickets }) => {
  const ticketDetails = tickets.map((ticket) => {
    return {
      key: ticket._id,
      ticket_name: ticket.ticket_name.en,
      prices: ticket.prices,
      description: ticket.description
    };
  });

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const renderTickets = ticketDetails.map((ticket, index) => {
    return (
      <Box key={index}>
        <h1 style={{ fontSize: '20px', marginBottom: '5px' }}>{ticket.ticket_name}</h1>
        <hr />
        {appLanguage === 'cs' && (
          <p style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}>
            {ticket.description.cs}
          </p>
        )}
        {appLanguage === 'en' && (
          <p style={{ marginLeft: '10px', marginBottom: '20px' }}>{ticket.description.en}</p>
        )}
        {appLanguage === 'cs' && (
          <p
            style={{ marginTop: '5px', marginLeft: '10px', marginBottom: '20px', fontWeight: 700 }}>
            Cena v CZK: {ticket.prices.CZK} CZK
          </p>
        )}
        {appLanguage === 'en' && (
          <p style={{ marginLeft: '10px', marginBottom: '20px', fontWeight: 700 }}>
            Cena v CZK: {ticket.prices.CZK} CZK
          </p>
        )}
      </Box>
    );
  });

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
