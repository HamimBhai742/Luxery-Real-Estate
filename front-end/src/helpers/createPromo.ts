export interface PromoFormData {
  code: string;
  discount: number;
  fromValid: string;
  toValid: string;
}

export const createPromo = async (formData: PromoFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await res.json();
  return data;
};
