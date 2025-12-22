'use client';
import { Review } from '@/types/review';
import Image from 'next/image';
import RatingStars from './RatingStart';

const ReviewCard = ({ review }: { review: Review }) => {
  const redirectToProperty = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/property/find-single-property/${id}`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();
    console.log(data);
    if (data?.data) {
      window.location.href = `/properties/${data.data.slug}`;
    }
  };
  return (
      <div onClick={() => redirectToProperty(review.propertyId)} className='group bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500'>
        <div className='text-6xl mb-4 group-hover:scale-110 transition-transform duration-300'>
          {review.user.profile ? (
            <Image
              src={review.user.profile}
              alt='profile'
              width={50}
              height={50}
              className='w-16 h-16 rounded-full object-cover'
            />
          ) : (
            '👤'
          )}
        </div>
        <RatingStars rating={review.rating} />
        <p className='text-gray-600 dark:text-gray-400 mb-6 italic'>
          {review.comment}
        </p>
        <div>
          <h4 className='font-bold text-gray-900 dark:text-white'>
            {review.user.name}
          </h4>
          <p className='text-sm text-blue-600 dark:text-amber-500'>
            {review.user.email}
          </p>
        </div>
      </div>
  );
};

export default ReviewCard;
