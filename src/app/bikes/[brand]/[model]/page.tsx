"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PartCard } from "@/components/PartCard";

export default function BikePartsPage() {
  const params = useParams();
  const brandParam = params.brand as string;
  const modelParam = params.model as string;
  const [parts, setParts] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any>(null);

  const brand = brandParam.charAt(0).toUpperCase() + brandParam.slice(1);
  const modelName = modelParam.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  useEffect(() => {
    fetchData();
  }, [brandParam, modelParam]);

  const fetchData = async () => {
    // Get all models to find the current one
    const modelsRes = await fetch("/api/admin/models");
    const models = await modelsRes.json();
    const currentModel = models.find((m: any) => 
      m.name.toLowerCase().replace(/\s+/g, "-") === modelParam.toLowerCase()
    );
    setModelData(currentModel);

    // Fetch products for this model
    if (currentModel) {
      const productsRes = await fetch(`/api/products?bikeModelId=${currentModel.id}`);
      const products = await productsRes.json();
      setParts(products);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-white/60 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/bikes" className="hover:text-white">Bikes</Link>
        <span>/</span>
        <Link href={`/bikes/${brandParam}`} className="hover:text-white">{brand}</Link>
        <span>/</span>
        <span className="text-white">{modelName}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{brand} {modelName}</h1>
        <p className="text-white/70 text-lg">Available parts for your {brand} {modelName}</p>
      </div>

      {parts.length === 0 ? (
        <p className="text-white/60 text-center py-12">No parts available for this model yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
