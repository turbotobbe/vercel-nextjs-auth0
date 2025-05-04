"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products-api";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const { uuid } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uuid) return;
    const productUuid = Array.isArray(uuid) ? uuid[0] : uuid;
    getProduct(productUuid)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [uuid]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-48 h-48 object-cover mb-4" />
      <div>Status: {product.status}</div>
      <div>Price: ${product.price}</div>
      <div>Stock: {product.stock}</div>
      <div>Available at: {new Date(product.available_at).toLocaleString()}</div>
      <Link href={`/products/${product.uuid}/edit`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Edit</Link>
    </main>
  );
} 