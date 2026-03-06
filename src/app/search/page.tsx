"use client";

import { useState } from "react";
import Link from "next/link";
import { PartCard } from "@/components/PartCard";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allParts = [
    { id: 1, name: 'Engine Oil Filter', price: 450, marketPrice: 600, category: 'Engine', brand: 'Honda', stock: 25 },
    { id: 2, name: 'Brake Pads (Front)', price: 1200, marketPrice: 1500, category: 'Brakes', brand: 'Yamaha', stock: 15 },
    { id: 3, name: 'Chain Sprocket Kit', price: 2500, marketPrice: 3200, category: 'Drive', brand: 'Bajaj', stock: 10 },
    { id: 4, name: 'Air Filter', price: 350, marketPrice: 500, category: 'Engine', brand: 'Hero', stock: 30 },
    { id: 5, name: 'Spark Plug', price: 250, marketPrice: 350, category: 'Engine', brand: 'Honda', stock: 50 },
  ];

  const filteredParts = allParts.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Search Products</h1>

      {/* Search Bar */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for parts, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Results */}
      {searchQuery ? (
        <>
          <p className="text-white/70 mb-6">
            Found {filteredParts.length} result{filteredParts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
          {filteredParts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParts.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
              <p className="text-white/70 text-lg mb-4">No products found</p>
              <Link href="/parts" className="text-blue-400 hover:text-blue-300">
                Browse all parts →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-white/70 text-lg">Start typing to search for products</p>
        </div>
      )}
    </div>
  );
}
