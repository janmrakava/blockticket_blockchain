import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString: string = process.env.ATLAS_URI || '';

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose
  .connect(connectionString, connectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB', error);
  });

const db = mongoose.connection;

export { db };
