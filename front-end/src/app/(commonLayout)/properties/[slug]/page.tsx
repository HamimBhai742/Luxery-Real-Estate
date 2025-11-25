'use client';
import CardDetails from '@/components/Properties/CardDetails';
import { Property } from '@/types/property';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PropertiesDetailsPage = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const { slug } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property/${slug}`,
        {
          cache: 'no-store',
        }
      );
      const data = await res.json();
      setProperty(data.data);
    };
    fetchData();
  }, [slug]);
  return (
    <div>
      <CardDetails property={property as Property} />
    </div>
  );
};

export default PropertiesDetailsPage;
