import type { Product } from './types';

export async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.APP_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  return res.json();
}

export async function postProduct(product: Product): Promise<Product> {
  const baseUrl = process.env.APP_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
}

export async function deleteProduct(uuid: string): Promise<void> {
  const baseUrl = process.env.APP_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/products/${uuid}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to remove product');
}

export async function putProduct(uuid: string, product: Product): Promise<Product> {
  const baseUrl = process.env.APP_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/products/${uuid}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function getProduct(uuid: string): Promise<Product> {
  const baseUrl = process.env.APP_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/products/${uuid}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
} 