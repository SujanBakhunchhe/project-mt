"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderNumber] = useState(orderId || "ORD-12345");
  const order = {
    id: orderNumber,
    date: "March 6, 2026",
    total: 2100,
    items: [
      { name: 'Engine Oil Filter', quantity: 2, price: 450 },
      { name: 'Brake Pads (Front)', quantity: 1, price: 1200 },
    ],
    shipping: {
      name: "Rajesh Kumar",
      address: "Kathmandu, Nepal",
      phone: "+977 9841234567"
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/70 text-lg mb-2">Thank you for your order</p>
          <p className="text-white/60">Order ID: <span className="text-white font-semibold">{order.id}</span></p>
        </div>

        {/* Order Details */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
          
          <div className="space-y-4 mb-6">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-white/80">
                <span>{item.name} x{item.quantity}</span>
                <span>NPR {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between text-white text-xl font-bold">
              <span>Total</span>
              <span>NPR {order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Shipping To</h2>
          <div className="text-white/80 space-y-1">
            <p className="font-semibold text-white">{order.shipping.name}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/profile" className="flex-1">
            <PrimaryButton className="w-full">View Orders</PrimaryButton>
          </Link>
          <Link href="/" className="flex-1">
            <WhiteButton className="w-full">Continue Shopping</WhiteButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}

