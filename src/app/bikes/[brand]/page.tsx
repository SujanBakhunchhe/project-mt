"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function BrandModelsPage() {
  const params = useParams();
  const brand = params.brand as string;
  const [models, setModels] = useState<any[]>([]);
  const [brandData, setBrandData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [brand]);

  const fetchData = async () => {
    const brandsRes = await fetch("/api/admin/brands");
    const brands = await brandsRes.json();
    const currentBrand = brands.find((b: any) => b.name.toLowerCase() === brand.toLowerCase());
    setBrandData(currentBrand);

    const modelsRes = await fetch("/api/admin/models");
    const allModels = await modelsRes.json();
    const brandModels = allModels.filter((m: any) => m.brandId === currentBrand?.id);
    setModels(brandModels);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          {brandData?.logo && (
            <Image src={brandData.logo} alt={brandData.name} width={80} height={80} className="rounded-lg" />
          )}
          <h1 className="text-4xl font-bold text-white">{brandData?.name || brand} Models</h1>
        </div>

        {models.length === 0 ? (
          <p className="text-white/60 text-center py-12">No models available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <Link
                key={model.id}
                href={`/bikes/${brand}/${model.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                {model.image && (
                  <Image src={model.image} alt={model.name} width={300} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                <p className="text-blue-400">View Parts →</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
