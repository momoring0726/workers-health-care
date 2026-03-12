"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {isOpen && (
                <div className="fixed left-0 right-0 w-full lg:hidden border-t border-gray-200 bg-white shadow-md z-40">
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
                            Plans
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
        </>
    );
}
