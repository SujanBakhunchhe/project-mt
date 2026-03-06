"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/20 bg-white/10 backdrop-blur-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">BikeParts Nepal</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/90 hover:text-white transition-colors">Home</Link>
            <Link href="/bikes" className="text-white/90 hover:text-white transition-colors">Bikes</Link>
            <Link href="/parts" className="text-white/90 hover:text-white transition-colors">Parts</Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors">About</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/search">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" className="text-white hover:bg-white/10 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/" className="block text-white/90 hover:text-white py-2">Home</Link>
            <Link href="/bikes" className="block text-white/90 hover:text-white py-2">Bikes</Link>
            <Link href="/parts" className="block text-white/90 hover:text-white py-2">Parts</Link>
            <Link href="/about" className="block text-white/90 hover:text-white py-2">About</Link>
            <Link href="/search" className="block text-white/90 hover:text-white py-2">Search</Link>
            <Link href="/cart" className="block text-white/90 hover:text-white py-2">Cart (2)</Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="w-full text-white hover:bg-white/10">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
