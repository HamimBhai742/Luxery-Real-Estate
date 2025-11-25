import CTASection from '@/components/CTASection/CTASection';
import FeaturedSection from '@/components/FeaturedSection/FeaturedSection';
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
      <FeaturedSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
