"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProgramDetailErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Program detail page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Error Header */}
      <div className="border-b border-red-100 bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Plan Details Unavailable
            </h1>
            <p className="text-xl text-gray-600">
              We couldn't load the plan details you requested.
            </p>
          </div>
        </div>
      </div>

      {/* Error Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8">
            <div className="mb-6 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-600 mt-1" />
              <div>
                <h2 className="mb-2 text-lg font-semibold text-red-900">
                  Error Loading Plan Details
                </h2>
                <p className="text-red-700 text-sm mb-4">
                  {error?.message ||
                    "An unexpected error occurred while loading the plan details."}
                </p>
                {error?.digest && (
                  <p className="text-xs text-red-600 font-mono">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/programs"
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Plans
              </Link>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-12 rounded-lg bg-white p-8 shadow-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Need Help?
            </h3>
            <p className="text-gray-700 mb-4">
              Browse all available plans or contact our support team for
              assistance.
            </p>
            <Link
              href="/programs"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
