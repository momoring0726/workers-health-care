"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            <div className="flex items-center">
              <img
                src="/WHC%20LOGO.png"
                alt="WHC Logo"
                className="h-8 md:h-10 w-auto mr-3"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                Workers Health Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <a
              href="/#about"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <Link
              href="/programs"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Plans
            </Link>

            <Link
              href="/news"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              News
            </Link>

            <Link
              href="/hospitals"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-4 px-4 py-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Home
              </Link>
              <a
                href="/#about"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                About
              </a>
              <Link
                href="/programs"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Programs
              </Link>
              <Link
                href="/news"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                News
              </Link>
              <Link
                href="/hospitals"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Hospitals/Clinics
              </Link>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold w-full"
              >
                <a href="/#contact" onClick={() => setIsOpen(false)}>
                  Contact
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
