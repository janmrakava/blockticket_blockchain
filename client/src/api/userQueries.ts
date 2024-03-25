import { useQuery, type UseQueryResult } from 'react-query';
import { type TicketWithId, type Event, type Transaction } from '../utils/interfaces';
import {
  type IUserData,
  getUserFavorites,
  getUserInfo,
  getUserTickets,
  getUserTransactions
} from './users/user';

export interface IOneEvent {
  data: Event;
  error: Error | null;
  isLoading: boolean;
  category_of_event: string;
}

const intervalMs = 3000;

export const useGetUserInfo = (userId: string | undefined): UseQueryResult<IUserData> => {
  return useQuery(['userInfo', userId], async () => await getUserInfo(userId), {
    refetchInterval: intervalMs,
    enabled: userId !== ''
  });
};

export const useGetUserFavorites = (userId: string | undefined): UseQueryResult<Event[]> => {
  return useQuery(['userInfo', userId], async () => await getUserFavorites(userId), {
    refetchInterval: intervalMs,
    enabled: userId !== ''
  });
};

export const useGetUserTickets = (
  userId: string | undefined
): UseQueryResult<TicketWithId[] | undefined> => {
  return useQuery(['userInfo', userId], async () => await getUserTickets(userId), {
    refetchInterval: intervalMs,
    enabled: userId !== ''
  });
};

export const useGetUserTransactions = (
  userId: string | undefined
): UseQueryResult<Transaction[] | undefined> => {
  return useQuery(['userInfo', userId], async () => await getUserTransactions(userId), {
    refetchInterval: intervalMs,
    enabled: userId !== ''
  });
};
