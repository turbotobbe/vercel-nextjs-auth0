import { NextResponse } from 'next/server';
import { selectProducts, insertProduct } from '@/lib/products-db';
import { Product } from '@/lib/types';

// get all products
export async function GET() {
  const products = await selectProducts();
  return NextResponse.json(products);
}

// create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['uuid', 'image_url', 'name', 'status', 'price', 'stock', 'available_at'];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }
    const newProduct = {
      uuid: body.uuid,
      image_url: body.image_url,
      name: body.name,
      status: body.status,
      price: body.price,
      stock: body.stock,
      available_at: body.available_at,
    };
    const created = await insertProduct(newProduct);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
} 