"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BikesPage() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then(res => res.json())
      .then(data => setBrands(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Bike Brand</h1>
        <p className="text-white/70 text-lg">Select your bike brand to find compatible parts</p>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60">No brands available yet</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/bikes/${brand.name.toLowerCase()}`}>
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-2">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg p-3">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{brand.name}</h3>
                <p className="text-sm text-white/60">View Parts →</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

