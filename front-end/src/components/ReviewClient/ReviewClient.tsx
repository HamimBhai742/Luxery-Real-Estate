'use client';
import { Review } from '@/types/review';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReviewCard from '../TestimonialsSection/ReviewCard';
import { FiStar, FiUsers, FiMessageCircle } from 'react-icons/fi';

const ReviewClient = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (data?.data) {
          setReviews(data.data);
          calculateStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateStats = (reviewsData: Review[]) => {
    const total = reviewsData.length;
    const avgRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / total;
    const ratingCounts = reviewsData.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    setStats({
      totalReviews: total,
      averageRating: Number(avgRating.toFixed(1)),
      fiveStars: ratingCounts[5] || 0,
      fourStars: ratingCounts[4] || 0,
      threeStars: ratingCounts[3] || 0,
      twoStars: ratingCounts[2] || 0,
      oneStars: ratingCounts[1] || 0,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 w-1/3"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent mb-6">
            Client Reviews
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover what our clients say about their luxury real estate experience with us
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">
              <FiUsers className="mx-auto text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.totalReviews}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Reviews</p>
          </div>

          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">
              <FiStar className="mx-auto text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.averageRating}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
          </div>

          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">
              <FiMessageCircle className="mx-auto text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {Math.round((stats.fiveStars / stats.totalReviews) * 100)}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400">5-Star Reviews</p>
          </div>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: Review, index) => (
              <ReviewCard review={review} key={review.id || index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to share your experience with us!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewClient;
