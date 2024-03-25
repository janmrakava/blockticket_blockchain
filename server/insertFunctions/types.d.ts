import { ObjectId } from 'mongoose';

export interface IUserData {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  tel_number: string;
  username: string;
  password: string;
  date_of_birth: string;
  gender: string;
  role: string;
  prefered_language: string;
}
