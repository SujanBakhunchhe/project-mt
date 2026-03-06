"use client";

import Link from "next/link";
import { useState } from "react";
import { PrimaryButton } from "@/components/Buttons";
import { useToast } from "@/components/ToastProvider";
import { useCart } from "@/components/CartProvider";
import { useSession } from "next-auth/react";

interface Part {
  id: string;
  name: string;
  price: number;
  marketPrice: number;
  category: string;
  brand?: string;
  stock?: number;
}

export function PartCard({ part }: { part: Part }) {
  const { showToast } = useToast();
  const { addItem } = useCart();
  const { data: session } = useSession();
  const [inWishlist, setInWishlist] = useState(false);

  const handleAddToCart = () => {
    addItem({ id: part.id, name: part.name, price: part.price });
    showToast(`${part.name} added to cart!`, "success");
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      showToast("Please login to add to wishlist", "error");
      return;
    }

    try {
      if (inWishlist) {
        await fetch(`/api/wishlist?productId=${part.id}`, { method: "DELETE" });
        setInWishlist(false);
        showToast("Removed from wishlist", "success");
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: part.id.toString() }),
        });
        setInWishlist(true);
        showToast("Added to wishlist", "success");
      }
    } catch (error) {
      showToast("Failed to update wishlist", "error");
    }
  };

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-lg md:rounded-2xl p-2 md:p-6 hover:bg-white/20 transition-all group relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
      >
        <svg className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-white'}`} fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <Link href={`/product/${part.id}`}>
        <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg mb-2 md:mb-4 cursor-pointer group-hover:scale-105 transition-transform flex items-center justify-center">
          <span className="text-3xl md:text-6xl">🔧</span>
        </div>
      </Link>
      <Link href={`/product/${part.id}`}>
        <h3 className="text-xs md:text-xl font-bold text-white mb-1 md:mb-2 hover:text-blue-400 cursor-pointer line-clamp-2 leading-tight">{part.name}</h3>
      </Link>
      <p className="text-white/60 text-[10px] md:text-sm mb-2 line-clamp-1">
        {part.brand ? `${part.brand} • ` : ''}{part.category}
      </p>
      <div className="mb-2">
        <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
          <span className="text-white/60 text-[10px] md:text-sm line-through">NPR {part.marketPrice}</span>
          <span className="bg-green-500 text-white text-[8px] md:text-xs px-1 md:px-2 py-0.5 rounded-full font-semibold">
            {Math.round(((part.marketPrice - part.price) / part.marketPrice) * 100)}% OFF
          </span>
        </div>
        <span className="text-sm md:text-2xl font-bold text-white block">NPR {part.price}</span>
      </div>
      <PrimaryButton 
        className="w-full text-[10px] md:text-base py-1.5 md:py-3 h-auto"
        onClick={handleAddToCart}
      >
        Add to Cart
      </PrimaryButton>
    </div>
  );
}
