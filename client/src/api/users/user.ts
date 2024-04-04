import axios, { type AxiosError } from 'axios';

import { type UniqueEmailResult } from '../../pages/Register';
import Cookies from 'universal-cookie';

interface IPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  role: Role;
}
interface IPasswordInfo {
  password: string;
  phoneNumber: string;
}
interface IAddressInfo {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  zipCode: string;
}
export interface IUserData {
  tel_number: any;
  email: any;
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  address: string;
  favorite_events: [];
  prefered_language: string;
  avatar: string;
  last_login: Date;
  transaction: [];
  tickets: [];
  role: string;
  gender: string;
  date_of_birth: Date;
}
interface ILoginResponse {
  user: IUserData;
  token: any;
}

const cookies = new Cookies();

export const checkEmail = async (email: string): Promise<UniqueEmailResult> => {
  try {
    const response = await axios.post(
      '/api/users/checkEmail',
      { email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    return { canUse: false };
  }
};

export const registerUser = async (
  personalInfo: IPersonalInfo,
  passwordInfo: IPasswordInfo,
  addressInfo: IAddressInfo
): Promise<string> => {
  try {
    const response = await axios.post(
      '/api/users/register',
      {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        role: personalInfo.role,
        telNumber: passwordInfo.phoneNumber,
        password: passwordInfo.password,
        dateOfBirth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        address: {
          country: addressInfo.country,
          city: addressInfo.city,
          street: addressInfo.street,
          streetNumber: addressInfo.streetNumber,
          zipCode: addressInfo.zipCode
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const response = await axios.post(
      '/api/users/login',
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const token = response.data.token;
    const user = response.data.user;
    return { user, token };
  } catch (error: unknown) {
    const typedError = error as AxiosError;
    if (typedError.response != null && typedError.response.status === 401) {
      throw new Error('invalid_password');
    } else if (typedError.response != null && typedError.response.status === 404) {
      throw new Error('email_not_found');
    } else {
      throw new Error('server_error');
    }
  }
};

export const getUserInfo = async (userId: string | undefined): Promise<IUserData> => {
  try {
    if (userId != null) {
      const response = await axios.get(`/api/users/getUser/${userId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error occurred while fetching user:', error);
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {} as IUserData;
};

export const addToFavorites = async (userId: string, eventId: string): Promise<string> => {
  try {
    const token = cookies.get('authToken');
    const response = await axios.post(
      '/api/users/addToFavorites',
      { userId, eventId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

export const getUserFavorites = async (
  userId: string | undefined
): Promise<Event[] | undefined> => {
  try {
    const response = await axios.get(`/api/users/getUserFavorites/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error occurred while fetching user favorites:', error);
  }
};

export const getUserTickets = async (userId: string | undefined): Promise<Event[] | undefined> => {
  try {
    const response = await axios.get(`/api/users/getUserTickets/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error occurred while fetching user tickets:', error);
  }
};

export const getUserTransactions = async (
  userId: string | undefined
): Promise<Event[] | undefined> => {
  try {
    const response = await axios.get(`/api/users/getUserTransactions/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error occurred while fetching user tickets:', error);
  }
};
