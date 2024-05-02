/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from 'react';

import { useSDK } from '@metamask/sdk-react';
import {
  cancelTicketForSale,
  convertToEth,
  getOneTicketInfo
} from '../../utils/smartContractFunctions/TicketContract';
import { useNavigate, useParams } from 'react-router-dom';
import { convertRetardedDate } from '../../utils/function';
import ethToCzk from '../../ethtoczkprice/ethtoczkprice.json';

export interface ITicketFromContract {
  eventID: string;
  ticketID: string;
  ticketOwner: string;
  ticketPrice: number;
  forSale: boolean;
  isRedeemed: boolean;
  isValid: boolean;
  originalPrice: number;
  purchasedDate: bigint;
  salePrice: number;
  boughtFromMarket: boolean;
}

export const useMyOneTicket = (): any => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [myTicket, setMyTicket] = useState<ITicketFromContract>();
  const [priceToRender, setPriceToRender] = useState<number>();

  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();

  const convertedDate = convertRetardedDate(myTicket?.purchasedDate);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}`;
  const [showSuccessSnackBar, setShowSuccessSnackBar] = useState<boolean>(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState<boolean>(false);
  const [showSetupPriceForSaleBanner, setShowSetupPriceForSaleBanner] = useState<boolean>(false);

  const handleSetTicketForSale = (): void => {
    setShowSetupPriceForSaleBanner(true);
  };
  const handleShowSnackBar = (value: boolean): void => {
    if (value) {
      setShowSuccessSnackBar(true);
      setShowSetupPriceForSaleBanner(false);
      setTimeout(() => {
        setShowSuccessSnackBar(false);
      }, 2500);
    } else {
      setShowErrorSnackBar(true);
      setTimeout(() => {
        setShowErrorSnackBar(false);
      }, 2500);
    }
  };
  const handleSetTicketNotForSale = async (): Promise<void> => {
    try {
      if (myTicket && account) {
        const response = await cancelTicketForSale(myTicket.ticketID, account);
        console.log(response);
        setShowSuccessSnackBar(true);
        setTimeout(() => {
          setShowSuccessSnackBar(false);
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      setShowErrorSnackBar(true);
      setTimeout(() => {
        setShowErrorSnackBar(false);
      }, 2500);
    }
  };
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
    const fetchUserTickets = async (): Promise<void> => {
      try {
        if (params.ticketID) {
          const response = await getOneTicketInfo(params.ticketID);
          setMyTicket(response);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsError(false);
      }
    };
    void fetchUserTickets();
  }, [account, showErrorSnackBar, showSuccessSnackBar]);
  const navigate = useNavigate();
  useEffect(() => {
    if (myTicket && account !== myTicket.ticketOwner) {
      navigate('/mytickets');
    }
  }, [account]);
  useEffect(() => {
    if (myTicket && !myTicket?.boughtFromMarket) {
      setPriceToRender(myTicket.ticketPrice);
    } else {
      if (myTicket) {
        const convertedPrice = convertToEth(myTicket.ticketPrice.toString());
        const renderPriceInCzk = Number(convertedPrice) * ethToCzk.ethtoczkprice;
        setPriceToRender(renderPriceInCzk);
      }
    }
  }, [myTicket]);

  return {
    account,
    myTicket,
    priceToRender,
    isLoading,
    isError,
    handleSetTicketNotForSale,
    handleShowSnackBar,
    handleSetTicketForSale,
    renderDate,
    showSuccessSnackBar,
    showErrorSnackBar,
    showSetupPriceForSaleBanner
  };
};
