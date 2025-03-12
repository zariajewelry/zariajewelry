export default function Loading() {
  return <ResendVerificationLoading />;
}

function ResendVerificationLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <div className="skeleton h-9 w-28" /> {/* ZARIA logo */}
      </div>

      {/* Middle section with content */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12">
        <div className="w-full max-w-md">
          {/* Icon and title section */}
          <div className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="skeleton h-16 w-16 rounded-full" /> {/* Mail icon */}
            </div>
            <div className="skeleton h-9 w-56 mx-auto mb-2" /> {/* Title */}
            <div className="skeleton h-5 w-full mb-1" /> {/* First line of description */}
            <div className="skeleton h-5 w-5/6 mx-auto mb-1" /> {/* Second line of description */}
            <div className="skeleton h-5 w-4/6 mx-auto" /> {/* Third line of description */}
          </div>

          {/* Form area */}
          <div className="mb-6">
            <div className="mb-6">
              <div className="skeleton h-4 w-40 mb-1" /> {/* Form label */}
              <div className="skeleton h-12 w-full" /> {/* Input field */}
            </div>
          </div>

          {/* Primary button */}
          <div className="mb-4">
            <div className="skeleton h-12 w-full" /> {/* Action button */}
          </div>

          {/* Secondary button */}
          <div className="mb-6">
            <div className="skeleton h-12 w-full" /> {/* Secondary button */}
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