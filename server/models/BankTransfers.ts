import mongoose from 'mongoose';

const BankTransferSchema = new mongoose.Schema({
  account_holder: String,
  IBAN: String,
  variable_symbol: String,
});

export const BankTransfer = mongoose.model('bank_transfer', BankTransferSchema);
