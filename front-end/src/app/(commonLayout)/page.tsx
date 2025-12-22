import CTASection from '@/components/CTASection/CTASection';
import FeaturedSection from '@/components/FeaturedSection/FeaturedSection';
import HeroSection from '@/components/HeroSection/HeroSection';
import ProcessSection from '@/components/ProcessSection/ProcessSection';
import ServicesSection from '@/components/Services/ServicesSection';
import StatsSection from '@/components/StatsSection/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection/TestimonialsSection';
import TeamSection from '@/components/TeamSection/TeamSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection/WhyChooseUsSection';

export default function Home() {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-gray-900 dark:to-black'>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Properties Preview */}
      <FeaturedSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
