"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
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
    bikeModelId: "",
    stock: "",
    images: [] as string[],
    features: "",
    specifications: "",
    featured: false,
    upcoming: false,
    releaseDate: ""
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      marketPrice: parseFloat(formData.marketPrice),
      stock: parseInt(formData.stock),
      features: formData.features.split("\n").filter(f => f.trim()),
      specifications: { text: formData.specifications || "" }
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
      bikeModelId: product.bikeModelId || "",
      stock: product.stock.toString(),
      images: product.images || [],
      features: product.features?.join("\n") || "",
      specifications: JSON.stringify(product.specifications || {}, null, 2),
      featured: product.featured || false,
      upcoming: product.upcoming || false,
      releaseDate: product.releaseDate || ""
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
      brand: "", bikeModelId: "", stock: "", images: [], features: "", specifications: "",
      featured: false, upcoming: false, releaseDate: ""
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products Management</h1>
          <p className="text-white/60">Manage your product catalog</p>
        </div>
        <Button 
          onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </Button>
      </div>

      {showForm && (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">{editingId ? "Edit" : "Add"} Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Name</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white">Bike Model (Optional)</Label>
                <select 
                  value={formData.bikeModelId} 
                  onChange={e => {
                    const selectedModel = models.find(m => m.id === e.target.value);
                    setFormData({
                      ...formData, 
                      bikeModelId: e.target.value,
                      brand: selectedModel?.brand?.name || formData.brand
                    });
                  }}
                  className="w-full bg-slate-800 border border-white/20 text-white rounded-lg p-2"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="">No specific bike (universal part)</option>
                  {brands.map(brand => (
                    <optgroup key={brand.id} label={brand.name}>
                      {models.filter(m => m.brandId === brand.id).map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
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
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  required 
                  className="w-full bg-slate-800 border border-white/20 text-white rounded-lg p-2 cursor-pointer hover:bg-slate-700 transition-colors"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="">Select or type category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                  ))}
                </select>
                <p className="text-white/50 text-xs mt-1">Or type a new category name below</p>
                <Input 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  placeholder="Type new category name"
                  className="bg-white/10 border-white/20 text-white mt-2"
                />
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
                  const newImages = [...formData.images, result.info.secure_url];
                  setFormData(prev => ({...prev, images: newImages}));
                }}
              >
                {({ open }) => (
                  <Button 
                    type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      open();
                    }} 
                    className="mb-2"
                  >
                    Upload Image
                  </Button>
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
              <Label className="text-white">Specifications</Label>
              <textarea 
                value={formData.specifications} 
                onChange={e => setFormData({...formData, specifications: e.target.value})} 
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-2 text-sm" 
                rows={4}
                placeholder="Weight: 150kg, Power: 15HP, Engine: 150cc"
              />
              <p className="text-white/50 text-xs mt-1">Write any text format you want</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={formData.featured} 
                  onChange={e => setFormData({...formData, featured: e.target.checked})} 
                  className="w-4 h-4"
                />
                <Label htmlFor="featured" className="text-white cursor-pointer">Featured Product</Label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="upcoming"
                  checked={formData.upcoming} 
                  onChange={e => setFormData({...formData, upcoming: e.target.checked})} 
                  className="w-4 h-4"
                />
                <Label htmlFor="upcoming" className="text-white cursor-pointer">Upcoming Product</Label>
              </div>
            </div>

            {formData.upcoming && (
              <div>
                <Label className="text-white">Release Date</Label>
                <Input value={formData.releaseDate} onChange={e => setFormData({...formData, releaseDate: e.target.value})} placeholder="e.g., March 2026" className="bg-white/10 border-white/20 text-white" />
              </div>
            )}

            <Button type="submit" className="w-full">{editingId ? "Update" : "Create"} Product</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {products.length === 0 ? (
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No products yet</h3>
            <p className="text-white/60 mb-4">Start by adding your first product</p>
            <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              + Add Product
            </Button>
          </div>
        ) : (
          products.map((product: any) => (
            <div key={product.id} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all">
              <div className="flex flex-col sm:flex-row gap-4">
                {product.images?.[0] && (
                  <div className="w-full sm:w-20 h-32 sm:h-20 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        {product.featured && (
                          <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded">Featured</span>
                        )}
                        {product.upcoming && (
                          <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded">Upcoming</span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm truncate">{product.brand} • {product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">NPR {product.price}</p>
                      <p className="text-white/50 text-xs md:text-sm line-through whitespace-nowrap">NPR {product.marketPrice}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-white/60 mb-3">
                    <span>Stock: {product.stock}</span>
                    <span>•</span>
                    <span>{product.images?.length || 0} images</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleEdit(product)} variant="outline" className="bg-white/5 hover:bg-white/10 border-white/20 text-sm">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(product.id)} className="bg-red-600/80 hover:bg-red-600">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

