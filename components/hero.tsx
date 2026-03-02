import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-white via-blue-50 to-white py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-center md:text-left md:max-w-xl order-last md:order-first">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Quality Health Care</span>
              <span className="block text-blue-600">for all workers</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
              We are committed to providing the best health care plans as your trusted HMO in General Santos City (Gensan), South Cotabato, and Sultan Kudarat. Our plans are affordable and flexible to meet your needs.
            </p>

            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center sm:justify-center md:justify-start gap-3">
              <div className="inline-block rounded-md shadow">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white w-auto"
                >
                  <Link href="/programs">View Plans</Link>
                </Button>
              </div>
              <div className="inline-block">
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-auto"
                >
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center order-first md:order-last">
            <div className="inline-flex items-center mb-4 md:mb-0">
              <img
                src="/WHC%20LOGO.png"
                alt="WHC logo"
                className="w-56 h-auto md:w-72 lg:w-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
