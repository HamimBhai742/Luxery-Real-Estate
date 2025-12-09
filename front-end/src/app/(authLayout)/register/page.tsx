import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export const metadata = {
  title: 'Register - Luxury Real Estate',
  description: 'Create an account to access our services',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-slate-50 dark:from-gray-900 dark:via-black dark:to-amber-950">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 dark:bg-amber-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-blue-200/20 to-indigo-200/20 dark:from-amber-900/10 dark:to-orange-900/10 rounded-full blur-3xl animate-float"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(to_right,#80808012_1px,transparent_1px),linear-linear(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 dark:from-amber-400 dark:to-amber-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
                  Luxury Real Estate
                </span>
              </Link>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Dream Home
                <br />
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent">
                  Awaits You
                </span>
              </h2>

              <p className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
                Join thousands of satisfied clients who found their perfect luxury property with us.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: '🏆', title: 'Premium Properties', desc: 'Exclusive access to luxury estates' },
                { icon: '🔒', title: 'Secure Platform', desc: 'Your data is protected with us' },
                { icon: '💎', title: 'VIP Service', desc: 'Personalized property recommendations' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10K+', label: 'Properties' },
                { value: '50K+', label: 'Happy Clients' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-800/20"
                >
                  <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-amber-500 dark:to-amber-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800/20 p-8 lg:p-10">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-4 border-blue-400/30 dark:border-amber-400/30 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-indigo-500/20 dark:border-amber-500/20 rounded-lg animate-pulse"></div>
    </div>
  );
}
