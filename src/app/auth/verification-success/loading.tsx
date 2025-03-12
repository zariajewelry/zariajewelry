export default function Loading() {
  return <VerificationSuccessLoading />;
}

function VerificationSuccessLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <div className="skeleton h-9 w-28" /> {/* Logo ZARIA */}
      </div>

      {/* Middle section with verification message */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12">
        <div className="w-full max-w-md">
          {/* Check icon and title section */}
          <div className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="skeleton h-16 w-16 rounded-full" /> {/* Check icon */}
            </div>
            <div className="skeleton h-9 w-48 mx-auto mb-2" /> {/* "Email Verificado" */}
            <div className="skeleton h-5 w-full mb-1" /> {/* First line of message */}
            <div className="skeleton h-5 w-full mb-1" /> {/* Second line of message */}
            <div className="skeleton h-5 w-3/4 mx-auto" /> {/* Third line of message */}
          </div>

          {/* Sign In button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Sign In button */}
          </div>

          {/* Explore Collection button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Explore Collection button */}
          </div>

          {/* Help text */}
          <div className="text-center">
            <div className="skeleton h-4 w-48 mx-auto" /> {/* Help text */}
          </div>
        </div>
      </div>

      {/* Bottom section with copyright */}
      <div className="pb-6 md:pb-10 px-6 md:px-12 flex justify-center">
        <div className="skeleton h-4 w-64" /> {/* Copyright text */}
      </div>
    </div>
  )
}