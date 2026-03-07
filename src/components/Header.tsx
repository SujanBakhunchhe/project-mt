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
                  <Button variant="ghost" className="text-white hover:bg-white/10 flex items-center gap-2">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="hidden md:inline">{session.user?.name || "Profile"}</span>
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
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/10 pt-4">
            <Link href="/bikes" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${pathname?.startsWith('/bikes') ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Bikes
            </Link>
            <Link href="/parts" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${pathname === '/parts' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Parts
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${pathname === '/about' ? 'bg-white/20 backdrop-blur-sm text-white font-semibold' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>
            
            <div className="border-t border-white/10 pt-2 mt-2"></div>
            
            <Link href="/search" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-white/90 hover:bg-white/10 hover:text-white py-3 px-4 rounded-lg transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-white/90 hover:bg-white/10 hover:text-white py-3 px-4 rounded-lg transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Cart {itemCount > 0 && <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{itemCount}</span>}</span>
            </Link>
            
            <div className="border-t border-white/10 pt-2 mt-2"></div>
            
            {session ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-white/90 hover:bg-white/10 hover:text-white py-3 px-4 rounded-lg transition-all">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-3 w-full text-left text-white/90 hover:bg-white/10 hover:text-white py-3 px-4 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
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
