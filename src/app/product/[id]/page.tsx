"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: 1,
    name: 'Engine Oil Filter',
    price: 450,
    marketPrice: 600,
    brand: 'Honda',
    category: 'Engine',
    stock: 25,
    description: 'High-quality engine oil filter designed for Honda motorcycles. Ensures optimal engine performance and longevity by filtering out contaminants and debris.',
    features: [
      'Premium quality filtration',
      'OEM compatible',
      'Easy installation',
      'Long-lasting durability',
      'Fits multiple Honda models'
    ],
    specifications: {
      'Brand': 'Honda',
      'Part Number': 'HON-OF-001',
      'Material': 'High-grade filter paper',
      'Compatibility': 'Honda CB Shine, Hornet 2.0',
      'Warranty': '6 months'
    },
    images: ['🔧', '🔧', '🔧']
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity}x ${product.name} to cart!`);
  };

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

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
        {/* Images */}
        <div>
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 mb-4">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center">
              <span className="text-7xl md:text-9xl">{product.images[selectedImage]}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`backdrop-blur-2xl bg-white/10 border rounded-xl p-3 md:p-4 ${
                  selectedImage === i ? 'border-blue-500' : 'border-white/20'
                }`}
              >
                <span className="text-3xl md:text-4xl">{img}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">{product.name}</h1>
            <p className="text-white/70 mb-4 md:mb-6">{product.brand} • {product.category}</p>

            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white/60 text-base md:text-lg line-through">NPR {product.marketPrice}</span>
                <span className="bg-green-500 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-semibold">
                  {Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">NPR {product.price}</p>
              <p className="text-white/60 text-sm md:text-base">Stock: {product.stock} available</p>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-white/80 leading-relaxed text-sm md:text-base">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                >
                  -
                </button>
                <span className="text-white w-12 text-center text-lg md:text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base md:text-lg py-5 md:py-6"
              >
                Add to Cart
              </Button>
            </div>

            <div className="space-y-2 text-xs md:text-sm text-white/70">
              <p>✓ Free shipping on orders above NPR 3000</p>
              <p>✓ Cash on Delivery available</p>
              <p>✓ Easy returns within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Specifications */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Features</h2>
          <ul className="space-y-3">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80 text-sm md:text-base">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Specifications</h2>
          <dl className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-white/10 pb-3 text-sm md:text-base">
                <dt className="text-white/70">{key}</dt>
                <dd className="text-white font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
