import Properties from '@/components/Properties/Properties';
import { Property } from '@/types/property';

export default async function PropertiesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const properties: Property[] = data.data;
  console.log(properties)
  return (
    <div>
      <Properties properties={properties} />
    </div>
  );
}
