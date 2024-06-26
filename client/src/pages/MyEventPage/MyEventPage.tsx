/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useSDK } from '@metamask/sdk-react';
import { Alert, Box, Button, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { cancelEvent, getEventInfo } from '../../utils/smartContractFunctions/EventContract';
import { convertRetardedDate, convertToDate } from '../../utils/function';
import {
  InfoEventContainer,
  MyEventPageContainer,
  StyledContainerTickets,
  StyledTicketItem
} from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateTicketPrice from '../../components/MyEventPage/UpdateTicketPriceBanner';
import {
  cancelAllTickets,
  getAllTicketsForEvent
} from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../MyOneTicket/useMyOneTicket';

interface IMyEvent {
  dateOfEvent: any;
  eventName: string;
  eventCategory: string;
  eventID: string;
  eventImage: string;
  eventOwner: string;
  numberOfTickets: number;
  placeName: string;
  soldTickets: number;
  ticketPrice: number;
  ticketsLeft: number;
}

const MyEventPage: React.FC = () => {
  const [myEvent, setMyEvent] = useState<IMyEvent>();
  const [ticketsForEvent, setTicketsForEvent] = useState<ITicketFromContract[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showUpdateTicketPrice, setShowUpdateTicketPrice] = useState<boolean>(false);
  const [showSuccessSnackBar, setSuccessShowSnackBar] = useState<boolean>(false);
  const [showErrorSnackBar, setErrorShowSnackBar] = useState<boolean>(false);
  const [newTicketPrice, setNewTicketPrice] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setNewTicketPrice(Number(value));
  };

  const params = useParams();
  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();

  useEffect(() => {
    const connect = async (): Promise<void> => {
      try {
        const accounts = await sdk?.connect();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log('No accounts returned by SDK');
        }
      } catch (err) {
        console.warn('failed to connect..', err);
      }
    };
    void connect();
  });

  useEffect(() => {
    const fetchMyEvents = async (): Promise<void> => {
      if (!account) {
        setIsLoading(false);
        return;
      }
      try {
        if (params.eventID) {
          const event = await getEventInfo(params.eventID);
          setMyEvent(event);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMyEvents();
  }, [account, showSuccessSnackBar]);

  const convertedDate = convertToDate(myEvent && myEvent.dateOfEvent);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}`;

  const handleShowTicketPriceBanner = (): void => {
    setShowUpdateTicketPrice(!showUpdateTicketPrice);
  };

  const navigate = useNavigate();

  const handleCancelEvent = async (): Promise<void> => {
    if (myEvent && account) {
      const response = await cancelEvent(myEvent.eventID, account);
      const response2 = await cancelAllTickets(myEvent.eventID, account);
      navigate('/showmyevents');
    }
  };

  const handleShowSuccessSnackBar = (): void => {
    setSuccessShowSnackBar(true);
    setTimeout(() => {
      setSuccessShowSnackBar(false);
    }, 2500);
  };
  const handleShowErrorSnackBar = (): void => {
    setErrorShowSnackBar(true);
    setTimeout(() => {
      setErrorShowSnackBar(false);
    }, 2500);
  };

  useEffect(() => {
    const fetchTicketsForEvent = async (): Promise<void> => {
      try {
        if (params.eventID) {
          const response = await getAllTicketsForEvent(params.eventID);
          console.log(response);
          setTicketsForEvent(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void fetchTicketsForEvent();
  }, []);
  return (
    <MyEventPageContainer container>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ filter: showUpdateTicketPrice ? 'blur(4px)' : 'none' }}>
        <Typography
          sx={{ fontSize: '30px', fontWeight: 900, padding: '20px', marginBottom: '-70px' }}>
          <FormattedMessage id="app.myeventpage.heading" />
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          paddingLeft: '20px',
          display: !isLoading || !isError ? 'none' : 'block',
          filter: showUpdateTicketPrice ? 'blur(4px)' : 'none'
        }}>
        {isLoading && <CircularProgress />}
        {isError && <div>Něco se nepovedlo...</div>}
      </Grid>
      {myEvent && (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '50px',
            filter: showUpdateTicketPrice ? 'blur(4px)' : 'none'
          }}>
          <img src={myEvent?.eventImage} alt="Image of event" style={{ width: '100%' }} />
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InfoEventContainer>
              <Typography sx={{ width: '50%' }}>ID události:</Typography>
              <Typography>{myEvent.eventID}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Název události:</Typography>
              <Typography>{myEvent.eventName}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Datum konání události:</Typography>
              <Typography>{renderDate}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Kategorie události:</Typography>
              <Typography>{myEvent.eventCategory}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Vlastník události:</Typography>
              <Typography>{myEvent.eventOwner}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Celkový počet vstupenek:</Typography>
              <Typography>{myEvent.numberOfTickets.toString()} ks</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Počet dostupných vstupenek:</Typography>
              <Typography>
                {myEvent.soldTickets.toString() === myEvent.numberOfTickets.toString()
                  ? 'Vyprodáno'
                  : `${myEvent.soldTickets.toString()} ks`}
              </Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Počet prodaných vstupenek:</Typography>
              <Typography>{myEvent.soldTickets.toString()} ks </Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Cena vstupenky:</Typography>
              <Typography>{myEvent.ticketPrice.toString()} CZK </Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Místo konání události</Typography>
              <Typography>{myEvent.placeName}</Typography>
            </InfoEventContainer>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={{ width: '40%' }} onClick={handleShowTicketPriceBanner}>
              Upravit cenu vstupenky
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ width: '40%' }}
              onClick={handleCancelEvent}>
              Smazat událost
            </Button>
          </Box>
          <Grid item xs={12} md={12} lg={12}>
            <Typography sx={{ fontSize: '20px', fontWeight: 900 }}>
              Vytvořené vstupenky na událost
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ticketsForEvent?.length === 0 ? (
              <div>Žádné vstupenky neexistují</div>
            ) : (
              ticketsForEvent?.map((ticket, index) => {
                const convertedDate = convertRetardedDate(ticket.purchasedDate);
                const renderDate = `${convertedDate.getDate()}.${
                  convertedDate.getMonth() + 1
                }.${convertedDate.getFullYear()}`;
                return (
                  <StyledContainerTickets key={index}>
                    <StyledTicketItem>
                      <Typography>ID Vstupenky: </Typography>
                      <Typography>{ticket.ticketID}</Typography>
                    </StyledTicketItem>
                    <StyledTicketItem>
                      <Typography>Adresa vlastníka:</Typography>
                      <Typography> {ticket.ticketOwner}</Typography>
                    </StyledTicketItem>
                    <StyledTicketItem>
                      <Typography>Datum vytvoření: </Typography>
                      <Typography>{renderDate}</Typography>
                    </StyledTicketItem>
                    <StyledTicketItem>
                      <Typography>Uplatněná vstupenka: </Typography>
                      <Typography>{ticket.isRedeemed ? 'Ano' : 'Ne'}</Typography>
                    </StyledTicketItem>
                    <StyledTicketItem>
                      <Typography>Vstupenka k prodeji: </Typography>
                      <Typography>{ticket.forSale ? 'Ano' : 'Ne'}</Typography>
                    </StyledTicketItem>
                    <StyledTicketItem>
                      <Typography>Vstupenka z marketplace: </Typography>
                      <Typography>{ticket.boughtFromMarket ? 'Ano' : 'Ne'}</Typography>
                    </StyledTicketItem>
                  </StyledContainerTickets>
                );
              })
            )}
          </Grid>
        </Grid>
      )}
      {showUpdateTicketPrice && (
        <UpdateTicketPrice
          eventID={myEvent && myEvent.eventID}
          userAddress={account}
          newTicketPrice={newTicketPrice}
          ticketPrice={myEvent && myEvent.ticketPrice}
          handleChange={handleChange}
          handleShowTicketPriceBanner={handleShowTicketPriceBanner}
          handleShowSuccessSnackBar={handleShowSuccessSnackBar}
          handleShowErrorSnackBar={handleShowErrorSnackBar}
        />
      )}
      <Snackbar
        open={showErrorSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.myeventpage.changepriceerror`} />
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.myeventpage.changepricesuccess`} />
        </Alert>
      </Snackbar>
    </MyEventPageContainer>
  );
};

export default MyEventPage;
