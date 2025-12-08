import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { ENV } from './env';
import { prisma } from './prisma.configs';
import { Auth_Provider, Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

//gmail and pass login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done) => {
      try {
        const isExsist = await prisma.user.findUnique({ where: { email } });
        if (!isExsist) {
          return done(null, false, {
            message: 'Invalid email. Please enter a registered email address',
          });
        }
        const isGoogle = isExsist.provider === Auth_Provider.google;

        if (isGoogle && !isExsist.password) {
          return done(null, false, { message: 'You have login google' });
        }

        if (isExsist.status === 'inactive') {
          return done(null, false, {
            message: `${isExsist.role} is ${isExsist.status}`,
          });
        }

        if (isExsist.isDeleted) {
          return done(null, false, { message: `${isExsist.role} is deleted` });
        }

        const isMatchPassword = await bcryptjs.compare(
          password as string,
          isExsist?.password as string
        );

        if (!isMatchPassword) {
          return done(null, false, {
            message: 'Incorrect password. Please try again.',
          });
        }
        return done(null, isExsist);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Configure the Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV.CALL_BACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails![0].value;
        if (!email) {
          return done(null, false, { message: 'Email not found' });
        }
        let user = await prisma.user.findUnique({ where: { email } });
        if (user?.isDeleted) {
          return done(null, false, { message: 'User is deleted' });
        }

        if (user?.status === 'inactive') {
          return done(null, false, { message: 'User is inactive' });
        }
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              profile: profile.photos![0].value,
              name: profile.displayName,
              provider: Auth_Provider.google,
              providerId: profile.id,
              role: Role.USER,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
  }
);

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
