export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  ADMIN_PASS_SALT_ROUNDS: Number(process.env.ADMIN_PASS_SALT_ROUNDS),

  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),

  SSL_STORE_ID: process.env.SSL_STORE_ID as string,
  SSL_STORE_PASSWORD: process.env.SSL_STORE_PASSWORD as string,

  SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
  SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
  SSL_IPN_URL: process.env.SSL_IPN_URL as string,

  SSL_SUCCESS_BACK_END_URL: process.env.SSL_SUCCESS_BACK_END_URL as string,
  SSL_FAILED_BACK_END_URL: process.env.SSL_FAILED_BACK_END_URL as string,
  SSL_CANCEL_BACK_END_URL: process.env.SSL_CANCEL_BACK_END_URL as string,

  SSL_SUCCESS_FRONT_END_URL: process.env.SSL_SUCCESS_FRONT_END_URL as string,
  SSL_FAIL_FRONT_END_URL: process.env.SSL_FAIL_FRONT_END_URL as string,
  SSL_CANCEL_FRONT_END_URL: process.env.SSL_CANCEL_FRONT_END_URL as string,

  CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL as string,
};
