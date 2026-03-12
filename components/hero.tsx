"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center bg-gradient-to-r from-white via-blue-50 to-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="text-center md:text-left md:max-w-2xl order-last md:order-first">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Quality Health Care</span>
              <span className="block text-blue-600">for all workers</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 sm:mt-6 sm:max-w-2xl md:mt-6 md:max-w-2xl">
              We are committed to providing the best health care plans as your trusted HMO in General Santos City (Gensan), South Cotabato, and Sultan Kudarat. Our plans are affordable and flexible to meet your needs.
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center sm:justify-center md:justify-start gap-3 sm:gap-4">
              <div className="inline-block rounded-md shadow">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
                >
                  <Link href="/programs">View Plans</Link>
                </Button>
              </div>
              <div className="inline-block">
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6"
                >
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center order-first md:order-last">
            <div className="inline-flex items-center mb-6 md:mb-0">
              <Image
                src="/WHC%20LOGO.png"
                alt="WHC logo"
                width={320}
                height={320}
                className="w-40 sm:w-48 md:w-64 lg:w-72"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
