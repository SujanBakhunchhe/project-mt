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
  description?: string;
}

export function PartCard({ part }: { part: Part }) {
  const { showToast } = useToast();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlistActive = isInWishlist(part.id);
  const discount =
    part.marketPrice > part.price
      ? Math.round(((part.marketPrice - part.price) / part.marketPrice) * 100)
      : 0;
  const metaLabel = [part.brand, part.category].filter(Boolean).join(" / ");
  const descriptionText =
    part.description?.trim() || metaLabel || "Genuine replacement part for daily riding.";
  const stockLabel =
    part.stock === undefined
      ? null
      : part.stock === 0
        ? "Out of stock"
        : part.stock < 10
          ? `${part.stock} left`
          : "Ready to ship";

  const handleAddToCart = () => {
    addItem({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.images?.[0],
    });
    showToast(`${part.name} added to cart!`, "success");
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlistActive) {
      removeFromWishlist(part.id);
      showToast("Removed from wishlist", "success");
    } else {
      addToWishlist(part.id);
      showToast("Added to wishlist", "success");
    }
  };

  return (
    <div className="group flex h-full flex-col rounded-[1.3rem] border border-white/20 bg-white/10 p-2 text-white shadow-[0_18px_36px_rgba(37,99,235,0.14)] backdrop-blur-2xl transition-all hover:-translate-y-1 hover:border-white/30 hover:bg-white/14 hover:shadow-[0_24px_45px_rgba(37,99,235,0.2)] sm:rounded-[1.6rem] sm:p-2.5">
      <Link href={`/product/${part.id}`} className="block">
        <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-gradient-to-br from-blue-600/25 via-sky-400/20 to-indigo-600/15 sm:rounded-[1.35rem]">
          <div className="aspect-[1/0.7] w-full overflow-hidden sm:aspect-[1/0.76]">
            {part.images && part.images.length > 0 ? (
              <img
                src={part.images[0]}
                alt={part.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.85),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.55),transparent_18%),linear-gradient(135deg,#1ca9e8,#87d9ff_48%,#68748a)]">
                <svg className="h-12 w-12 text-white/70 sm:h-14 sm:w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 11-1.4-1.4l7-7a1 1 0 011.4 0zM17 3l4 4M6 15l-3 6 6-3" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-0.5 pt-2.5 sm:px-1 sm:pt-3">
        <Link href={`/product/${part.id}`} className="block">
          <div className="flex items-start justify-between gap-1.5 sm:gap-2.5">
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-[0.92rem] font-black leading-tight tracking-[-0.02em] text-white sm:text-base">
                {part.name}
              </h3>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[0.95rem] font-black leading-none text-white sm:text-lg">
                NPR {part.price.toLocaleString()}
              </p>
              {part.marketPrice > part.price && (
                <p className="mt-0.5 text-[10px] text-white/35 line-through sm:text-[11px]">
                  NPR {part.marketPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2.5 sm:mt-3">
            <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-[0.58rem] sm:tracking-[0.18em]">
              Details
            </p>
            <p className="mt-1 line-clamp-2 min-h-[2.35rem] text-[10px] leading-4 text-white/72 sm:mt-1.5 sm:min-h-[2.9rem] sm:text-[12px] sm:leading-5">
              {descriptionText}
            </p>
          </div>
        </Link>

        <div className="mt-3 flex flex-wrap gap-1 sm:mt-3.5 sm:gap-1.5">
          {metaLabel && (
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-white/70 sm:px-2.5 sm:text-[0.62rem] sm:tracking-[0.1em]">
              {metaLabel}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-lime-200 sm:px-2.5 sm:text-[0.62rem] sm:tracking-[0.1em]">
              {discount}% off
            </span>
          )}
          {stockLabel && (
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-sky-200 sm:px-2.5 sm:text-[0.62rem] sm:tracking-[0.1em]">
              {stockLabel}
            </span>
          )}
        </div>

        <div className="mt-3.5 flex items-center gap-2 sm:mt-4 sm:gap-2.5">
          <button
            onClick={toggleWishlist}
            className={`flex size-8 items-center justify-center rounded-full border transition-all sm:size-10 ${
              wishlistActive
                ? "border-red-400/30 bg-red-500/20 text-red-300"
                : "border-white/20 bg-white/10 text-white/75 hover:border-white/30 hover:bg-white/20 hover:text-white"
            }`}
            aria-label={wishlistActive ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill={wishlistActive ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <PrimaryButton
            className="h-8 flex-1 rounded-full px-3 text-[10px] font-bold uppercase tracking-[0.1em] shadow-none hover:scale-100 sm:h-10 sm:px-4 sm:text-xs sm:tracking-[0.12em]"
            onClick={handleAddToCart}
            disabled={part.stock === 0}
          >
            {part.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
