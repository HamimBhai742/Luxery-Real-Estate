export const setCookies = async (accessToken: string) => {
  const res = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: accessToken }),
  });
  return await res.json();
};
