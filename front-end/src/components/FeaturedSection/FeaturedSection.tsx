import { Property } from '@/types/property';
import PropertyCard from '../Properties/PropertyCard';
import Link from 'next/link';

const FeaturedSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property`);
  const data = await res.json();
  const properties = data.data.properties.slice(0, 3);
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Featured Properties
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400'>
            Handpicked luxury estates for discerning buyers
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className='text-center'>
          <Link
            href='/properties'
            className='mt-8 text-lg inline-block dark:bg-amber-600 dark:hover:bg-amber-700 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded'
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
