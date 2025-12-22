import { Review } from '@/types/review';
import Link from 'next/link';
import ReviewCard from './ReviewCard';

const TestimonialsSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
    cache: 'no-store',
  });
  const data = await res.json();

  const reviews: Review[] = data?.data.slice(0, 3) || [];
  console.log(data);

  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            What Our{' '}
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Clients Say
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto'>
            Trusted by luxury property investors worldwide
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {reviews.map((review: Review, index) => (
            <ReviewCard review={review} key={index} />
          ))}
        </div>
      </div>

      <Link
        href='/reviews'
        className='px-6  py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all dark:from-amber-500 dark:to-amber-600 flex items-center mx-auto mt-12 w-fit'
      >
        Sell All Reviwes
      </Link>
    </section>
  );
};

export default TestimonialsSection;
