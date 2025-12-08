export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-48 bg-linear-to-r from-gray-300 to-gray-400"></div>
          <div className="relative px-8 pb-8">
            <div className="flex items-end gap-6 -mt-20">
              <div className="w-40 h-40 rounded-full border-8 border-white bg-gray-300"></div>
              <div className="flex-1">
                <div className="h-10 bg-gray-300 rounded-xl w-64 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-32 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded-lg w-48"></div>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-20 bg-gray-200 rounded-xl"></div>
                <div className="h-20 bg-gray-200 rounded-xl"></div>
                <div className="md:col-span-2 h-20 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
          <div className="h-12 bg-gray-200 rounded-xl w-64"></div>
        </div>
      </div>
    </div>
  );
}
