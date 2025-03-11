export default function SignInLoading() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side skeleton */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-200">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="skeleton h-12 w-36 mb-6" />
          <div className="skeleton h-5 w-full max-w-md mb-2" />
          <div className="skeleton h-5 w-full max-w-md mb-2" />
          <div className="skeleton h-5 w-3/4 max-w-md" />
        </div>
      </div>

      {/* Right side skeleton */}
      <div className="w-full h-screen md:w-1/2 flex flex-col bg-white">
        {/* Top section for logo - exact match for pt-10 md:pt-20 */}
        <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
          <div className="skeleton h-9 w-28" /> {/* Match for font-serif text-3xl */}
        </div>
        
        {/* Middle section with form - flex-grow to take available space */}
        <div className="flex-grow flex items-center justify-center p-6 md:px-12">
          <div className="w-full max-w-md">
            {/* Title and subtitle section with correct spacing */}
            <div className="mb-8 text-center md:text-left">
              <div className="skeleton h-9 w-48 mb-2" /> {/* Match for font-mono text-3xl */}
              <div className="skeleton h-5 w-64" /> {/* Match for paragraph text */}
            </div>

            {/* Form fields */}
            <div className="space-y-4 mb-6"> {/* Match for form field spacing */}
              {/* Email field */}
              <div>
                <div className="skeleton h-4 w-16 mb-1" /> {/* Match for label */}
                <div className="skeleton h-12 w-full" /> {/* Match for input height h-12 */}
              </div>

              {/* Password field */}
              <div>
                <div className="skeleton h-4 w-24 mb-1" /> {/* Match for label */}
                <div className="skeleton h-12 w-full" /> {/* Match for input height h-12 */}
              </div>
            </div>

            {/* Remember me and forgot password row */}
            <div className="flex items-center justify-between mb-6"> {/* Match for mb-6 */}
              <div className="flex items-center">
                <div className="skeleton h-4 w-4 mr-2" />
                <div className="skeleton h-4 w-24" />
              </div>
              <div className="skeleton h-4 w-40" />
            </div>

            {/* Submit button */}
            <div className="skeleton h-12 w-full mb-6" /> {/* Match for button h-12 and mb-6 */}

            {/* Or continue with section */}
            <div className="relative flex items-center justify-center mb-6"> {/* Match for mb-6 */}
              <div className="skeleton h-px w-full absolute" />
              <div className="bg-white px-4 relative z-10">
                <div className="skeleton h-4 w-32" />
              </div>
            </div>

            {/* Google button */}
            <div className="grid grid-cols-1 gap-3 mb-8"> {/* Match for mb-8 */}
              <div className="skeleton h-12 w-full" /> {/* Match for button h-12 */}
            </div>

            {/* Registration link */}
            <div className="text-center">
              <div className="skeleton h-4 w-48 mx-auto" />
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pb-6 md:pb-10 px-6 md:px-12 flex justify-center">
          <div className="skeleton h-4 w-64" />
        </div>
      </div>
    </div>
  )
}