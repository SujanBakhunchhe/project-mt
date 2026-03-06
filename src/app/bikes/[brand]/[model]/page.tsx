import Link from "next/link";
import { PartCard } from "@/components/PartCard";

const parts = [
  { id: 1, name: 'Engine Oil Filter', price: 450, marketPrice: 600, category: 'Engine' },
  { id: 2, name: 'Brake Pads (Front)', price: 1200, marketPrice: 1500, category: 'Brakes' },
  { id: 3, name: 'Chain Sprocket Kit', price: 2500, marketPrice: 3200, category: 'Drive' },
  { id: 4, name: 'Air Filter', price: 350, marketPrice: 500, category: 'Engine' },
  { id: 5, name: 'Spark Plug', price: 250, marketPrice: 350, category: 'Engine' },
];

export default async function BikePartsPage({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand: brandParam, model: modelParam } = await params;
  const brand = brandParam.charAt(0).toUpperCase() + brandParam.slice(1);
  const model = modelParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/60 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/bikes" className="hover:text-white">Bikes</Link>
        <span>/</span>
        <Link href={`/bikes/${brandParam}`} className="hover:text-white">{brand}</Link>
        <span>/</span>
        <span className="text-white">{model}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{brand} {model}</h1>
        <p className="text-white/70 text-lg">Available parts for your {brand} {model}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map((part) => (
          <PartCard key={part.id} part={part} />
        ))}
      </div>
    </div>
  );
}
