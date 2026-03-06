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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-white/70 text-lg md:text-xl mb-6">Your cart is empty</p>
          <Link href="/parts">
            <PrimaryButton>
              Continue Shopping
            </PrimaryButton>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <span className="text-3xl md:text-4xl">🔧</span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                      <span className="text-xl md:text-2xl font-bold text-white">NPR {item.price}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-xl md:text-2xl font-bold text-white">NPR {item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>NPR {subtotal}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `NPR ${shipping}`}</span>
                </div>
                {subtotal < 3000 && (
                  <p className="text-sm text-blue-400">Add NPR {3000 - subtotal} more for free shipping!</p>
                )}
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-white text-lg md:text-xl font-bold">
                    <span>Total</span>
                    <span>NPR {total}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <PrimaryButton className="w-full mb-3">
                  Proceed to Checkout
                </PrimaryButton>
              </Link>
              <Link href="/parts">
                <WhiteButton className="w-full">
                  Continue Shopping
                </WhiteButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
