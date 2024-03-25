import axios from 'axios';
import { type Ticket } from '../../utils/interfaces';

export const createNewTicket = async (
  userId: string,
  tickets: Ticket[],
  priceSum: number,
  method: string
): Promise<string[]> => {
  try {
    const response = await axios.post(
      '/api/tickets/new-ticket',
      {
        userId,
        tickets,
        priceSum,
        method
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error when creating ticket :', error);
    throw error;
  }
};
