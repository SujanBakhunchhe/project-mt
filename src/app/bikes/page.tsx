"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandCardSkeleton } from "@/components/Skeletons";

export default function BikesPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then(res => res.json())
      .then(data => {
        setBrands(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Bike Brand</h1>
        <p className="text-white/70 text-lg">Select your bike brand to find compatible parts</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <BrandCardSkeleton key={i} />)}
        </div>
      ) : brands.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No brands available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/bikes/${brand.name.toLowerCase()}`}>
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer group hover:shadow-xl hover:shadow-blue-500/10">
                <div className="aspect-square bg-white/5 flex items-center justify-center p-6 group-hover:bg-white/10 transition-all">
                  {brand.logo ? (
                    <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-4xl">🏍️</span>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-base font-bold text-white mb-1">{brand.name}</h3>
                  <p className="text-xs text-white/50">View Models →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

