"use client";

import Link from "next/link";
import { PrimaryButton } from "@/components/Buttons";

interface Part {
  id: number;
  name: string;
  price: number;
  marketPrice: number;
  category: string;
  brand?: string;
  stock?: number;
}

export function PartCard({ part }: { part: Part }) {
  const handleAddToCart = () => {
    alert(`Added ${part.name} to cart!`);
  };

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all group">
      <Link href={`/product/${part.id}`}>
        <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-4 cursor-pointer group-hover:scale-105 transition-transform">
          <span className="text-6xl">🔧</span>
        </div>
      </Link>
      <Link href={`/product/${part.id}`}>
        <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 cursor-pointer">{part.name}</h3>
      </Link>
      <p className="text-white/60 text-sm mb-3">
        {part.brand ? `${part.brand} • ` : ''}{part.category}
      </p>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-white/60 text-sm line-through">NPR {part.marketPrice}</span>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {Math.round(((part.marketPrice - part.price) / part.marketPrice) * 100)}% OFF
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">NPR {part.price}</span>
          {part.stock && <span className="text-sm text-white/60">Stock: {part.stock}</span>}
        </div>
      </div>
      <PrimaryButton 
        className="w-full"
        onClick={handleAddToCart}
      >
        Add to Cart
      </PrimaryButton>
    </div>
  );
}
