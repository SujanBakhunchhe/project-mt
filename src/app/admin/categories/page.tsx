"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ToastProvider";

export default function AdminCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory.trim() })
    });

    if (res.ok) {
      showToast("Category added!", "success");
      setNewCategory("");
      fetchCategories();
    } else {
      const error = await res.json();
      showToast(error.error || "Failed to add category", "error");
    }
  };

  const handleDelete = async (category: string) => {
    if (!confirm(`Delete category "${category}"?`)) return;

    const res = await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category })
    });

    if (res.ok) {
      showToast("Category deleted!", "success");
      fetchCategories();
    } else {
      const error = await res.json();
      showToast(error.error || "Failed to delete category", "error");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
        <p className="text-white/60">Manage product categories</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Add New Category</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label className="text-white">Category Name</Label>
              <Input 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)} 
                placeholder="e.g., Engine, Brakes, Electrical"
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
              Add Category
            </Button>
          </form>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Existing Categories ({categories.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="text-white/60 text-center py-8">No categories yet. Add one above!</p>
            ) : (
              categories.map((category) => (
                <div key={category} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <span className="text-white font-medium">{category}</span>
                  <Button 
                    onClick={() => handleDelete(category)} 
                    variant="ghost" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
