"use client";

import { useState, useEffect } from "react";
import { PartCard } from "@/components/PartCard";

interface ProductCardData {
  id: string;
  name: string;
  price: number;
  marketPrice: number;
  category: string;
  brand?: string | null;
  stock?: number | null;
  images?: string[] | null;
  description?: string | null;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setProducts(data);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

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
            {loading ? "Searching..." : `Found ${products.length} result${products.length !== 1 ? 's' : ''} for "${searchQuery}"`}
          </p>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {products.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : !loading ? (
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
              <p className="text-white/70 text-lg">No products found for {searchQuery}</p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <p className="text-white/70 text-lg">Start typing to search for products...</p>
        </div>
      )}
    </div>
  );
}
