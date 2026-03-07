"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function AdminModels() {
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", brandId: "", image: "" });
  const { showToast } = useToast();

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  const fetchBrands = async () => {
    const res = await fetch("/api/admin/brands");
    const data = await res.json();
    setBrands(Array.isArray(data) ? data : []);
  };

  const fetchModels = async () => {
    const res = await fetch("/api/admin/models");
    const data = await res.json();
    setModels(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/admin/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      showToast("Model added!", "success");
      setShowForm(false);
      setFormData({ name: "", brandId: "", image: "" });
      fetchModels();
    } else {
      showToast("Failed to add model", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this model?")) return;
    
    const res = await fetch(`/api/admin/models/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Model deleted!", "success");
      fetchModels();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bike Models</h1>
          <p className="text-white/60">Manage bike models under each brand</p>
        </div>
        <Button 
          onClick={() => {
            if (brands.length === 0) {
              showToast("Please add a brand first!", "error");
              return;
            }
            setShowForm(!showForm);
          }} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          {showForm ? "Cancel" : "+ Add Model"}
        </Button>
      </div>

      {brands.length === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
          <p className="text-yellow-400 text-center">
            ⚠️ Please add a brand first before adding models. Go to <a href="/admin/brands" className="underline font-bold">Brands</a> page.
          </p>
        </div>
      )}

      {showForm && (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Add Model</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white">Brand</Label>
              <select 
                value={formData.brandId} 
                onChange={e => setFormData({...formData, brandId: e.target.value})} 
                required 
                className="w-full bg-slate-800 border border-white/20 text-white rounded-lg p-2"
                style={{ colorScheme: 'dark' }}
              >
                <option value="">Select brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="text-white">Model Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-white/10 border-white/20 text-white" placeholder="e.g., CBR 150R, R15 V3" />
            </div>
            
            <div>
              <Label className="text-white">Image (Optional)</Label>
              <CldUploadWidget
                uploadPreset="bikeparts"
                onSuccess={(result: any) => setFormData(prev => ({...prev, image: result.info.secure_url}))}
              >
                {({ open }) => (
                  <Button 
                    type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      open();
                    }}
                  >
                    Upload Image
                  </Button>
                )}
              </CldUploadWidget>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
              )}
            </div>

            <Button type="submit" className="w-full">Add Model</Button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {models.map((model: any) => (
          <div key={model.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
            {model.image && (
              <div className="w-full h-32 bg-white/5 rounded-xl overflow-hidden mb-4">
                <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-white font-bold text-lg">{model.name}</h3>
            <p className="text-white/60 text-sm mb-3">{model.brand?.name}</p>
            <Button onClick={() => handleDelete(model.id)} className="w-full bg-red-600/80 hover:bg-red-600" size="sm">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
