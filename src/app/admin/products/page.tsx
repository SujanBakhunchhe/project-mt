"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    marketPrice: "",
    category: "",
    brand: "",
    stock: "",
    images: [] as string[],
    features: "",
    specifications: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      marketPrice: parseFloat(formData.marketPrice),
      stock: parseInt(formData.stock),
      features: formData.features.split("\n").filter(f => f.trim()),
      specifications: formData.specifications ? JSON.parse(formData.specifications) : {}
    };

    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast(editingId ? "Product updated!" : "Product created!", "success");
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchProducts();
    } else {
      showToast("Failed to save product", "error");
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      marketPrice: product.marketPrice.toString(),
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString(),
      images: product.images || [],
      features: product.features?.join("\n") || "",
      specifications: JSON.stringify(product.specifications || {}, null, 2)
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Product deleted!", "success");
      fetchProducts();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", description: "", price: "", marketPrice: "", category: "",
      brand: "", stock: "", images: [], features: "", specifications: ""
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Products</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}>
          {showForm ? "Cancel" : "+ Add Product"}
        </Button>
      </div>

      {showForm && (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{editingId ? "Edit" : "Add"} Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Name</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Brand</Label>
                <Input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Price (NPR)</Label>
                <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Market Price (NPR)</Label>
                <Input type="number" value={formData.marketPrice} onChange={e => setFormData({...formData, marketPrice: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Category</Label>
                <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Stock</Label>
                <Input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
            </div>
            
            <div>
              <Label className="text-white">Description</Label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-2" rows={3} />
            </div>

            <div>
              <Label className="text-white">Images</Label>
              <CldUploadWidget
                uploadPreset="bikeparts"
                onSuccess={(result: any) => {
                  setFormData({...formData, images: [...formData.images, result.info.secure_url]});
                }}
              >
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="mb-2">Upload Image</Button>
                )}
              </CldUploadWidget>
              <div className="flex gap-2 flex-wrap">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} alt="" className="w-20 h-20 object-cover rounded" />
                    <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white">Features (one per line)</Label>
              <textarea value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-2" rows={4} />
            </div>

            <div>
              <Label className="text-white">Specifications (JSON)</Label>
              <textarea value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-2 font-mono text-sm" rows={4} />
            </div>

            <Button type="submit" className="w-full">{editingId ? "Update" : "Create"} Product</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-white/70">{product.brand} • {product.category} • NPR {product.price}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(product)} variant="outline">Edit</Button>
              <Button onClick={() => handleDelete(product.id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
