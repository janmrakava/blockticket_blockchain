import mongoose from 'mongoose';

const EventAddressSchema = new mongoose.Schema({
  name_of_place: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  countryShortcut: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  street_number: { type: String, required: true, trim: true },
  zip_code: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true },
});

export const EventAddress = mongoose.model('event_addresses', EventAddressSchema);
