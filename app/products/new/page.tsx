'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from "uuid";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    uuid: v4(),
    image_url: '',
    name: '',
    status: '',
    price: '',
    stock: '',
    available_at: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, stock: Number(form.stock) }),
    });
    if (res.ok) {
      router.push('/products');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to add product');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="w-full border p-2" required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} className="w-full border p-2" required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-2" required />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} className="w-full border p-2" required />
        <input name="available_at" placeholder="Available At (ISO)" value={form.available_at} onChange={handleChange} className="w-full border p-2" required />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </main>
  );
} 