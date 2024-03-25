import mongoose from 'mongoose';

const TypeOfPaymentSchema = new mongoose.Schema({
  type_name: String,
  cardCredit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'credit_card',
    required: false,
  },
  bankTransfer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bank_transfer',
    required: false,
  },
});

export const TypeOfPayment = mongoose.model('type_of_payments', TypeOfPaymentSchema);
