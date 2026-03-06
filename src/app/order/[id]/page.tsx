import Link from "next/link";
import { WhiteButton } from "@/components/Buttons";

export default function OrderDetailPage() {
  const order = {
    id: "ORD-12345",
    date: "March 6, 2026",
    status: "Shipped",
    total: 2100,
    items: [
      { id: 1, name: 'Engine Oil Filter', quantity: 2, price: 450, image: '🔧' },
      { id: 2, name: 'Brake Pads (Front)', quantity: 1, price: 1200, image: '🔧' },
    ],
    shipping: {
      name: "Rajesh Kumar",
      address: "Kathmandu, Nepal",
      phone: "+977 9841234567",
      email: "rajesh@example.com"
    },
    payment: "Cash on Delivery",
    tracking: "In Transit - Expected delivery: March 8, 2026"
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/60 mb-6 text-sm">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/profile" className="hover:text-white">Profile</Link>
        <span>/</span>
        <span className="text-white">Order {order.id}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Order {order.id}</h1>
                <p className="text-white/60">Placed on {order.date}</p>
              </div>
              <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.image}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-white/60 text-sm mb-2">Quantity: {item.quantity}</p>
                    <p className="text-white font-semibold">NPR {item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Tracking Information</h2>
            <p className="text-white/80">{order.tracking}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>NPR {order.total}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between text-white text-lg font-bold">
                  <span>Total</span>
                  <span>NPR {order.total}</span>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">Payment: {order.payment}</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
            <div className="text-white/80 space-y-1 text-sm">
              <p className="font-semibold text-white">{order.shipping.name}</p>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.phone}</p>
              <p>{order.shipping.email}</p>
            </div>
          </div>

          <Link href="/profile">
            <WhiteButton className="w-full">Back to Orders</WhiteButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
