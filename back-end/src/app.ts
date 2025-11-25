import express, { Request, Response } from 'express';
import 'dotenv/config';
import { router } from './routes/routes';
import cors from 'cors';
import { notFound } from './middleware/not.found';
import { globalErrorHandel } from './middleware/global.error';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Luxiery Real Estate Server Running.........');
});

app.use(globalErrorHandel);
app.use(notFound);
