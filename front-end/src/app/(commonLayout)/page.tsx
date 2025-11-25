import HeroSection from '@/components/HeroSection/HeroSection';

export default function Home() {
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-amber-50 dark:from-black dark:via-gray-900 dark:to-black'>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              { value: '500+', label: 'Premium Properties' },
              { value: '50+', label: 'Cities Worldwide' },
              { value: '10K+', label: 'Happy Clients' },
              { value: '$2B+', label: 'Property Value' },
            ].map((stat, index) => (
              <div
                key={index}
                className='relative p-8 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300'
              >
                <div className='text-4xl font-bold bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2'>
                  {stat.value}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Featured Properties
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-400'>
              Handpicked luxury estates for discerning buyers
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300'
              >
                <div className='aspect-[4/3] bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900' />
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                    Luxury Villa {item}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
                    Beverly Hills, California
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent'>
                      ${item * 2}.5M
                    </span>
                    <button className='px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all'>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='relative p-12 rounded-3xl bg-linear-to-br from-amber-500 to-amber-600 overflow-hidden'>
            <div className='absolute inset-0 bg-black/10' />
            <div className='relative'>
              <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
                Ready to Find Your Dream Home?
              </h2>
              <p className='text-lg text-white/90 mb-8'>
                Let our expert team guide you through your luxury property
                journey
              </p>
              <button className='px-8 py-4 bg-white text-amber-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300'>
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
