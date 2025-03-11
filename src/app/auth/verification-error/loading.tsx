
export default function VerificationErrorLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <div className="skeleton h-9 w-28" /> {/* ZARIA logo */}
      </div>

      {/* Middle section with error message */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12">
        <div className="w-full max-w-md">
          {/* Error icon and title section */}
          <div className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="skeleton h-16 w-16 rounded-full" /> {/* Alert circle icon */}
            </div>
            <div className="skeleton h-9 w-60 mx-auto mb-2" /> {/* Error de Verificación */}
            <div className="skeleton h-5 w-full mb-2" /> {/* First line of error message */}
            <div className="skeleton h-5 w-full mb-2" /> {/* Second line of error message */}
            <div className="skeleton h-5 w-3/4 mx-auto" /> {/* Third line of error message */}
          </div>

          {/* Request new link button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Request new link button */}
          </div>

          {/* Back to login button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Back to login button */}
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