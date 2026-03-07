"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PrimaryButton, WhiteButton } from "@/components/Buttons";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white">Order not found</p>
        <Link href="/orders">
          <WhiteButton className="mt-4">View All Orders</WhiteButton>
        </Link>
      </div>
    );
  }

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
          <p className="text-white/60">Order #: <span className="text-white font-semibold">{order.orderNumber}</span></p>
        </div>

        {/* Order Details */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
          
          <div className="space-y-3 mb-6">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{item.product?.name || 'Product'}</p>
                  <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                </div>
                <span className="text-white font-bold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-white/20 pt-4">
            <div className="flex justify-between text-white/80">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Shipping</span>
              <span>Rs. {order.shipping?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white text-xl font-bold border-t border-white/20 pt-2 mt-2">
              <span>Total</span>
              <span>Rs. {order.total?.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60 mb-1">Payment Method</p>
                <p className="text-white font-semibold capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-white/60 mb-1">Payment Status</p>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  order.paymentStatus === 'paid' 
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              {order.transactionId && (
                <div className="md:col-span-2">
                  <p className="text-white/60 mb-1">Transaction ID</p>
                  <p className="text-white font-mono text-xs">{order.transactionId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Shipping To</h2>
          <div className="text-white/80 space-y-1">
            <p className="font-semibold text-white">{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}</p>
            <p>Phone: {order.shippingAddress?.phone}</p>
            <p>Email: {order.shippingAddress?.email}</p>
          </div>
        </div>
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

