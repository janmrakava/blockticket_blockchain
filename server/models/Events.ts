import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: {
      en: String,
      cs: String,
    },
    required: true,
    trim: true,
  },
  category_of_event: {
    type: String,
    enum: ['Music', 'Sport', 'Art', 'Other', 'Family', 'VIP'],
    required: true,
  },
  description: {
    cs: String,
    en: String,
  },
  date_of_the_event: {
    type: Date,
    required: true,
  },
  date_of_start_sell_tickets: {
    type: Date,
    required: true,
  },
  capacity: Number,
  ticket_availabiity: Boolean,
  ticket_types: [
    {
      category: ['Standard', 'VIP', 'Gold', 'Platinum', 'Child'],
      ticket_name: {
        cs: String,
        en: String,
      },
      description: {
        cs: String,
        en: String,
      },
      prices: {
        USD: Number,
        CZK: Number,
        EUR: Number,
      },
      quantity: Number,
      sold: Number,
    },
  ],
  image: String,
  popular: Boolean,
  address_id: {
    type: Schema.Types.ObjectId,
    ref: 'event_addresses',
  },
  tickets: {
    type: Schema.Types.ObjectId,
    ref: 'tickets',
  },
});

export const Event = mongoose.model('event', EventSchema);
