import axios from 'axios';
import { type Address } from '../../utils/interfaces';

export const getUniqueCities = async (): Promise<Address | []> => {
  try {
    const response = await axios.get(`/api/addresses/getUniqueCities`);
    return response.data;
  } catch (error) {
    return [];
  }
};
