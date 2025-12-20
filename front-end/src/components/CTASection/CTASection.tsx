'use client';

import Link from 'next/link';

const CTASection = () => {
  return (
    <>
      <section className='relative pb-10  px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='relative p-12 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-500'>
            <div className='absolute inset-0 bg-black/10' />
            <div className='relative animate-fade-in'>
              <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4 animate-slide-up'>
                Ready to Find Your Dream Home?
              </h2>
              <p className='text-lg text-white/95 mb-8 animate-slide-up animate-delay-200'>
                Let our expert team guide you through your luxury property
                journey
              </p>
              <button
              onClick={() => { window.location.href = '/properties'; }}
                className='px-8 py-4 bg-white text-blue-600 dark:text-amber-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce-subtle'
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
};

export default CTASection;
