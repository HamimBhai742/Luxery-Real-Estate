import ForgotPasswordForm from '@/components/ForgotPasswordForm';
export const metadata = {
  title: 'Forgot Password - Luxury Real Estate',
  description: 'Reset your password to access your account',
}
const ForgotPasswordPage = () => {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-black'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-purple-400/40 dark:bg-purple-500/40 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-pink-400/30 dark:bg-pink-500/30 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
          <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
