/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, type FormEvent } from 'react';
import { useSelector } from 'react-redux';

import {
  findTicketInTransactions,
  getOneTicketInfo,
  verifyTicket
} from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../MyOneTicket/useMyOneTicket';
import { type RootState } from '../store';
import { Button, Grid, Typography } from '@mui/material';
import { convertRetardedDate } from '../../utils/function';
import { StyledContainerButtonTicket, StyledContainerTicketInfo } from './styled';
import { useNavigate } from 'react-router-dom';

export const useTicketVerification = (): any => {
  const [ticketID, setTicketID] = useState<string>('');
  const [isTicketValid, setIsTicketValid] = useState<boolean>(false);
  const [ticketInfo, setTicketInfo] = useState<ITicketFromContract>();
  const [transactionArray, setTransactionArray] = useState();
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await verifyTicket(ticketID);
      setIsTicketValid(response);
      if (response) {
        const ticketInfoSmart = await getOneTicketInfo(ticketID);
        setTicketInfo(ticketInfoSmart);
      }
      const array = await findTicketInTransactions(ticketID);
      setTransactionArray(array);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setTicketID(value);
  };
  const convertedDate = convertRetardedDate(ticketInfo?.purchasedDate);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}.`;

  const navigate = useNavigate();
  const handleClickToMarket = (): void => {
    navigate('/ticketsmarket');
  };
  const renderTicketInfo = (
    <Grid
      item
      xs={12}
      md={12}
      lg={12}
      sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <StyledContainerTicketInfo>
        <Typography>ID Vstupenky</Typography>
        <Typography>{ticketInfo?.ticketID}</Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>ID události</Typography>
        <Typography>{ticketInfo?.eventID}</Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>Vlastník vstupenky</Typography>
        <Typography>{ticketInfo?.ticketOwner}</Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>Původní cena</Typography>
        <Typography>{ticketInfo?.originalPrice.toString()} CZK</Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>Datum vytvoření</Typography>
        <Typography>{renderDate}</Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>Uplatněná vstupenka: </Typography>
        <Typography>
          {ticketInfo?.isRedeemed
            ? 'Ano - Nejsou již možné žádné akce'
            : 'Ne - Je možné ji prodat, nebo vrátit'}
        </Typography>
      </StyledContainerTicketInfo>
      <StyledContainerTicketInfo>
        <Typography>Stav vstupenky: </Typography>
        <Typography>
          {ticketInfo?.forSale
            ? 'Ano - Vstupenka je dostupná na marketu a je možné ji koupit.'
            : 'Ne - Vstupenka není dostupná na marketu a není možné ji koupit.'}
        </Typography>
      </StyledContainerTicketInfo>
      <StyledContainerButtonTicket>
        {ticketInfo?.forSale && (
          <Button variant="contained" onClick={handleClickToMarket}>
            Na trh se vstupenkami
          </Button>
        )}
      </StyledContainerButtonTicket>
    </Grid>
  );

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return {
    appLanguage,
    handleChange,
    handleSubmit,
    ticketID,
    ticketInfo,
    isTicketValid,
    transactionArray,
    renderTicketInfo
  };
};
