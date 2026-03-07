"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/components/WishlistProvider";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(wishlist.map(id => fetch(`/api/products/${id}`).then(r => r.json())))
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [wishlist]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <p className="text-white/60 mb-4">Your wishlist is empty</p>
          <Link href="/parts" className="text-blue-400 hover:text-blue-300">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl overflow-hidden group">
              <Link href={`/product/${product.id}`} className="block">
                <div className="aspect-square bg-white/5 flex items-center justify-center p-4">
                  {product.images?.[0]?.startsWith('http') ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🔧</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-blue-400 font-bold">NPR {product.price.toLocaleString()}</p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
