"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { ProductReviews } from "@/components/ProductReviews";

interface Product {
  id: string;
  name: string;
  price: number;
  marketPrice: number;
  brand?: string | null;
  category?: string | null;
  stock?: number | null;
  images?: string[] | null;
  description?: string | null;
  features?: string[] | null;
  specifications?: string | { text?: string | null } | null;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<string>("");
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    params.then((p) => setProductId(p.id));
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(0);

        if (data.category) {
          const relatedRes = await fetch(`/api/products?category=${data.category}`);
          const relatedData = await relatedRes.json();
          const filtered = (relatedData as Product[]).filter((p) => p.id !== productId).slice(0, 4);

          if (filtered.length === 0) {
            const allRes = await fetch("/api/products");
            const allData = await allRes.json();
            setRelatedProducts((allData as Product[]).filter((p) => p.id !== productId).slice(0, 4));
          } else {
            setRelatedProducts(filtered);
          }
        }
      } catch {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      });
    }

    showToast(`Added ${quantity}x ${product.name} to cart!`, "success");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="mb-8 h-4 w-64 animate-pulse rounded bg-white/10"></div>

        <div className="rounded-[2rem] bg-white/10 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.18)] md:p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.02fr)] lg:gap-4">
            <div className="space-y-3">
              <div className="aspect-square animate-pulse rounded-[2rem] bg-white/10"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-[1.2rem] bg-white/10"></div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[1.7rem] bg-white/10 p-5 md:p-6">
              <div className="h-3 w-28 animate-pulse rounded bg-white/10"></div>
              <div className="h-12 w-3/4 animate-pulse rounded bg-white/10"></div>
              <div className="h-8 w-40 animate-pulse rounded bg-white/10"></div>
              <div className="h-24 animate-pulse rounded bg-white/10"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-white/10"></div>
                ))}
              </div>
              <div className="h-12 w-40 animate-pulse rounded-full bg-white/10"></div>
              <div className="h-14 animate-pulse rounded-full bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-xl text-white">Product not found</p>
      </div>
    );
  }

  const gallery = Array.isArray(product.images) ? product.images : [];
  const activeImage = gallery[selectedImage] ?? gallery[0];
  const discount =
    product.marketPrice > product.price
      ? Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)
      : 0;
  const wishlistActive = isInWishlist(product.id);
  const stockValue = typeof product.stock === "number" ? product.stock : 0;
  const maxQuantity = Math.max(1, stockValue || 1);
  const productFacts = [
    product.brand || null,
    product.category || null,
    discount > 0 ? `${discount}% off` : null,
    stockValue === 0 ? "Out of stock" : stockValue < 10 ? `${stockValue} left in stock` : "In stock",
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="mb-4 flex items-center gap-2 text-xs text-white/60 md:mb-8 md:text-sm">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link href="/parts" className="hover:text-white">
          Parts
        </Link>
        <span>/</span>
        <span className="truncate text-white">{product.name}</span>
      </div>

      <div className="mx-auto mb-6 max-w-5xl rounded-[1.35rem] border border-white/20 bg-white/10 p-2.5 text-white shadow-[0_24px_56px_rgba(37,99,235,0.16)] backdrop-blur-2xl md:mb-12 md:rounded-[2rem] md:p-4 lg:p-5">
        <div className="grid gap-3 sm:gap-5 lg:grid-cols-[minmax(250px,0.74fr)_minmax(0,1.04fr)] lg:items-stretch lg:gap-4">
          <div className="space-y-2.5 sm:space-y-3">
            <div 
              className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-gradient-to-br from-blue-600/25 via-sky-400/20 to-indigo-600/15 shadow-inner sm:rounded-[2rem] cursor-pointer"
              onClick={() => setShowLightbox(true)}
            >
              <div className="aspect-[1/0.7] sm:aspect-[1/0.95] lg:min-h-[280px] lg:h-full xl:min-h-[320px]">
                {activeImage ? (
                  typeof activeImage === "string" && activeImage.startsWith("http") ? (
                    <img
                      src={activeImage}
                      alt={product.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.85),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.55),transparent_18%),linear-gradient(135deg,#1ca9e8,#87d9ff_48%,#68748a)]">
                      <span className="text-6xl font-black text-white/75">{activeImage}</span>
                    </div>
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.85),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(255,255,255,0.55),transparent_18%),linear-gradient(135deg,#1ca9e8,#87d9ff_48%,#68748a)]">
                    <svg className="h-20 w-20 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 11-1.4-1.4l7-7a1 1 0 011.4 0zM17 3l4 4M6 15l-3 6 6-3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {gallery.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden rounded-[0.9rem] border p-1 transition-all sm:rounded-[1.2rem] sm:p-1.5 ${
                      selectedImage === i
                        ? "border-blue-400 bg-white/20 shadow-[0_10px_25px_rgba(56,189,248,0.18)]"
                        : "border-white/10 bg-white/10 hover:border-white/25 hover:bg-white/15"
                    }`}
                  >
                    {img.startsWith("http") ? (
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full rounded-[0.9rem] object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-white/10 text-lg font-bold text-white/70">
                        {img}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex h-full flex-col justify-between rounded-[1.15rem] p-1 sm:rounded-[1.7rem]">
            <div className="rounded-[1rem] border border-white/20 bg-white/10 p-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[1.45rem] sm:p-5 lg:p-4">
              <div className="flex flex-col gap-2.5 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-black leading-snug tracking-[-0.03em] text-white sm:text-2xl lg:text-[1.8rem] xl:text-[1.95rem]">
                    {product.name}
                  </h1>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/55 sm:mt-2 sm:text-xs sm:tracking-[0.14em] lg:text-[11px]">
                    {[product.brand, product.category].filter(Boolean).join(" / ")}
                  </p>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xl font-black leading-none text-white sm:text-2xl lg:text-[1.65rem] xl:text-[1.8rem]">
                    NPR {product.price.toLocaleString()}
                  </p>
                  {product.marketPrice > product.price && (
                    <div className="mt-2 flex items-center gap-2 sm:justify-end">
                      <span className="text-xs text-white/35 line-through sm:text-sm">
                        NPR {product.marketPrice.toLocaleString()}
                      </span>
                      <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-lime-200 sm:px-3 sm:text-[0.7rem] sm:tracking-[0.14em]">
                        {discount}% off
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3.5 sm:mt-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[0.65rem] sm:tracking-[0.24em]">
                  Description
                </p>
                <p className="mt-1.5 max-w-3xl text-[11px] leading-5 text-white/72 sm:mt-2 sm:text-sm sm:leading-6 lg:text-[0.9rem]">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="mt-3.5 sm:mt-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[0.65rem] sm:tracking-[0.24em]">
                  Product Details
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                  {productFacts.map((fact) => (
                    <span
                      key={fact}
                      className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white/72 sm:px-3 sm:py-1.5 sm:text-[0.72rem] sm:tracking-[0.12em]"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3.5 sm:mt-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[0.65rem] sm:tracking-[0.24em]">
                  Product Quantity
                </p>
                <div className="mt-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1 shadow-sm backdrop-blur-xl sm:mt-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white transition-colors hover:bg-white/10 sm:h-10 sm:w-10 sm:text-lg"
                  >
                    -
                  </button>
                  <div className="min-w-10 px-2 text-center text-xs font-bold text-white sm:min-w-12 sm:px-3 sm:text-sm">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={stockValue === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-30 sm:h-10 sm:w-10 sm:text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2.5 rounded-[1rem] border border-white/20 bg-white/10 p-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:mt-4 sm:rounded-[1.45rem] sm:p-5 lg:p-4">
              <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:items-center sm:gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={stockValue === 0}
                  className="order-1 flex-1 rounded-full bg-sky-600 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.12em] lg:px-5 lg:py-2.5 lg:text-[11px]"
                >
                  {stockValue === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  onClick={() => {
                    if (wishlistActive) {
                      removeFromWishlist(product.id);
                      showToast("Removed from wishlist", "success");
                    } else {
                      addToWishlist(product.id);
                      showToast("Added to wishlist", "success");
                    }
                  }}
                  className={`order-2 flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:h-10 sm:w-10 lg:h-10 lg:w-10 ${
                    wishlistActive
                      ? "border-red-400/30 bg-red-500/20 text-red-300"
                      : "border-white/20 bg-white/10 text-white/75 hover:border-white/30 hover:bg-white/20 hover:text-white"
                  }`}
                  aria-label={wishlistActive ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg className="h-5 w-5" fill={wishlistActive ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <a
                href={`https://wa.me/9779845170950?text=Hi, I'm interested in ${encodeURIComponent(product.name)} - NPR ${product.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[11px] font-semibold text-white/85 transition-all hover:border-green-400/30 hover:bg-green-500/10 hover:text-green-200 sm:mt-3 sm:px-5 sm:py-2.5 sm:text-xs lg:text-[11px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-medium text-white/55 sm:mt-4 sm:gap-x-5 sm:gap-y-2 sm:text-xs">
                <p>Free shipping on orders above NPR 3000</p>
                <p>Cash on Delivery available</p>
                <p>Easy returns within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:mb-8 md:grid-cols-2 md:gap-6">
        <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-2xl md:p-6">
          <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-xl">Features</h2>
          <ul className="space-y-2">
            {product.features &&
              product.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/80 md:text-sm">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-2xl md:p-6">
          <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-xl">Specifications</h2>
          <div className="whitespace-pre-line text-xs text-white/80 md:text-sm">
            {typeof product.specifications === "string"
              ? product.specifications
              : product.specifications?.text || "No specifications available"}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-2xl md:p-6">
        <ProductReviews productId={productId} />
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-white md:mb-6 md:text-2xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="group overflow-hidden rounded-xl border border-white/20 bg-white/10 transition-all hover:bg-white/20 backdrop-blur-2xl"
              >
                <div className="flex aspect-square items-center justify-center bg-white/5 p-3 md:p-4">
                  {relatedProduct.images?.[0]?.startsWith("http") ? (
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg className="h-12 w-12 text-white/45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 11-1.4-1.4l7-7a1 1 0 011.4 0zM17 3l4 4M6 15l-3 6 6-3" />
                    </svg>
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="mb-1.5 line-clamp-2 text-xs font-semibold text-white transition-colors group-hover:text-blue-300 md:mb-2 md:text-sm">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm font-bold text-blue-400 md:text-lg">
                    NPR {relatedProduct.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            ×
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full">
            {typeof activeImage === "string" && activeImage.startsWith("http") ? (
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="flex items-center justify-center h-96">
                <span className="text-9xl">{activeImage}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
