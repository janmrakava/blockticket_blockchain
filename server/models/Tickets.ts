import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  name: String,
  price: Number,
  place: String,
  city: String,
  image: String,
  date: Date,
  ticket_category: {
    type: String,
    enum: ['Standard', 'VIP', 'Gold', 'Platinum'],
  },
  zone: {
    cs: String,
    en: String,
  },
  sector: {
    cs: String,
    en: String,
  },
  row: Number,
  seat: Number,
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transaction',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  },
});

export const Ticket = mongoose.model('ticket', TicketSchema);
