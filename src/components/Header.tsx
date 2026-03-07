"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { itemCount } = useCart();
  const pathname = usePathname();

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
          
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/bikes" className={`px-4 py-2 rounded-lg transition-all ${pathname?.startsWith('/bikes') ? 'bg-white/20 backdrop-blur-sm text-white font-semibold shadow-lg' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>Bikes</Link>
            <Link href="/parts" className={`px-4 py-2 rounded-lg transition-all ${pathname === '/parts' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold shadow-lg' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>Parts</Link>
            <Link href="/about" className={`px-4 py-2 rounded-lg transition-all ${pathname === '/about' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold shadow-lg' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>About</Link>
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
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {status === "loading" ? (
              <div className="w-20 h-10 bg-white/10 rounded-lg animate-pulse"></div>
            ) : session ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    {session.user?.name || "Profile"}
                  </Button>
                </Link>
                <Button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" className="text-white hover:bg-white/10 relative p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/bikes" onClick={() => setMobileMenuOpen(false)} className={`block py-2 px-4 rounded-lg transition-all ${pathname?.startsWith('/bikes') ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>Bikes</Link>
            <Link href="/parts" onClick={() => setMobileMenuOpen(false)} className={`block py-2 px-4 rounded-lg transition-all ${pathname === '/parts' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>Parts</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block py-2 px-4 rounded-lg transition-all ${pathname === '/about' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>About</Link>
            <Link href="/search" onClick={() => setMobileMenuOpen(false)} className="block text-white/90 hover:bg-white/10 hover:text-white py-2 px-4 rounded-lg transition-all">Search</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="block text-white/90 hover:bg-white/10 hover:text-white py-2 px-4 rounded-lg transition-all">
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
            
            {session ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-white/90 hover:text-white py-2">Profile</Link>
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="pt-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
