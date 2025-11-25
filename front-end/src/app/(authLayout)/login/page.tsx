import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - Different from Register */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-amber-950 to-black dark:from-black dark:via-gray-900 dark:to-amber-950">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/40 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-float"></div>
        </div>
        
        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.05)_25%,rgba(251,191,36,0.05)_50%,transparent_50%,transparent_75%,rgba(251,191,36,0.05)_75%)] bg-[length:60px_60px]"></div>
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Form */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 lg:p-10">
              <LoginForm />
            </div>
          </div>

          {/* Right Side - Showcase */}
          <div className="hidden lg:block space-y-8 order-1 lg:order-2">
            {/* Floating Property Cards */}
            <div className="space-y-6">
              <div className="text-right space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Access Your
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Luxury Portfolio
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Manage your exclusive properties and investments in one place
                </p>
              </div>

              {/* Property Preview Cards */}
              <div className="space-y-4">
                {[
                  { title: 'Ocean View Villa', price: '$4.5M', location: 'Malibu, CA', delay: '0s' },
                  { title: 'Downtown Penthouse', price: '$8.9M', location: 'New York, NY', delay: '0.2s' },
                  { title: 'Beachfront Estate', price: '$6.2M', location: 'Miami, FL', delay: '0.4s' },
                ].map((property, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-x-2 hover:shadow-2xl group"
                    style={{ animationDelay: property.delay }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{property.title}</h3>
                        <p className="text-sm text-gray-300 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-amber-400">{property.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-sm text-gray-300">Bank-Level Security</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm text-gray-300">Instant Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-amber-400/30 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 border-2 border-amber-500/20 rounded-lg rotate-45 animate-pulse"></div>
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
}
