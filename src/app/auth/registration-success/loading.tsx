export default function Loading() {
  return <RegistrationSuccessLoading />
}
function RegistrationSuccessLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <div className="skeleton h-9 w-28" /> {/* ZARIA logo */}
      </div>

      {/* Middle section with success message */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12 pt-10 md:pt-0">
        <div className="w-full max-w-md">
          {/* Check icon and title */}
          <div className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="skeleton h-16 w-16 rounded-full" /> {/* Check icon */}
            </div>
            <div className="skeleton h-9 w-64 mx-auto mb-2" /> {/* ¡Registro completado! */}
            <div className="skeleton h-5 w-full max-w-md mb-2" /> {/* Email text */}
            <div className="skeleton h-5 w-full max-w-md" /> {/* Instructions text */}
          </div>

          {/* Email info box */}
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="skeleton h-5 w-5 mr-3 mt-0.5" /> {/* Mail icon */}
                <div>
                  <div className="skeleton h-4 w-full mb-2" /> {/* First line */}
                  <div className="skeleton h-4 w-full mb-2" /> {/* Second line */}
                  <div className="skeleton h-4 w-3/4" /> {/* Third line */}
                </div>
              </div>
            </div>
          </div>

          {/* Resend email button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Resend button */}
          </div>

          {/* Return to homepage button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Return button */}
          </div>

          {/* Help text */}
          <div className="text-center">
            <div className="skeleton h-4 w-48 mx-auto" /> {/* Need help text */}
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