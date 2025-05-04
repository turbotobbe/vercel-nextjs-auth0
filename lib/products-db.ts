import type { Product } from './types';
import { query } from './db';

export async function selectProducts(): Promise<Product[]> {
  const result = await query('SELECT * FROM products ORDER BY uuid DESC');
  return result.rows as Product[];
}

export async function insertProduct(product: Product): Promise<Product> {
  const result = await query(
    `INSERT INTO products (uuid, image_url, name, status, price, stock, available_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      product.uuid,
      product.image_url,
      product.name,
      product.status,
      product.price,
      product.stock,
      product.available_at,
    ]
  );
  return result.rows[0] as Product;
}

export async function deleteProduct(uuid: string): Promise<boolean> {
  const result = await query('DELETE FROM products WHERE uuid = $1 RETURNING *', [uuid]);
  return (result.rowCount ?? 0) > 0;
}

export async function selectProduct(uuid: string): Promise<Product | undefined> {
  const result = await query('SELECT * FROM products WHERE uuid = $1', [uuid]);
  return result.rows[0] as Product | undefined;
}

export async function updateProduct(uuid: string, product: Product): Promise<Product | undefined> {
  const result = await query(
    `UPDATE products SET image_url = $1, name = $2, status = $3, price = $4, stock = $5, available_at = $6 WHERE uuid = $7 RETURNING *`,
    [
      product.image_url,
      product.name,
      product.status,
      product.price,
      product.stock,
      product.available_at,
      uuid,
    ]
  );
  return result.rows[0] as Product | undefined;
} 