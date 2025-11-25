/* eslint-disable @next/next/no-html-link-for-pages */
import ServiceCard from '@/components/ServiceCard';
import ProcessTimeline from '@/components/ProcessTimeline';

const services = [
  {
    icon: '🏡',
    title: 'Property Sales',
    description: 'Expert guidance through every step of buying or selling luxury properties with personalized service.',
    features: [
      'Market analysis and pricing strategy',
      'Professional photography and staging',
      'Targeted marketing campaigns',
      'Negotiation and closing support',
    ],
  },
  {
    icon: '💼',
    title: 'Investment Advisory',
    description: 'Strategic insights and portfolio management for real estate investors seeking premium opportunities.',
    features: [
      'ROI analysis and projections',
      'Market trend forecasting',
      'Portfolio diversification',
      'Tax optimization strategies',
    ],
  },
  {
    icon: '🔑',
    title: 'Property Management',
    description: 'Comprehensive management services to maintain and maximize the value of your luxury properties.',
    features: [
      'Tenant screening and placement',
      'Maintenance coordination',
      'Rent collection and accounting',
      '24/7 emergency support',
    ],
  },
  {
    icon: '🌍',
    title: 'Global Relocation',
    description: 'Seamless international property services for clients relocating to new markets worldwide.',
    features: [
      'International property search',
      'Legal and tax consultation',
      'Cultural integration support',
      'Temporary housing solutions',
    ],
  },
  {
    icon: '📊',
    title: 'Market Research',
    description: 'In-depth market intelligence and data-driven insights for informed real estate decisions.',
    features: [
      'Neighborhood analysis',
      'Comparative market reports',
      'Future development insights',
      'Investment opportunity alerts',
    ],
  },
  {
    icon: '✨',
    title: 'Concierge Services',
    description: 'White-glove service handling every detail of your luxury real estate experience.',
    features: [
      'Private property viewings',
      'Interior design consultation',
      'Moving and relocation assistance',
      'Lifestyle integration services',
    ],
  },
];

const process = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We begin with an in-depth discussion to understand your unique needs, preferences, and investment goals.',
  },
  {
    number: '02',
    title: 'Property Search & Analysis',
    description: 'Our experts curate a selection of properties that match your criteria, complete with detailed market analysis.',
  },
  {
    number: '03',
    title: 'Property Tours',
    description: 'Experience personalized property viewings with our team, exploring every detail of your potential investment.',
  },
  {
    number: '04',
    title: 'Offer & Negotiation',
    description: 'We craft competitive offers and negotiate on your behalf to secure the best possible terms.',
  },
  {
    number: '05',
    title: 'Due Diligence',
    description: 'Comprehensive inspections, appraisals, and legal reviews ensure your investment is sound.',
  },
  {
    number: '06',
    title: 'Closing & Beyond',
    description: 'We guide you through closing and provide ongoing support for property management and future investments.',
  },
];

const benefits = [
  { icon: '⚡', title: 'Fast Response', value: '< 2 Hours' },
  { icon: '🎯', title: 'Success Rate', value: '98%' },
  { icon: '🌟', title: 'Client Rating', value: '4.9/5' },
  { icon: '🏆', title: 'Awards Won', value: '25+' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-amber-300/30 dark:bg-amber-600/20 rounded-full blur-3xl animate-parallax-float"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-float"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-gray-800/20 shadow-lg">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Our Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Premium Real Estate
            <br />
            <span className="bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Comprehensive services tailored to meet every aspect of your luxury real estate journey
          </p>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-amber-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-amber-500/30 rounded-lg rotate-45 animate-pulse"></div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-16 px-4 bg-linear-to-r from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{benefit.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {benefit.value}
                </div>
                <div className="text-white/90 text-sm md:text-base">
                  {benefit.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A seamless journey from consultation to closing
            </p>
          </div>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The advantages that set us apart
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Decades of combined experience in luxury real estate markets worldwide.',
                icon: '👥',
              },
              {
                title: 'Global Network',
                description: 'Access to exclusive properties and buyers across international markets.',
                icon: '🌐',
              },
              {
                title: 'Personalized Service',
                description: 'Tailored solutions that align perfectly with your unique goals and preferences.',
                icon: '🎨',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-black rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-orange-500/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a consultation with our experts today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:-translate-y-1"
                >
                  Book Consultation
                </a>
                <a
                  href="/properties"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  View Properties
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
