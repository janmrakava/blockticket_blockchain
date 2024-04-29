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

export const useTicketVerification = (): any => {
  const [ticketID, setTicketID] = useState<string>('');
  const [isTicketValid, setIsTicketValid] = useState<boolean>(false);
  const [ticketInfo, setTicketInfo] = useState<ITicketFromContract>();
  const [txArr, setTxArr] = useState();
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
      setTxArr(array);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setTicketID(value);
  };
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return {
    appLanguage,
    handleChange,
    handleSubmit,
    ticketID,
    ticketInfo,
    isTicketValid,
    txArr
  };
};
