"use client";

import Link from "next/link";
import { PrimaryButton } from "@/components/Buttons";
import { useToast } from "@/components/ToastProvider";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";

interface Part {
  id: string;
  name: string;
  price: number;
  marketPrice: number;
  category: string;
  brand?: string;
  stock?: number;
  images?: string[];
}

export function PartCard({ part }: { part: Part }) {
  const { showToast } = useToast();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addItem({ id: part.id, name: part.name, price: part.price });
    showToast(`${part.name} added to cart!`, "success");
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(part.id)) {
      removeFromWishlist(part.id);
      showToast("Removed from wishlist", "success");
    } else {
      addToWishlist(part.id);
      showToast("Added to wishlist", "success");
    }
  };

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all group relative hover:shadow-xl hover:shadow-blue-500/10">
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
      >
        <svg className={`w-4 h-4 md:w-5 md:h-5 ${isInWishlist(part.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} fill={isInWishlist(part.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <Link href={`/product/${part.id}`}>
        <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 overflow-hidden group-hover:scale-105 transition-transform">
          {part.images && part.images.length > 0 ? (
            <img 
              src={part.images[0]} 
              alt={part.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl md:text-5xl">🔧</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-3 md:p-4">
        <Link href={`/product/${part.id}`}>
          <h3 className="text-sm md:text-base font-bold text-white mb-1 hover:text-blue-400 cursor-pointer line-clamp-2 leading-snug">{part.name}</h3>
        </Link>
        <p className="text-white/50 text-xs mb-2 line-clamp-1">
          {part.brand ? `${part.brand} • ` : ''}{part.category}
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg md:text-xl font-bold text-white">NPR {part.price}</span>
          <span className="text-white/40 text-xs line-through">NPR {part.marketPrice}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full font-semibold">
            {Math.round(((part.marketPrice - part.price) / part.marketPrice) * 100)}% OFF
          </span>
          {part.stock !== undefined && part.stock < 10 && (
            <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">
              {part.stock === 0 ? 'Out of Stock' : `Only ${part.stock} left`}
            </span>
          )}
        </div>
        <PrimaryButton 
          className="w-full text-xs md:text-sm py-2 md:py-2.5 mt-3 h-auto"
          onClick={handleAddToCart}
          disabled={part.stock === 0}
        >
          {part.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </PrimaryButton>
      </div>
    </div>
  );
}
