import express, { Request, Response } from 'express';
import 'dotenv/config';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use()

app.get('/', (req: Request, res: Response) => {
  res.send('Luxiery Real Estate Server Running.........');
});


