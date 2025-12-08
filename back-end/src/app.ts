import express, { Request, Response } from 'express';
import 'dotenv/config';
import { router } from './routes/routes';
import cors from 'cors';
import { notFound } from './middleware/not.found';
import { globalErrorHandel } from './middleware/global.error';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { ENV } from './config/env';
import './config/passport';
export const app = express();

app.use(
  session({
    secret: ENV.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://luxery-real-estate-742.vercel.app',
    ],
    credentials: true,
  })
);

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Luxiery Real Estate Server Running.........');
});

app.use(globalErrorHandel);
app.use(notFound);
