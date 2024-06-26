/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, type FormEvent } from 'react';
import { useSelector } from 'react-redux';

import {
  extractEventData,
  getEventsForTicketID,
  getOneTicketInfo,
  verifyTicket
} from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../MyOneTicket/useMyOneTicket';
import { type RootState } from '../store';
import { Box, Button, Grid, Typography } from '@mui/material';
import { convertRetardedDate } from '../../utils/function';
import {
  StyledContainerButtonTicket,
  StyledContainerTicketInfo,
  StyledContainerTransaction
} from './styled';
import { useNavigate } from 'react-router-dom';

export enum TicketState {
  VALID,
  INVALID,
  NULL
}

export const useTicketVerification = (): any => {
  const [ticketID, setTicketID] = useState<string>('');
  const [isTicketValid, setIsTicketValid] = useState<TicketState>(TicketState.NULL);
  const [ticketInfo, setTicketInfo] = useState<ITicketFromContract>();
  const [transactionArray, setTransactionArray] = useState<IContractTransaction[]>([]);

  const eventDescriptions: Record<string, string> = {
    TicketCreated: 'Vstupenka vytvořena',
    TicketTransferred: 'Vstupenka změnila majitele',
    TicketRedeemed: 'Vstupenka vyzvednuta',
    TicketDeleted: 'Vstupenka smazána',
    TicketReturned: 'Vstupenka vrácena',
    TicketRefunded: 'Vstupenka vrácena',
    EventCancelled: 'Událost byla zrušena',
    TicketSetForSale: 'Vstupenka nastavena k prodeji',
    TicketSaleCancelled: 'Prodej vstupenky zrušen',
    TicketPurchasedOnMarket: 'Vstupenka koupena na tržišti'
  };
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await verifyTicket(ticketID);
      if (response) {
        setIsTicketValid(TicketState.VALID);
        const ticketInfoSmart = await getOneTicketInfo(ticketID);
        setTicketInfo(ticketInfoSmart);
        let array = await getEventsForTicketID(ticketID);
        const extractedData = await extractEventData(array);
        console.log(array);
        array = array.map((transaction: any, index: number) => {
          return {
            ...transaction,
            timestamp: extractedData[index].timestamp
          };
        });
        console.log(array);
        setTransactionArray(array);
      }
    } catch (error) {
      setIsTicketValid(TicketState.INVALID);
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

  const renderTransactionInfo = transactionArray?.map((transaction, index) => {
    const description = eventDescriptions[transaction.event] || 'Není definovaná událost';
    return (
      <StyledContainerTransaction key={index}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Hash transankce: </Typography>
          <Typography sx={{ width: '50%' }}>{transaction.transactionHash}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Hash bloku: </Typography>
          <Typography sx={{ width: '50%' }}>{transaction.blockHash}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Číslo bloku: </Typography>
          <Typography sx={{ width: '50%' }}>{transaction.blockNumber.toString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Platnost bloku: </Typography>
          <Typography sx={{ width: '50%' }}>
            {transaction.removed === false ? 'Validní blok' : 'Blok již není validní'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Typ transakce: </Typography>
          <Typography sx={{ width: '50%' }}>{description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Datum provedení transakce: </Typography>
          <Typography sx={{ width: '50%' }}>{`${transaction.timestamp.getDate()}.${
            transaction.timestamp.getMonth() + 1
          }.${transaction.timestamp.getFullYear()}`}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ width: '50%' }}>Čas provedení transakce: </Typography>
          <Typography sx={{ width: '50%' }}>{`${transaction.timestamp.getHours()}:${
            transaction.timestamp.getMinutes() + 1
          }:${transaction.timestamp.getSeconds()}`}</Typography>
        </Box>
      </StyledContainerTransaction>
    );
  });

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return {
    appLanguage,
    handleChange,
    handleSubmit,
    ticketID,
    ticketInfo,
    isTicketValid,
    transactionArray,
    renderTicketInfo,
    renderTransactionInfo
  };
};
