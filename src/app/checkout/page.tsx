"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { showToast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    email: session?.user?.email || "",
    address: "",
    city: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id.toString(),
            quantity: item.quantity,
            price: item.price,
          })),
          shipping: formData,
          payment: { method: paymentMethod },
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Order failed", "error");
        return;
      }

      showToast("Order placed successfully!", "success");
      clearCart();
      router.push(`/order-confirmation?orderId=${data.order.orderNumber}`);
    } catch (error) {
      showToast("Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Full Name</Label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white" 
                    placeholder="Rajesh Kumar" 
                  />
                </div>
                <div>
                  <Label className="text-white">Phone Number</Label>
                  <Input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/10 border-white/20 text-white" 
                    placeholder="+977 9841234567" 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-white">Email</Label>
                  <Input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white" 
                    placeholder="rajesh@example.com" 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-white">Address</Label>
                  <Input 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="bg-white/10 border-white/20 text-white" 
                    placeholder="Street address" 
                  />
                </div>
                <div>
                  <Label className="text-white">City</Label>
                  <Input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="bg-white/10 border-white/20 text-white" 
                    placeholder="Kathmandu" 
                  />
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
                {items.map((item) => (
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

              <PrimaryButton type="submit" className="w-full mb-3" disabled={loading || items.length === 0}>
                {loading ? "Processing..." : "Place Order"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
