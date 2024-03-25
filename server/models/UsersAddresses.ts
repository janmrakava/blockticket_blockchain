import mongoose from 'mongoose';

const UserAddressSchema = new mongoose.Schema({
  country: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  street_number: { type: String, required: true, trim: true },
  zip_code: { type: String, required: true, trim: true },
});

export const UserAddress = mongoose.model('users_addresses', UserAddressSchema);
