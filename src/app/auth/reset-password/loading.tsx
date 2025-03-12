
export default function Loading() {
    return <ResetPasswordSkeleton />;
}

function ResetPasswordSkeleton() {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Form Skeleton */}
        <div className="w-full h-screen md:h-auto md:w-1/2 flex items-center justify-center py-10 px-6 md:py-0 md:p-10 lg:p-12 xl:p-10 2xl:p-12 bg-white">
          <div className="w-full max-w-md">
            {/* Back link skeleton */}
            <div className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8">
              <div className="skeleton h-6 w-40 rounded-md"></div>
            </div>
  
            {/* Title and subtitle skeleton */}
            <div className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8">
              <div className="skeleton h-9 md:h-10 xl:h-9 2xl:h-10 w-3/4 mb-2 rounded-md"></div>
              <div className="skeleton h-5 md:h-6 xl:h-5 2xl:h-6 w-full rounded-md"></div>
            </div>
  
            {/* Password input skeleton */}
            <div className="mb-5 md:mb-6 xl:mb-4 2xl:mb-6">
              <div className="skeleton h-5 w-40 mb-1 rounded-md"></div>
              <div className="skeleton h-11 md:h-12 xl:h-10 2xl:h-12 w-full mb-2 rounded-none"></div>
              
              {/* Password strength skeleton */}
              <div className="mt-2 md:mt-3 xl:mt-2 2xl:mt-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="skeleton h-4 w-32 rounded-md"></div>
                  <div className="skeleton h-4 w-16 rounded-md"></div>
                </div>
                <div className="skeleton h-1.5 w-full rounded-full mb-2"></div>
  
                {/* Password requirements skeleton */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 md:mt-3 xl:mt-2 2xl:mt-3">
                  <div className="flex items-center">
                    <div className="skeleton h-4 w-4 mr-1 rounded-full"></div>
                    <div className="skeleton h-4 w-24 rounded-md"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="skeleton h-4 w-4 mr-1 rounded-full"></div>
                    <div className="skeleton h-4 w-24 rounded-md"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="skeleton h-4 w-4 mr-1 rounded-full"></div>
                    <div className="skeleton h-4 w-24 rounded-md"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="skeleton h-4 w-4 mr-1 rounded-full"></div>
                    <div className="skeleton h-4 w-24 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Confirm password input skeleton */}
            <div className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8">
              <div className="skeleton h-5 w-48 mb-1 rounded-md"></div>
              <div className="skeleton h-11 md:h-12 xl:h-10 2xl:h-12 w-full rounded-none"></div>
            </div>
  
            {/* Submit button skeleton */}
            <div className="mb-5 md:mb-6 xl:mb-5 2xl:mb-6">
              <div className="skeleton h-11 md:h-12 xl:h-10 2xl:h-12 w-full rounded-none"></div>
            </div>
          </div>
        </div>
  
        {/* Right side - Image skeleton */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="skeleton h-full w-full"></div>
        </div>
      </div>
    );
  }


 