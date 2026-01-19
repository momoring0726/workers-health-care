"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Quality Health Care</span>
            <span className="block text-blue-600">for all workers</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
            We are committed to providing the best health care plans for
            workers. Our plans are affordable and flexible to meet your needs.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a href="/programs">View Programs</a>
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button
                variant="outline"
                asChild
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <a href="/#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
