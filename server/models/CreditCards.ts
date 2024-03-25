import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
  owner_name: String,
  card_number: String,
  security_code: Number,
  expiration_date: Date,
});

export const CreditCard = mongoose.model('credit_cards', CreditCardSchema);
