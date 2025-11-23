import express, { Request, Response } from 'express';
import 'dotenv/config';
import { router } from './routes/routes';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Luxiery Real Estate Server Running.........');
});
