"use client";

import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img src="/WHC%20LOGO.png" alt="WHC" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900">
                Workers Health Care
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-sm">
              We provide affordable HMO plans and clear guidance to help workers
              and families access quality health care.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/hospitals"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Hospitals/Clinics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@workershealthcare.example</li>
              <li>Mon–Fri: 8am – 6pm</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>
                <a href="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-600">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Workers Health Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
