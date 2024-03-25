import axios from 'axios';
import { type Event } from '../../utils/interfaces';

export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  try {
    const response = await axios.get(`/api/events/getByCategory/${category}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getEventsByCityCategoryTime = async (
  city: string,
  category: string,
  timeFilter: string
): Promise<Event[]> => {
  try {
    const response = await axios.get(
      `/api/events/getEventsByCityCategoryTime/${city}/${category}/${timeFilter}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
