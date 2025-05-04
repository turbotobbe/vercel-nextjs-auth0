import { NextResponse } from 'next/server';
import { deleteProduct, selectProduct, updateProduct } from '@/lib/products-db';
import type { Product } from '@/lib/types';

// get a product by uuid
export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  if (!uuid) {
    return NextResponse.json({ error: 'Invalid uuid' }, { status: 400 });
  }
  const product = await selectProduct(uuid);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// update a product by uuid
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  if (!uuid) {
    return NextResponse.json({ error: 'Invalid uuid' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const requiredFields = ['image_url', 'name', 'status', 'price', 'stock', 'available_at'];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }
    const updated = await updateProduct(uuid, body as Product);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/products/[uuid] error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}

// delete a product by uuid
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  if (!uuid) {
    return NextResponse.json({ error: 'Invalid uuid' }, { status: 400 });
  }
  const removed = await deleteProduct(uuid);
  if (!removed) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
} 