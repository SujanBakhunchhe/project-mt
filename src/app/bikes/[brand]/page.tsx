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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((model) => (
              <Link
                key={model.id}
                href={`/bikes/${brand}/${model.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center overflow-hidden">
                  {model.image ? (
                    <Image src={model.image} alt={model.name} width={300} height={200} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🏍️</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-white mb-1">{model.name}</h3>
                  <p className="text-xs text-blue-400">View Parts →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
