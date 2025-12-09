
const PaymentLoding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 px-4">
      <div className="text-center">
        {/* Animated Credit Card */}
        <div className="relative w-64 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl shadow-2xl animate-pulse">
            <div className="absolute top-6 left-6 w-12 h-8 bg-yellow-400 rounded opacity-80"></div>
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="h-2 bg-white/30 rounded animate-pulse"></div>
              <div className="h-2 bg-white/30 rounded w-3/4 animate-pulse delay-75"></div>
            </div>
          </div>
          {/* Floating Coins */}
          <div className="absolute -right-4 -top-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute -left-4 -bottom-4 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-150 shadow-lg"></div>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Processing Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
          Please wait while we securely process your transaction...
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoding;