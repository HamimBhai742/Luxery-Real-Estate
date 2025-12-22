/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { createReview } from '@/helpers/createReview';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  propertyName: string;
  propertyId: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  propertyName,
  propertyId,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        rating,
        comment,
        bookingId,
        propertyId,
      };
      const data = await createReview(payload);
      if (data.success) {
        toast.success('Review submitted successfully!');
        onClose();
        setRating(0);
        setComment('');
      }
      if (!data.success) {
        toast.error(data.message);
        onClose();
        setRating(0);
        setComment('');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
            Write a Review
          </h2>
          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors'
          >
            <FiX className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div>
            <h3 className='font-medium text-gray-900 dark:text-white mb-2'>
              {propertyName}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              How was your experience with this property?
            </p>
          </div>

          {/* Rating */}
          <div>
            <label className='block text-sm font-medium text-gray-900 dark:text-white mb-3'>
              Rating
            </label>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className='p-1 transition-transform hover:scale-110'
                >
                  <FiStar
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className='block text-sm font-medium text-gray-900 dark:text-white mb-2'>
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Share your experience...'
              rows={4}
              className='w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none'
            />
          </div>

          {/* Actions */}
          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            >
              {loading ? (
                <>
                  <ImSpinner9 className='animate-spin w-4 h-4' />
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
