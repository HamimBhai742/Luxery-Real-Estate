const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Investor",
      image: "👩‍💼",
      text: "Exceptional service and expertise. Found my dream luxury property within weeks!"
    },
    {
      name: "Michael Chen",
      role: "Business Owner", 
      image: "👨‍💼",
      text: "Professional team that understands luxury real estate market perfectly."
    },
    {
      name: "Emma Davis",
      role: "Real Estate Developer",
      image: "👩‍🏭",
      text: "Outstanding investment advice that maximized my portfolio returns."
    }
  ];

  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            What Our{' '}
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Clients Say
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto'>
            Trusted by luxury property investors worldwide
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='group bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500'>
              <div className='text-6xl mb-4 group-hover:scale-110 transition-transform duration-300'>{testimonial.image}</div>
              <p className='text-gray-600 dark:text-gray-400 mb-6 italic'>"{testimonial.text}"</p>
              <div>
                <h4 className='font-bold text-gray-900 dark:text-white'>{testimonial.name}</h4>
                <p className='text-sm text-blue-600 dark:text-amber-500'>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
