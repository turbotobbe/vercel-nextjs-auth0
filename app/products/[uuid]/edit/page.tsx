"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, putProduct } from "@/lib/products-api";
import type { Product } from "@/lib/types";

export default function EditProductPage() {
  const { uuid } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;
    const productUuid = Array.isArray(uuid) ? uuid[0] : uuid;
    getProduct(productUuid)
      .then((data) => {
        setForm({
          uuid: data.uuid,
          image_url: data.image_url,
          name: data.name,
          status: data.status,
          price: data.price,
          stock: data.stock,
          available_at: data.available_at,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [uuid]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form) return;
    const productUuid = Array.isArray(uuid) ? uuid[0] : uuid;
    if (!productUuid) return;
    try {
      await putProduct(productUuid, { ...form, stock: Number(form.stock) });
      router.push(`/products/${productUuid}`);
    } catch {
      setError("Failed to update product");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!form) return <div className="p-8">Product not found</div>;

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="w-full border p-2" required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} className="w-full border p-2" required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-2" required />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} className="w-full border p-2" required />
        <input name="available_at" placeholder="Available At (ISO)" value={form.available_at} onChange={handleChange} className="w-full border p-2" required />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </main>
  );
} 