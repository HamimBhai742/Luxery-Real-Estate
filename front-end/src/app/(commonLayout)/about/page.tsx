/* eslint-disable @next/next/no-html-link-for-pages */
import StatsCounter from '@/components/StatsCounter';
import TeamCard from '@/components/TeamCard';

export const metadata = {
  title: 'About Us - Luxury Real Estate',
  description: 'Learn more about our company and our team',
};

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', prefix: '' },
  { value: 10000, suffix: '+', label: 'Properties Sold', prefix: '' },
  { value: 50000, suffix: '+', label: 'Happy Clients', prefix: '' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', prefix: '' },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'With over 20 years in luxury real estate, Sarah leads our vision of redefining property excellence and client satisfaction.',
    social: { linkedin: '#', twitter: '#', email: 'sarah@luxury.com' },
  },
  {
    name: 'Michael Chen',
    role: 'Head of Sales',
    bio: 'Michael brings expertise in high-value transactions and has closed over $500M in luxury property deals.',
    social: { linkedin: '#', twitter: '#', email: 'michael@luxury.com' },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Chief Marketing Officer',
    bio: 'Emily crafts compelling narratives that showcase the unique character of each luxury property in our portfolio.',
    social: { linkedin: '#', twitter: '#', email: 'emily@luxury.com' },
  },
  {
    name: 'David Park',
    role: 'Investment Advisor',
    bio: 'David provides strategic insights for clients looking to invest in premium real estate opportunities worldwide.',
    social: { linkedin: '#', twitter: '#', email: 'david@luxury.com' },
  },
];

const values = [
  {
    icon: '💎',
    title: 'Excellence',
    description:
      'We maintain the highest standards in every property and service we offer.',
  },
  {
    icon: '🤝',
    title: 'Integrity',
    description:
      'Trust and transparency form the foundation of all our client relationships.',
  },
  {
    icon: '🎯',
    title: 'Innovation',
    description:
      'We leverage cutting-edge technology to enhance the property buying experience.',
  },
  {
    icon: '🌟',
    title: 'Luxury',
    description:
      'Every detail is curated to deliver an unparalleled luxury experience.',
  },
];

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black'>
      {/* Hero Section with Parallax */}
      <section className='relative min-h-[70vh] flex items-center justify-center overflow-hidden'>
        {/* Parallax Background */}
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-blue-300/30 dark:bg-amber-600/10 rounded-full blur-3xl animate-parallax-float'></div>
          <div
            className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/30 dark:bg-amber-500/10 rounded-full blur-3xl animate-parallax-float'
            style={{ animationDelay: '2s' }}
          ></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-blue-200/20 to-indigo-200/20 dark:from-amber-900/5 dark:to-orange-900/5 rounded-full blur-3xl'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-4xl mx-auto px-4 lg:px-8 text-center pt-20'>
          <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
            Redefining Luxury
            <br />
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Real Estate
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto'>
            For over 15 years, we&apos;ve been connecting discerning clients
            with the world&apos;s most exceptional properties.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className='absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce'>
          <svg
            className='w-6 h-6 text-blue-600 dark:text-amber-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Story Section */}
      <section className='py-20 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'>
                Our Story
              </h2>
              <div className='space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed'>
                <p>
                  Founded in 2010, Luxury Real Estate began with a simple
                  vision: to transform the way people experience premium
                  properties. What started as a boutique agency has grown into a
                  global leader in luxury real estate.
                </p>
                <p>
                  Our journey has been marked by unwavering commitment to
                  excellence, innovation, and client satisfaction. We&apos;ve
                  facilitated over 10,000 property transactions, helping
                  families find their dream homes and investors discover
                  exceptional opportunities.
                </p>
                <p>
                  Today, we continue to push boundaries, leveraging cutting-edge
                  technology and deep market expertise to deliver unparalleled
                  service in the luxury real estate sector.
                </p>
              </div>
            </div>
            <div className='relative h-[500px] bg-linear-to-br from-blue-100 to-indigo-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-3xl overflow-hidden shadow-2xl'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <svg
                  className='w-32 h-32 text-blue-600 dark:text-amber-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20 bg-linear-to-b from-white to-slate-50 dark:from-black dark:to-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Our Core Values
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-400'>
              The principles that guide everything we do
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, idx) => (
              <div
                key={idx}
                className='group bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
              >
                <div className='text-5xl mb-4 group-hover:scale-110 transition-transform'>
                  {value.icon}
                </div>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-700 dark:text-gray-400 leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Meet Our Team
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-400'>
              Expert professionals dedicated to your success
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {team.map((member, idx) => (
              <TeamCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className='relative z-10'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                Ready to Find Your Dream Property?
              </h2>
              <p className='text-xl text-white/90 mb-8'>
                Let our experts guide you to the perfect luxury home
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a
                  href='/properties'
                  className='px-8 py-4 bg-white text-blue-600 dark:text-amber-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
                >
                  Browse Properties
                </a>
                <a
                  href='/contact'
                  className='px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 dark:hover:text-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
