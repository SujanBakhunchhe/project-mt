"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PartCard } from "@/components/PartCard";

interface ProductCardData {
  id: string;
  name: string;
  price: number;
  marketPrice: number;
  category: string;
  brand?: string | null;
  stock?: number | null;
  images?: string[] | null;
  description?: string | null;
}

interface BikeModelData {
  id: string;
  name: string;
}

export default function BikePartsPage() {
  const params = useParams();
  const brandParam = params.brand as string;
  const modelParam = params.model as string;
  const [parts, setParts] = useState<ProductCardData[]>([]);

  const brand = brandParam.charAt(0).toUpperCase() + brandParam.slice(1);
  const modelName = modelParam.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  useEffect(() => {
    const fetchData = async () => {
      const modelsRes = await fetch("/api/admin/models");
      const models = (await modelsRes.json()) as BikeModelData[];
      const currentModel = models.find((model) =>
        model.name.toLowerCase().replace(/\s+/g, "-") === modelParam.toLowerCase()
      );

      if (currentModel) {
        const productsRes = await fetch(`/api/products?bikeModelId=${currentModel.id}`);
        const products = (await productsRes.json()) as ProductCardData[];
        setParts(products);
      } else {
        setParts([]);
      }
    };

    fetchData();
  }, [brandParam, modelParam]);

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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
