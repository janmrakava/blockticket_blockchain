import { User } from '../models/Users';
import { IUserData } from './types';
import moment from 'moment';
import bcrypt from 'bcrypt';
/**
 * * Function to insert new created user to DB
 * @param data is object of userData
 */
const insertUserToCollection = async (data: IUserData) => {
  const { first_name, last_name, email, tel_number, username, password, date_of_birth, gender, role, prefered_language } = data;
  const dateConverted = moment(date_of_birth, 'DD.MM.YYYY').format();
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash_password = await bcrypt.hash(password, salt);
  const newUser = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    tel_number: tel_number,
    username: username,
    password: hash_password,
    date_registration: new Date(),
    date_of_birth: dateConverted,
    gender: gender,
    role: role,
    last_login: null,
    avatar: null,
    prefered_language: prefered_language,
    favorite_events: null,
  });
  newUser
    .save()
    .then((result) => console.log(`New user created with id ${result._id}`))
    .catch((err) => {
      console.log('New user is not created', err);
      return false;
    });
};
/**
 * * Function to verify if user enter right password
 * @param username
 * @param password
 * @returns true/false
 */
const verifyUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return true;
  } else {
    return false;
  }
};
/**
 * ! Function to call verifyUser func
 * TODO Later will be moved to route for login
 */
verifyUser('johndoe', 'johndoesasa')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
export { insertUserToCollection, verifyUser };
