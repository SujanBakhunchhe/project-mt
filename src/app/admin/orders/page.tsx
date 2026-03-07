"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ToastProvider";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      showToast("Order status updated!", "success");
      fetchOrders();
    } else {
      showToast("Failed to update order", "error");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{order.orderNumber}</h3>
                <p className="text-white/70 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()} • {order.user.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">NPR {order.total}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="mt-2 bg-slate-800 border border-white/20 text-white rounded px-3 py-1 text-sm cursor-pointer hover:bg-slate-700 transition-colors"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="Processing" className="bg-slate-800">Processing</option>
                  <option value="Shipped" className="bg-slate-800">Shipped</option>
                  <option value="Delivered" className="bg-slate-800">Delivered</option>
                  <option value="Cancelled" className="bg-slate-800">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-white font-semibold mb-2">Items:</h4>
              <div className="space-y-2">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-white/80 text-sm">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <h4 className="text-white font-semibold mb-2">Shipping Address:</h4>
              <div className="text-white/80 text-sm">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
