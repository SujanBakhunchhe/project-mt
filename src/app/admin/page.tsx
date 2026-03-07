"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-white/70 text-sm mb-2">Total Products</h3>
          <p className="text-4xl font-bold text-white">{stats.products}</p>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-white/70 text-sm mb-2">Total Orders</h3>
          <p className="text-4xl font-bold text-white">{stats.orders}</p>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-white/70 text-sm mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-white">NPR {stats.revenue}</p>
        </div>
      </div>
    </div>
  );
}
