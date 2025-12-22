import { IoStarOutline, IoStarSharp } from 'react-icons/io5';

const RatingStars = ({ rating }: { rating: number }) => {
  console.log(rating);
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <IoStarSharp className='text-amber-500 text-lg' />
          ) : (
            <IoStarOutline className=' text-lg' />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
