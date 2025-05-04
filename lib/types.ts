export interface Product {
  uuid: string;
  image_url: string;
  name: string;
  status: string;
  price: string; // NUMERIC(10,2) is returned as string by pg
  stock: number;
  available_at: string; // returned as ISO string from DB
}
