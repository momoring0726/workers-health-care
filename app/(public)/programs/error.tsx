"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProgramsErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Programs page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Error Header */}
      <div className="border-b border-red-100 bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Unable to Load Plans
            </h1>
            <p className="text-xl text-gray-600">
              We encountered an error while fetching your health care plans.
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
                  Error Loading Content
                </h2>
                <p className="text-red-700 text-sm mb-4">
                  {process.env.NODE_ENV === "development"
                    ? error?.message || "An unexpected error occurred."
                    : "An unexpected error occurred while loading the plans page."}
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
                href="/"
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-12 rounded-lg bg-white p-8 shadow-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              What You Can Do
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Try refreshing the page to reload the content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span>
                  Check your internet connection and try again in a few moments
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span>
                  Contact support if the problem persists - our team is here to
                  help
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
