"use client";

import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function ReturnRequestPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    phone: "",
    productName: "",
    reason: "",
    description: "",
    images: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast("Return request submitted! We'll contact you within 24 hours.", "success");
        setFormData({
          orderNumber: "",
          email: "",
          phone: "",
          productName: "",
          reason: "",
          description: "",
          images: []
        });
      } else {
        showToast("Failed to submit request. Please try again.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Return Request</h1>
      <p className="text-white/60 mb-8">
        Fill out the form below to request a return. We'll review and contact you within 24 hours.
      </p>

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Order Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.orderNumber}
                onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                placeholder="ORD-12345678"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+977 9841234567"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
                placeholder="Engine Oil Filter"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Reason for Return <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white backdrop-blur-xl"
              style={{ colorScheme: 'dark' }}
            >
              <option value="" className="bg-slate-800">Select a reason</option>
              <option value="defective" className="bg-slate-800">Defective/Damaged Product</option>
              <option value="wrong" className="bg-slate-800">Wrong Product Received</option>
              <option value="not-as-described" className="bg-slate-800">Not as Described</option>
              <option value="quality" className="bg-slate-800">Quality Issues</option>
              <option value="other" className="bg-slate-800">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe the issue in detail..."
              rows={5}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40"
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">📋 Return Policy Reminder:</h3>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Returns accepted within 7 days of delivery</li>
              <li>• Product must be unused and in original packaging</li>
              <li>• Customer bears return shipping cost (unless defective)</li>
              <li>• Refund processed within 7-10 business days</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? "Submitting..." : "Submit Return Request"}
          </button>
        </form>
      </div>

      <div className="mt-8 backdrop-blur-2xl bg-white/5 border border-white/20 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-3">Need Help?</h3>
        <p className="text-white/70 text-sm mb-3">
          Contact our support team for assistance with your return:
        </p>
        <div className="space-y-2 text-sm text-white/80">
          <p>📧 Email: support@bikepartsnepal.com</p>
          <p>📱 Phone: +977 9845170950</p>
          <p>⏰ Hours: 9 AM - 6 PM (Sun-Fri)</p>
        </div>
      </div>
    </div>
  );
}
