export default function SignUpLoading() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form Skeleton */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-6 md:p-12 bg-white order-2 md:order-1">
        <div className="pt-4 md:pt-8 md:pb-4 px-6 md:px-12 flex justify-center items-center">
          <div className="skeleton h-8 w-32"></div> {/* ZARIA logo */}
        </div>
        
        <div className="w-full max-w-md mt-6 md:mt-12">
          {/* Header Skeleton */}
          <div className="mb-8 text-center md:text-left">
            <div className="skeleton h-10 w-48 mb-2"></div> {/* Title */}
            <div className="skeleton h-5 w-full max-w-xs"></div> {/* Subtitle */}
          </div>

          {/* Form Fields Skeletons */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="skeleton h-4 w-16 mb-2"></div> {/* Nombre label */}
                <div className="skeleton h-12 w-full"></div> {/* Nombre input */}
              </div>

              <div>
                <div className="skeleton h-4 w-16 mb-2"></div> {/* Apellido label */}
                <div className="skeleton h-12 w-full"></div> {/* Apellido input */}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div>
              <div className="skeleton h-4 w-12 mb-2"></div> {/* Email label */}
              <div className="skeleton h-12 w-full"></div> {/* Email input */}
            </div>
          </div>

          <div className="mb-6">
            <div>
              <div className="skeleton h-4 w-24 mb-2"></div> {/* Contraseña label */}
              <div className="skeleton h-12 w-full"></div> {/* Contraseña input */}
              <div className="mt-2">
                <div className="skeleton h-1 w-full"></div> {/* Password strength bar */}
                <div className="skeleton h-3 w-24 mt-1"></div> {/* Password strength text */}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div>
              <div className="skeleton h-4 w-40 mb-2"></div> {/* Confirmar Contraseña label */}
              <div className="skeleton h-12 w-full"></div> {/* Confirmar Contraseña input */}
            </div>
          </div>

          {/* Checkboxes Skeleton */}
          <div className="mb-6 space-y-4">
            <div className="flex items-start">
              <div className="skeleton h-4 w-4 rounded"></div> {/* Terms checkbox */}
              <div className="skeleton h-4 w-3/4 ml-3"></div> {/* Terms text */}
            </div>
            <div className="flex items-start">
              <div className="skeleton h-4 w-4 rounded"></div> {/* Newsletter checkbox */}
              <div className="skeleton h-4 w-4/5 ml-3"></div> {/* Newsletter text */}
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full"></div> {/* Create account button */}
          </div>

          {/* Divider Skeleton */}
          <div className="mb-6 relative">
            <div className="skeleton h-[1px] w-full"></div> {/* Divider line */}
            <div className="skeleton h-5 w-32 absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white"></div> {/* Divider text */}
          </div>

          {/* Social Button Skeleton */}
          <div className="mb-8">
            <div className="skeleton h-12 w-full"></div> {/* Google button */}
          </div>

          {/* Login Link Skeleton */}
          <div className="text-center">
            <div className="skeleton h-5 w-48 mx-auto"></div> {/* "¿Ya tienes cuenta?" text */}
          </div>
        </div>
        
        {/* Copyright Skeleton */}
        <div className="mt-8">
          <div className="skeleton h-4 w-60"></div> {/* Copyright text */}
        </div>
      </div>

      {/* Right side - Hero Image Skeleton */}
      <div className="w-full md:w-1/2 md:h-screen order-1 md:order-2 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="skeleton h-8 w-40 mb-3"></div> {/* Hero title */}
          <div className="skeleton h-4 w-full max-w-md mb-2"></div> {/* Hero subtitle line 1 */}
          <div className="skeleton h-4 w-5/6 max-w-md mb-2"></div> {/* Hero subtitle line 2 */}
          <div className="skeleton h-4 w-3/4 max-w-md mb-8"></div> {/* Hero subtitle line 3 */}
          <div className="skeleton h-[500px] w-full max-w-md rounded-lg"></div> {/* Hero image */}
        </div>
      </div>
    </div>
  );
}