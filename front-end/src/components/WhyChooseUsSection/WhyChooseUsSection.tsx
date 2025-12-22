import Link from 'next/link';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: "🏆",
      title: "Award Winning",
      description: "Recognized excellence in luxury real estate"
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "100% safe and transparent dealings"
    },
    {
      icon: "💎",
      title: "Premium Properties",
      description: "Exclusive access to luxury listings"
    },
    {
      icon: "🌍",
      title: "Global Network",
      description: "International property connections"
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Always available for your needs"
    },
    {
      icon: "✨",
      title: "Personalized Service",
      description: "Tailored to your unique requirements"
    }
  ];

  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Why{' '}
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Choose Us
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto'>
            Your trusted partner in luxury real estate excellence
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='group flex items-start gap-4 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-xl hover:scale-105 hover:border-blue-500/50 dark:hover:border-amber-500/50 transition-all duration-300'>
              <div className='text-4xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300'>{feature.icon}</div>
              <div>
                <h3 className='font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors duration-300'>{feature.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
