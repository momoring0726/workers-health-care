export default function HospitalsLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="h-12 bg-gray-200 rounded animate-pulse w-96 mb-4" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Stats */}
          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-64" />
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-48" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-48" />
            </div>
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="flex gap-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    </div>
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-10 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
