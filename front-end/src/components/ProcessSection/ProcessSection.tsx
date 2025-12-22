'use client';
import { useState, useEffect, useRef } from 'react';

const ProcessSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps one by one with delay
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Browse Properties',
      description: 'Explore our curated collection of luxury properties'
    },
    {
      number: 2,
      title: 'Book Property',
      description: 'Book a personalized property with our experts'
    },
    {
      number: 3,
      title: 'Payment Process',
      description: 'Secure and hassle-free payment options'
    },
    {
      number: 4,
      title: 'Close Deal',
      description: 'Complete the purchase with full support'
    }
  ];

  return (
    <section ref={sectionRef} className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up'>
            How It <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>Works</span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up'>
            Simple steps to find and secure your dream property
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 relative'>
          {/* Connecting Line */}
          <div className='hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 animate-pulse'></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                visibleSteps.includes(index)
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-10 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 relative transition-all duration-500 ${
                visibleSteps.includes(index)
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 animate-bounce'
                  : 'bg-gray-400'
              }`}>
                {step.number}
                {visibleSteps.includes(index) && (
                  <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 animate-ping opacity-75'></div>
                )}
              </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-amber-500 transition-colors duration-300'>
                {step.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
