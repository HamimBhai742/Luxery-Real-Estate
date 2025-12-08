import { ENV } from '../config/env';
import { createJwtToken } from './create.token';

export const createUserToken = (payload: any) => {
  const jsonPayload = {
    userId: payload.id,
    email: payload.email,
    role: payload.role,
  };
console.log(jsonPayload)
  const accessToken = createJwtToken(
    jsonPayload,
    ENV.JWT_SECRET,
    ENV.JWT_EXPIRES_IN
  );

  return {
    accessToken,
  };
};
