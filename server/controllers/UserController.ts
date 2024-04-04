import { Router } from 'express';
import { Request, Response } from 'express';
import { User } from '../models/Users';
import { UserAddress } from '../models/UsersAddresses';
import bcrypt from 'bcrypt';
import { createToken } from './helpFunctions/helpFunctions';
import { IUserData } from '../insertFunctions/types';
import auth from './auth';
import jwt from 'jsonwebtoken';
import { Ticket } from '../models/Tickets';
import { Transaction } from '../models/Transactions';

export const UserController = Router();

UserController.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, dateOfBirth, role, gender, telNumber, password, address } = req.body;

  const genderToSend = gender === '' ? 'Not specified' : gender;
  try {
    const addressData = address;
    const userAddress = new UserAddress({
      country: addressData.country,
      city: addressData.city,
      street: addressData.street,
      street_number: addressData.streetNumber,
      zip_code: addressData.zipCode,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedAddress = await userAddress.save();
    //const dateConverted = moment(dateOfBirth, 'DD.MM.YYYY').format();
    const newUser = new User({
      first_name: firstName,
      last_name: lastName,
      email: email,
      tel_number: telNumber,
      username: '',
      password: hashedPassword,
      date_registration: new Date(),
      date_of_birth: dateOfBirth,
      gender: genderToSend,
      role: role,
      last_login: null,
      avatar: null,
      prefered_language: 'cs',
      address: savedAddress._id,
    });

    await newUser.save();
    const token = createToken(newUser.toObject() as IUserData);
    console.log(newUser);
    res.status(200).json({ status: 'success', data: [newUser], message: 'Registration was succesfull.', token });
  } catch (error) {
    res.status(500).json({ status: 'error', data: [], message: 'Chyba serveru.', error });
  }
});

UserController.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Uživatel nenalezen' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Neplatné heslo' });
    }

    const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWTTOKEN as string, { expiresIn: '10h' });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interní chyba serveru' });
  }
});

UserController.get('/getUser/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('address');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

UserController.get('/getUserTickets/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('ticket');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user.ticket).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

UserController.get('/getUserTransactions/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('transaction');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user.transaction).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});
UserController.get('/getUserFavorites/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('favorite_events');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(user.favorite_events).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

UserController.put('/updateUser/:userId', auth, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { updatedUserData, updatedAddressData } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    const userAddressId = updatedUser?.address;
    const updatedAddress = await UserAddress.findByIdAndUpdate(userAddressId, updatedAddressData, {
      new: true,
    });

    res.status(200).json({ user: updatedUser, address: updatedAddress });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

UserController.delete('/deleteUser/:userId', auth, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userAddressId = user.address;
    const userAddress = await UserAddress.findById(userAddressId);

    await User.findByIdAndDelete(userId);

    if (userAddress) {
      await UserAddress.findByIdAndDelete(userAddressId);
    }
    res.status(200).json({ message: 'User and address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
UserController.post('/addToFavorites', async (req: Request, res: Response) => {
  try {
    auth(req, res, async () => {
      const { userId, eventId } = req.body;

      if (!userId || !eventId) {
        return res.status(400).json({ error: 'Missing userId or eventId.' });
      }
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User was not found!' });
      }

      const index = user.favorite_events.indexOf(eventId);
      if (index === -1) {
        const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { favorite_events: eventId } }, { new: true });
        res.json({ updatedUser, message: 'Event was added to favorites.' });
      } else {
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { favorite_events: eventId } }, { new: true });
        res.json({ updatedUser, message: 'Event was remove from favorites.' });
      }
    });
  } catch (error) {
    console.error('Error when add to favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

UserController.post('/checkEmail', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ canUse: false, message: 'Email already exists!' });
    } else {
      return res.status(200).json({ canUse: true, message: 'Email is free to use.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

UserController.post('/checkUsername', async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ exists: true, message: 'Username already exists!' });
    } else {
      return res.status(200).json({ exists: false, message: 'Username is free to use.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// free endpoint
UserController.get('/free-endpoint', (req: Request, res: Response) => {
  res.json({ message: 'You are free to access me anytime' });
});

// authentication endpoint
UserController.get('/auth-endpoint', auth, (req: Request, res: Response) => {
  res.json({ message: 'You are authorized to access me' });
});
