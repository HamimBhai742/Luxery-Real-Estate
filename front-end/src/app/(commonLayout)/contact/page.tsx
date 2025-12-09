import ContactForm from '@/components/ContactForm';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = {
  title: 'Contact - Luxury Real Estate',
  description:
    'Get in touch with us for any inquiries or to learn more about our services.',
};

const contactMethods = [
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        />
      </svg>
    ),
    title: 'Phone',
    value: '(+880) 19263-13093',
    description: 'Mon-Fri 9am-6pm EST',
    link: 'tel:+8801926313093',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
    title: 'Email',
    value: 'mdhamim5088@gmail.com',
    description: 'We reply within 24 hours',
    link: 'mailto:mdhamim5088@gmail.com',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    ),
    title: 'Office',
    value: '179/9, Gabtola, Mogbazar, Dhaka',
    description: 'Visit our headquarters',
    link: '#map',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
        />
      </svg>
    ),
    title: 'Live Chat',
    value: 'Chat with us',
    description: 'Available 24/7',
    link: '#',
  },
];

const faqs = [
  {
    question: 'What areas do you serve?',
    answer:
      'We serve major metropolitan areas across the United States, with offices in New York, Los Angeles, and Miami.',
  },
  {
    question: 'How long does the buying process take?',
    answer:
      'Typically 30-60 days from offer acceptance to closing, depending on financing and inspection requirements.',
  },
  {
    question: 'Do you offer virtual property tours?',
    answer:
      'Yes, we provide comprehensive virtual tours with 3D walkthroughs for all our luxury properties.',
  },
];

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black'>
      {/* Hero Section */}
      <section className='relative min-h-[50vh] flex items-center justify-center overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute inset-0'>
          <div className='absolute top-20 right-10 w-72 h-72 bg-blue-300/30 dark:bg-amber-600/10 rounded-full blur-3xl animate-parallax-float'></div>
          <div
            className='absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/30 dark:bg-amber-500/10 rounded-full blur-3xl animate-parallax-float'
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-4xl mx-auto px-4 text-center pt-20'>
          <div className='inline-block mb-6 px-6 py-2 bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-800/20 shadow-lg'>
            <span className='text-blue-600 dark:text-amber-400 font-semibold'>
              Get In Touch
            </span>
          </div>
          <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
            Let&apos;s Start a
            <br />
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent'>
              Conversation
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto'>
            Our team of experts is ready to help you find your perfect luxury
            property
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className='py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                className='group bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center'
              >
                <div className='w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 dark:from-amber-400 dark:to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50'>
                  {method.icon}
                </div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
                  {method.title}
                </h3>
                <p className='text-blue-600 dark:text-amber-400 font-semibold mb-1'>
                  {method.value}
                </p>
                <p className='text-sm text-gray-700 dark:text-gray-400'>
                  {method.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className='py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
            {/* Contact Form */}
            <div className='lg:col-span-3'>
              <div className='bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800/20 shadow-2xl'>
                <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  Send us a Message
                </h2>
                <p className='text-gray-700 dark:text-gray-400 mb-8'>
                  Fill out the form below and we&apos;ll get back to you shortly
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Quick Info */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Office Hours */}
              <div className='bg-linear-to-br from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden'>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div className='relative z-10'>
                  <h3 className='text-2xl font-bold mb-4'>Office Hours</h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span>Monday - Friday</span>
                      <span className='font-semibold'>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Saturday</span>
                      <span className='font-semibold'>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Sunday</span>
                      <span className='font-semibold'>By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className='bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800/20 shadow-lg'>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Follow Us
                </h3>
                <div className='flex gap-4'>
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map(
                    (social) => (
                      <a
                        key={social}
                        href='#'
                        className='w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 dark:from-amber-400 dark:to-amber-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-blue-500/50 dark:shadow-amber-500/50'
                      >
                        <span className='text-xl capitalize'>{social[0]}</span>
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className='bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800/20 shadow-lg'>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Emergency?
                </h3>
                <p className='text-gray-700 dark:text-gray-400 mb-4'>
                  For urgent property matters, call our 24/7 hotline
                </p>
                <a
                  href='tel:+18005550911'
                  className='block w-full bg-red-500 hover:bg-red-600 text-white text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
                >
                  (+880) 19263-13093
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section
        id='map'
        className='py-20 px-4 bg-linear-to-b from-white to-slate-50 dark:from-black dark:to-gray-900'
      >
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Our Locations
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-400'>
              Visit us at any of our offices nationwide
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-400'>
              Quick answers to common questions
            </p>
          </div>
          <div className='space-y-6'>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className='bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800/20 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-3'>
                  <span className='text-blue-600 dark:text-amber-500 shrink-0'>
                    Q:
                  </span>
                  {faq.question}
                </h3>
                <p className='text-gray-700 dark:text-gray-400 leading-relaxed pl-8'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
