export default function ProgramDetailLoading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="border-b border-blue-100 bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-5/6 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Key Features Loading */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 h-8 w-1/3 animate-pulse rounded-lg bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-6 w-6 flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 h-6 animate-pulse rounded-lg bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Accordions Loading */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="p-6">
                  <div className="h-6 w-1/2 animate-pulse rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
