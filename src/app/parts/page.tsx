"use client";

import { useState, useEffect } from "react";
import { PartCard } from "@/components/PartCard";

export default function PartsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", "Engine", "Brakes", "Electrical", "Transmission", "Suspension", "Body"];
  const filteredParts = selectedCategory === "All" 
    ? products 
    : products.filter((p: any) => p.category === selectedCategory);
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Parts</h1>
        <p className="text-white/70 text-lg">Browse our complete collection of motorcycle parts</p>
      </div>

      {/* Filters */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading ? (
          <p className="text-white col-span-full text-center py-12">Loading products...</p>
        ) : filteredParts.length === 0 ? (
          <p className="text-white col-span-full text-center py-12">No products found</p>
        ) : (
          filteredParts.map((part: any) => (
            <PartCard key={part.id} part={part} />
          ))
        )}
      </div>
    </div>
  );
}
