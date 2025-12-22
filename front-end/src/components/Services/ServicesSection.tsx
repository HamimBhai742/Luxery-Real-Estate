const ServicesSection = () => {
  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Our{' '}
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Premium Services
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto'>
            Experience luxury real estate services tailored to your needs
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='group bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-500/50 dark:hover:border-amber-500/50 transition-all duration-500 cursor-pointer'>
            <div className='text-4xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300'>🏠</div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors duration-300'>
              Property Consultation
            </h3>
            <p className='text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
              Expert guidance to find your perfect luxury property
            </p>
          </div>
          <div className='group bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-500/50 dark:hover:border-amber-500/50 transition-all duration-500 cursor-pointer'>
            <div className='text-4xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300'>📈</div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors duration-300'>
              Investment Advisory
            </h3>
            <p className='text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
              Strategic investment advice for maximum returns
            </p>
          </div>
          <div className='group bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-500/50 dark:hover:border-amber-500/50 transition-all duration-500 cursor-pointer'>
            <div className='text-4xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300'>🔧</div>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors duration-300'>
              Property Management
            </h3>
            <p className='text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
              Complete property management and maintenance services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
