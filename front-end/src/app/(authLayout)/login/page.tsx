import LoginForm from '@/components/LoginForm';
export const metadata = {
  title: 'Login - Luxury Real Estate',
  description: 'Sign in to your account to access our services',
};
export default function LoginPage() {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated Background - Different from Register */}
      <div className='absolute inset-0 bg-linear-to-tr from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-amber-950 dark:to-black'>
        {/* Animated Mesh linear */}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-400/40 dark:bg-amber-500/40 rounded-full blur-3xl animate-pulse-slow'></div>
          <div
            className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/30 dark:bg-orange-500/30 rounded-full blur-3xl animate-pulse-slow'
            style={{ animationDelay: '2s' }}
          ></div>
          <div className='absolute top-1/3 right-1/3 w-80 h-80 bg-blue-300/20 dark:bg-yellow-500/20 rounded-full blur-3xl animate-float'></div>
        </div>

        {/* Diagonal Lines Pattern */}
        <div className='absolute inset-0 bg-[linear-linear(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] dark:bg-[linear-linear(45deg,transparent_25%,rgba(251,191,36,0.05)_25%,rgba(251,191,36,0.05)_50%,transparent_50%,transparent_75%,rgba(251,191,36,0.05)_75%)] bg-[length:60px_60px]'></div>

        {/* Radial linear Overlay */}
        <div className='absolute inset-0 bg-[radial-linear(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_100%)] dark:bg-[radial-linear(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
        <div className='flex justify-center lg:justify-start order-2 lg:order-1'>
          <div className='w-full max-w-xl bg-white/90 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8 lg:p-10'>
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className='absolute top-20 left-20 w-2 h-2 bg-blue-500 dark:bg-amber-400 rounded-full animate-ping'></div>
      <div className='absolute bottom-32 right-32 w-3 h-3 bg-indigo-500 dark:bg-amber-500 rounded-full animate-pulse'></div>
      <div className='absolute top-1/2 left-20 w-16 h-16 border-2 border-blue-400/30 dark:border-amber-400/30 rounded-full animate-spin-slow'></div>
      <div className='absolute bottom-20 right-20 w-12 h-12 border-2 border-indigo-500/20 dark:border-amber-500/20 rounded-lg rotate-45 animate-pulse'></div>

      {/* Spotlight Effect */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-blue-400/10 dark:from-amber-500/10 to-transparent blur-3xl pointer-events-none'></div>
    </div>
  );
}
