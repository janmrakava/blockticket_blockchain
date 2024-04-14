/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import { type DecodedToken } from '../pages/Home/useHome';
import Cookies from 'universal-cookie';
import { useGetUserTransactions } from '../api/userQueries';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { type Transaction } from '../utils/interfaces';
import NothingToShowBanner from '../components/FavoritesPage/NoFavoriteEvents';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export const usePreviousOrders = (): any => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('authToken');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      setUserLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  const {
    data: transactionsData,
    isLoading: transactionsDataLoading,
    error: transactionsDataError
  } = useGetUserTransactions(userId);

  const navigate = useNavigate();

  const handleNavigate = (transactionID: string): void => {
    navigate(`/transactionInfo/${transactionID}`);
  };

  const renderTable = (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.id" />
            </TableCell>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.date" />
            </TableCell>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.price" />
            </TableCell>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.count" />
            </TableCell>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.state" />
            </TableCell>
            <TableCell sx={{ color: '#fff' }}>
              <FormattedMessage id="app.transactionpage.method" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsData && transactionsData.length > 0 ? (
            transactionsData?.map((transaction: Transaction, index: number) => {
              const ticketIDs = transaction.ticketIDs || [];
              const numberOfTickets = ticketIDs.length;
              const transactionDate = new Date(transaction.date);
              const yyyy = transactionDate.getFullYear();
              const mm = transactionDate.getMonth() + 1; // Měsíce začínají od 0
              const dd = transactionDate.getDate();
              const formattedDate = `${dd}.${mm}.${yyyy}`;
              return (
                <TableRow
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleNavigate(transaction._id);
                  }}>
                  <TableCell sx={{ color: '#fff' }}>{transaction._id}</TableCell>
                  <TableCell sx={{ color: '#fff', paddingLeft: '50px' }}>{formattedDate}</TableCell>
                  <TableCell sx={{ color: '#fff', paddingLeft: '50px' }}>
                    {transaction.price}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', paddingLeft: '60px' }}>
                    {numberOfTickets}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', paddingLeft: '60px' }}>
                    {transaction.state}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', paddingLeft: '50px' }}>
                    {transaction.method}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <NothingToShowBanner text="notransactions" />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return {
    userLoggedIn,
    transactionsDataLoading,
    transactionsDataError,
    renderTable
  };
};
