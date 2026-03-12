import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between py-4 lg:py-3">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            <div className="flex items-center">
              <Image
                src="/whc-banner.png"
                alt="WHC Banner"
                width={1200}
                height={300}
                className="h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              href="/"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <a
              href="/#about"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <Link
              href="/programs"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Plans
            </Link>

            <Link
              href="/news"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              News
            </Link>

            <Link
              href="/hospitals"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Hospitals/Clinics
            </Link>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 py-2"
            >
              <a href="/#contact">Contact</a>
            </Button>
          </div>

          {/* Mobile Menu & Navigation */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
