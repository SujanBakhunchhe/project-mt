"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

function OrdersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get('success')) {
      showToast("Payment successful! Order confirmed.", "success");
    }
    if (searchParams.get('error')) {
      showToast("Payment failed. Please try again.", "error");
    }
  }, [searchParams, showToast]);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <p className="text-white/60 text-lg mb-4">No orders yet</p>
          <button
            onClick={() => router.push('/parts')}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                  <p className="text-white font-bold text-lg">Order #{order.orderNumber}</p>
                  <p className="text-white/60 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-white font-bold text-xl">Rs. {order.total.toFixed(2)}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.status === 'delivered' 
                        ? 'bg-green-500/20 text-green-300'
                        : order.status === 'shipped'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Payment Method</p>
                    <p className="text-white font-semibold capitalize">{order.paymentMethod}</p>
                  </div>
                  {order.transactionId && (
                    <div>
                      <p className="text-white/60">Transaction ID</p>
                      <p className="text-white font-mono text-xs">{order.transactionId}</p>
                    </div>
                  )}
                </div>

                {order.items && order.items.length > 0 && (
                  <div>
                    <p className="text-white/60 text-sm mb-2">Items ({order.items.length})</p>
                    <div className="space-y-2">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm bg-white/5 p-3 rounded-lg">
                          <span className="text-white">{item.product?.name || 'Product'} × {item.quantity}</span>
                          <span className="text-white font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/60 text-sm mb-1">Shipping Address</p>
                  <p className="text-white text-sm">
                    {order.shippingAddress?.name}<br/>
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}<br/>
                    Phone: {order.shippingAddress?.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white">Loading orders...</p>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
