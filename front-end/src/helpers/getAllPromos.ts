export const getAllPromos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    credentials: 'include',
  });
  
  const data = await res.json();
  return data;
};
