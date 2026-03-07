"use client";

import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-white/70 text-xl mb-6">Your cart is empty</p>
          <Link href="/parts">
            <PrimaryButton>
              Continue Shopping
            </PrimaryButton>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🔧</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 truncate">{item.name}</h3>
                    <p className="text-lg font-bold text-blue-400 mb-3">NPR {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded text-white font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="text-white w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg md:text-xl font-bold text-white">NPR {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl p-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-white/20">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>NPR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `NPR ${shipping}`}</span>
                </div>
                {subtotal < 3000 && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-xs text-blue-300">🎉 Add NPR {(3000 - subtotal).toLocaleString()} more for free shipping!</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-white text-xl font-bold mb-5">
                <span>Total</span>
                <span>NPR {total.toLocaleString()}</span>
              </div>
              <Link href="/checkout" className="block mb-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>
              <Link href="/parts" className="block">
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition-all">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
