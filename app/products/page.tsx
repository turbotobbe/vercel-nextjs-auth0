'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '@/lib/products-api';
import type { Product } from '@/lib/types';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch products on mount
  React.useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  async function handleRemove(uuid: string) {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      await deleteProduct(uuid);
      setProducts(products.filter((p) => p.uuid !== uuid));
    } catch {
      alert('Failed to remove product');
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid gap-4">
        {products.map((product) => (
          <li key={product.uuid} className="border p-4 rounded">
            <Link href={`/products/${product.uuid}`} className="block">
              <img src={product.image_url} alt={product.name} className="w-32 h-32 object-cover mb-2" />
              <div className="font-bold">{product.name}</div>
              <div>Status: {product.status}</div>
              <div>Price: ${product.price}</div>
              <div>Stock: {product.stock}</div>
              <div>Available at: {new Date(product.available_at).toLocaleString()}</div>
            </Link>
            <button onClick={() => handleRemove(product.uuid)} className="mt-2 bg-red-600 text-white px-2 py-1 rounded">Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
} 