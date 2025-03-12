export default function Loading() {
    return <ForgotPasswordLoading />
}

function ForgotPasswordLoading() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form with Skeletons */}
      <div className="w-full h-screen md:h-auto md:w-1/2 flex items-center justify-center py-10 px-6 md:py-0 md:p-10 lg:p-12 xl:p-10 2xl:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Back link skeleton */}
          <div className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8">
            <div className="skeleton w-40 h-5"></div>
          </div>

          {/* Title and subtitle skeletons */}
          <div className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8">
            <div className="skeleton h-8 md:h-9 xl:h-8 2xl:h-10 w-4/5 mb-3"></div>
            <div className="skeleton h-4 md:h-5 xl:h-4 2xl:h-5 w-full mb-1"></div>
            <div className="skeleton h-4 md:h-5 xl:h-4 2xl:h-5 w-3/4"></div>
          </div>

          {/* Form skeleton */}
          <div className="mb-5 md:mb-6 xl:mb-5 2xl:mb-6">
            {/* Label skeleton */}
            <div className="skeleton h-4 w-14 mb-1.5"></div>
            
            {/* Input skeleton */}
            <div className="skeleton h-11 md:h-12 xl:h-10 2xl:h-12 w-full rounded-none"></div>
          </div>

          {/* Button skeleton */}
          <div className="skeleton h-11 md:h-12 xl:h-10 2xl:h-12 w-full rounded-none"></div>
          
          {/* Pulse animation overlay to give a subtle loading effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>

      {/* Right side - Image Skeleton */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-200">
        <div className="skeleton w-full h-full"></div>
        
        {/* Content overlay skeleton */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 md:p-10 lg:p-12 xl:p-10 2xl:p-12">
          <div className="text-center">
            <div className="skeleton h-10 md:h-12 lg:h-12 xl:h-10 2xl:h-14 w-3/4 mx-auto mb-4 md:mb-5 xl:mb-4 2xl:mb-6"></div>
            <div className="skeleton h-4 md:h-5 lg:h-5 xl:h-4 2xl:h-6 w-full mx-auto mb-2"></div>
            <div className="skeleton h-4 md:h-5 lg:h-5 xl:h-4 2xl:h-6 w-5/6 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}