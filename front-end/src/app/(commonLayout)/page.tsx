import HeroSection from '@/components/HeroSection/HeroSection';
import StatsSection from '@/components/StatsSection/StatsSection';

export default function Home() {
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-amber-50 dark:from-black dark:via-gray-900 dark:to-black'>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Properties Preview */}
   

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
