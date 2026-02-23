export default function NewsDetailLoading() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[30vh] md:h-[40vh] overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-slate-900">
        {/* Back Button Skeleton */}
        <div className="absolute top-8 left-8 w-40 h-12 bg-white/20 rounded-full animate-pulse" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-20 max-w-5xl w-full">
            <div className="space-y-6">
              {/* Category Badge Skeleton */}
              <div className="w-32 h-8 bg-white/20 rounded-full animate-pulse" />

              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="h-12 bg-white/20 rounded animate-pulse" />
                <div className="h-12 bg-white/20 rounded animate-pulse w-3/4" />
              </div>

              {/* Date Skeleton */}
              <div className="w-48 h-6 bg-white/20 rounded animate-pulse" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-6 bg-white/20 rounded animate-pulse" />
                <div className="h-6 bg-white/20 rounded animate-pulse w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Image Carousel Skeleton */}
        <div className="mb-12 h-96 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg animate-pulse" />

        {/* Article Content Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6" />
              {i % 2 === 0 && (
                <>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5" />
                  <div className="h-64 bg-gray-200 rounded animate-pulse my-6" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
