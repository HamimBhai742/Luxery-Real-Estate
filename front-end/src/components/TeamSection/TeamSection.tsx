const TeamSection = () => {
  const team = [
    {
      name: "Alex Rodriguez",
      role: "Senior Property Consultant",
      image: "👨‍💼",
      experience: "15+ Years"
    },
    {
      name: "Jessica Williams", 
      role: "Investment Advisor",
      image: "👩‍💼",
      experience: "12+ Years"
    },
    {
      name: "David Thompson",
      role: "Luxury Property Specialist",
      image: "👨‍🏢",
      experience: "18+ Years"
    }
  ];

  return (
    <section className='relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Meet Our{' '}
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Expert Team
            </span>
          </h2>
          <p className='text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto'>
            Experienced professionals dedicated to your success
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {team.map((member, index) => (
            <div key={index} className='group text-center bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500'>
              <div className='text-8xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300'>{member.image}</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors duration-300'>{member.name}</h3>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>{member.role}</p>
              <span className='inline-block bg-blue-100 dark:bg-amber-100 text-blue-800 dark:text-amber-800 px-3 py-1 rounded-full text-sm font-medium'>
                {member.experience}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
