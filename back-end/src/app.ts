import express, { Request, Response } from 'express';
import 'dotenv/config';
import { router } from './routes/routes';
import cors from 'cors';
import { notFound } from './middleware/not.found';
import { globalErrorHandel } from './middleware/global.error';
import cookieParser from 'cookie-parser';

export const app = express();


// ------------------ CORS FIRST --------------------
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://luxery-real-estate-742.vercel.app",
    ],
    credentials: true,
  })
);

// necessary for credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ----------------------------------------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Luxiery Real Estate Server Running.........');
});

app.use(globalErrorHandel);
app.use(notFound);
