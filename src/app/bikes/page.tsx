import Link from "next/link";

const bikes = [
  { id: 1, brand: 'Honda', model: 'CB Shine', image: '🏍️' },
  { id: 2, brand: 'Honda', model: 'Hornet 2.0', image: '🏍️' },
  { id: 3, brand: 'Yamaha', model: 'FZ-S', image: '🏍️' },
  { id: 4, brand: 'Yamaha', model: 'MT-15', image: '🏍️' },
  { id: 5, brand: 'Bajaj', model: 'Pulsar NS200', image: '🏍️' },
  { id: 6, brand: 'Bajaj', model: 'Dominar 400', image: '🏍️' },
  { id: 7, brand: 'Hero', model: 'Splendor Plus', image: '🏍️' },
  { id: 8, brand: 'Hero', model: 'Xtreme 160R', image: '🏍️' },
];

export default function BikesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Bikes</h1>
        <p className="text-white/70 text-lg">Select your bike model to find compatible parts</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {bikes.map((bike) => (
          <Link key={bike.id} href={`/bikes/${bike.brand.toLowerCase()}/${bike.model.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-2">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-6xl">{bike.image}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{bike.model}</h3>
              <p className="text-white/60 text-sm mb-3">{bike.brand}</p>
              <p className="text-blue-400 text-sm group-hover:text-blue-300">View Parts →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
