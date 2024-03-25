import { Router } from 'express';
import { Request, Response } from 'express';
import { EventAddress } from '../models/EventsAddresses';

export const EventAddressController = Router();

/**
 * * GET methods
 */

EventAddressController.get('/getAll', async (req: Request, res: Response) => {
  try {
    const addresses = await EventAddress.find();
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ error: 'Addresses not found' });
    }
    res.send(addresses).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

EventAddressController.get('/getOne/:id', async (req: Request, res: Response) => {
  try {
    const address = await EventAddress.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.send(address).status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

EventAddressController.get('/getByCity/:city', async (req: Request, res: Response) => {
  const searchName = req.params.city;
  try {
    const addressess = await EventAddress.find({
      $or: [{ city: { $regex: searchName, $options: 'i' } }],
    });
    if (!addressess || addressess.length === 0) {
      return res.status(404).json({ error: 'No Events Found with that name' });
    }
    res.send(addressess).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Interval server error' });
  }
});

EventAddressController.get('/getUniqueCities', async (req: Request, res: Response) => {
  try {
    const uniqueCities = await EventAddress.aggregate([
      {
        $group: {
          _id: { city: '$city', countryShortcut: '$countryShortcut' }, // Použijeme city a countryShortcut pro identifikaci města
        },
      },
      {
        $project: {
          city: '$_id.city',
          countryShortcut: '$_id.countryShortcut',
          _id: 0,
        },
      },
    ]);

    if (!uniqueCities || uniqueCities.length === 0) {
      return res.status(404).json({ error: 'No Unique Cities Found' });
    }

    return res.json(uniqueCities);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * * POST methods
 */

EventAddressController.post('/post', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newAddress = new EventAddress(data);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * * DELETE methods
 */
EventAddressController.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const address = await EventAddress.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ error: 'Address Not Found' });
    }
    res.status(204).send(`Address with ${address?._id} was deleted`);
  } catch (error) {
    res.status(400).send({ error: 'Invalid request' });
  }
});

/**
 * * PUT methods
 */
EventAddressController.put('/update/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedAddress = await EventAddress.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
