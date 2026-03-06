import { PartCard } from "@/components/PartCard";

const parts = [
  { id: 1, name: 'Engine Oil Filter', price: 450, marketPrice: 600, category: 'Engine', brand: 'Honda', stock: 25 },
  { id: 2, name: 'Brake Pads (Front)', price: 1200, marketPrice: 1500, category: 'Brakes', brand: 'Yamaha', stock: 15 },
  { id: 3, name: 'Chain Sprocket Kit', price: 2500, marketPrice: 3200, category: 'Drive', brand: 'Bajaj', stock: 10 },
  { id: 4, name: 'Air Filter', price: 350, marketPrice: 500, category: 'Engine', brand: 'Hero', stock: 30 },
  { id: 5, name: 'Spark Plug', price: 250, marketPrice: 350, category: 'Engine', brand: 'Honda', stock: 50 },
  { id: 6, name: 'Clutch Plate Set', price: 1800, marketPrice: 2400, category: 'Transmission', brand: 'Yamaha', stock: 8 },
];

export default function PartsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Parts</h1>
        <p className="text-white/70 text-lg">Browse our complete collection of motorcycle parts</p>
      </div>

      {/* Filters */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {['All', 'Engine', 'Brakes', 'Drive', 'Transmission'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>
    </div>
  );
}
