"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function AdminBrands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", logo: "" });
  const { showToast } = useToast();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/admin/brands");
      const data = await res.json();
      setBrands(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      setBrands([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/admin/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      showToast("Brand added!", "success");
      setShowForm(false);
      setFormData({ name: "", logo: "" });
      fetchBrands();
    } else {
      showToast("Failed to add brand", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    
    const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Brand deleted!", "success");
      fetchBrands();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bike Brands</h1>
          <p className="text-white/60">Manage bike brands and logos</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
          {showForm ? "Cancel" : "+ Add Brand"}
        </Button>
      </div>

      {showForm && (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Add Brand</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white">Brand Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-white/10 border-white/20 text-white" placeholder="e.g., Honda, Yamaha" />
            </div>
            
            <div>
              <Label className="text-white">Logo</Label>
              <CldUploadWidget
                uploadPreset="bikeparts"
                onSuccess={(result: any) => setFormData({...formData, logo: result.info.secure_url})}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="mb-2">Upload Logo</Button>
                )}
              </CldUploadWidget>
              {formData.logo && (
                <div className="mt-2">
                  <img src={formData.logo} alt="Logo preview" className="w-24 h-24 object-contain bg-white rounded-lg p-2" />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={!formData.logo}>Add Brand</Button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-6">
        {brands.length === 0 ? (
          <div className="col-span-4 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
            <h3 className="text-xl font-bold text-white mb-2">No brands yet</h3>
            <p className="text-white/60 mb-4">Add your first bike brand</p>
            <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              + Add Brand
            </Button>
          </div>
        ) : (
          brands.map((brand: any) => (
            <div key={brand.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-3">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white font-bold mb-3">{brand.name}</h3>
              <Button onClick={() => handleDelete(brand.id)} className="w-full bg-red-600/80 hover:bg-red-600" size="sm">
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
