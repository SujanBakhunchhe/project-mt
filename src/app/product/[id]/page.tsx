"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { ProductReviews } from "@/components/ProductReviews";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    params.then(p => setProductId(p.id));
  }, [params]);

  useEffect(() => {
    if (!productId) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
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
      addItem({ id: product.id, name: product.name, price: product.price });
    }
    showToast(`Added ${quantity}x ${product.name} to cart!`, "success");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/60 mb-6 md:mb-8 text-sm">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/parts" className="hover:text-white">Parts</Link>
        <span>/</span>
        <span className="text-white truncate">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12">
        {/* Images - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-3 mb-2">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg flex items-center justify-center overflow-hidden">
              {product.images && product.images.length > 0 ? (
                product.images[selectedImage].startsWith('http') ? (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl md:text-6xl">{product.images[selectedImage]}</span>
                )
              ) : (
                <span className="text-5xl md:text-6xl">🔧</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images && product.images.length > 0 && product.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`backdrop-blur-2xl bg-white/10 border rounded-lg p-2 overflow-hidden aspect-square ${
                  selectedImage === i ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-white/20'
                }`}
              >
                {img.startsWith('http') ? (
                  <img 
                    src={img} 
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-xl">{img}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Details - Takes 3 columns */}
        <div className="lg:col-span-3">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-4">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1.5">{product.name}</h1>
            <p className="text-white/50 mb-3 text-xs">{product.brand} • {product.category}</p>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/40 text-xs line-through">NPR {product.marketPrice}</span>
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1.5">NPR {product.price}</p>
              <div className="flex items-center gap-2">
                <p className="text-white/50 text-xs">Stock: {product.stock}</p>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">Low Stock</span>
                )}
                {product.stock === 0 && (
                  <span className="bg-red-500/20 text-red-300 text-xs px-2 py-0.5 rounded-full">Out of Stock</span>
                )}
              </div>
            </div>

            <p className="text-white/60 leading-relaxed text-xs mb-4">{product.description}</p>

            <div className="space-y-2.5 mb-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-xs">Quantity:</span>
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-white/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 hover:bg-white/10 text-white font-bold transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-x border-white/20">
                    <span className="text-white font-semibold">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0}
                    className="w-10 h-10 hover:bg-white/10 text-white font-bold transition-colors disabled:opacity-30 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
              >
                {product.stock === 0 ? '🚫 Out of Stock' : '🛒 Add to Cart'}
              </button>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/9779845170950?text=Hi, I'm interested in ${encodeURIComponent(product.name)} - NPR ${product.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="space-y-1 text-[10px] text-white/50 mt-3">
              <p>✓ Free shipping on orders above NPR 3000</p>
              <p>✓ Cash on Delivery available</p>
              <p>✓ Easy returns within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Specifications */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-5 md:p-6">
          <h2 className="text-xl font-bold text-white mb-4">Features</h2>
          <ul className="space-y-2">
            {product.features && product.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-5 md:p-6">
          <h2 className="text-xl font-bold text-white mb-4">Specifications</h2>
          <dl className="space-y-2">
            {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <dt className="text-white/60">{key}</dt>
                <dd className="text-white font-medium text-right">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-5 md:p-6">
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
}
