export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-r from-white via-blue-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center md:text-left md:max-w-xl order-last md:order-first space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4 mx-auto md:mx-0" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3 mx-auto md:mx-0" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="flex gap-3 mt-8 justify-center md:justify-start">
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="order-first md:order-last">
              <div className="w-56 h-56 md:w-72 md:h-72 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* News Feed Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="h-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-96 mx-auto" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-white p-8 space-y-4">
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-12" />
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 space-y-4"
              >
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
