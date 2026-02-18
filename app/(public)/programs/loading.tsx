export default function ProgramsLoading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="border-b border-blue-100 bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8 text-center">
          <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Programs Grid Skeleton */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg animate-pulse"
            >
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
