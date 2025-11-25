'use client';
export const getMe = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: 'POST',
    credentials: 'include',
  });
  const user = await res.json();
  return user;
};
