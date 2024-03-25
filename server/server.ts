import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { EventController } from './controllers/EventController';
import './conn';
import { EventAddressController } from './controllers/EventAddressController';
import { UserController } from './controllers/UserController';
import { TicketController } from './controllers/TicketController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/events', EventController);

app.use('/addresses', EventAddressController);

app.use('/users', UserController);

app.use('/tickets', TicketController);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
