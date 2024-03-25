import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  price: Number,
  date: Date,
  ticketIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tickets',
    },
  ],
  method: String,
  state: {
    type: String,
    enum: ['Paid', 'Not paid', 'Cancelled', 'Returned'],
  },
});

export const Transaction = mongoose.model('transaction', TransactionSchema);
