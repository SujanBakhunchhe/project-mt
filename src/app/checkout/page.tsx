"use client";

import { useState } from "react";
import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartItems = [
    { id: 1, name: 'Engine Oil Filter', price: 450, quantity: 2 },
    { id: 2, name: 'Brake Pads (Front)', price: 1200, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Full Name</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="Rajesh Kumar" />
              </div>
              <div>
                <Label className="text-white">Phone Number</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="+977 9841234567" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-white">Email</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="rajesh@example.com" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-white">Address</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="Street address" />
              </div>
              <div>
                <Label className="text-white">City</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="Kathmandu" />
              </div>
              <div>
                <Label className="text-white">Postal Code</Label>
                <Input className="bg-white/10 border-white/20 text-white" placeholder="44600" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-white font-semibold">Cash on Delivery</p>
                  <p className="text-white/60 text-sm">Pay when you receive</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="payment"
                  value="esewa"
                  checked={paymentMethod === "esewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-white font-semibold">eSewa</p>
                  <p className="text-white/60 text-sm">Pay with eSewa wallet</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10">
                <input
                  type="radio"
                  name="payment"
                  value="khalti"
                  checked={paymentMethod === "khalti"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-white font-semibold">Khalti</p>
                  <p className="text-white/60 text-sm">Pay with Khalti wallet</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-white/80">
                  <span>{item.name} x{item.quantity}</span>
                  <span>NPR {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>NPR {subtotal}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>NPR {total}</span>
                </div>
              </div>
            </div>

            <PrimaryButton className="w-full mb-3">
              Place Order
            </PrimaryButton>
            <Link href="/cart">
              <WhiteButton className="w-full">
                Back to Cart
              </WhiteButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
