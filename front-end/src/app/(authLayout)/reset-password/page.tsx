import ResetPasswordForm from '@/components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-green-950 dark:to-black'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-green-400/40 dark:bg-green-500/40 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-400/30 dark:bg-emerald-500/30 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
          <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-teal-300/20 dark:bg-teal-500/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
