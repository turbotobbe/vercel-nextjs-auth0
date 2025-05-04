"use client";
import { useState } from "react";
import { postProduct } from "@/lib/products-api";

export default function ImportProductsPage() {
  const [status, setStatus] = useState<string>("");
  const [importing, setImporting] = useState(false);

  async function handleImport() {
    setImporting(true);
    setStatus("");
    try {
      const res = await fetch("/products.csv");
      if (!res.ok) throw new Error("Failed to fetch CSV");
      const csvText = await res.text();
      const lines = csvText.trim().split("\n");
      const [header, ...rows] = lines;
      const fields = header.replace(/\r/g, "").split(",").map(f => f.replace(/"/g, ""));
      let imported = 0;
      for (const row of rows) {
        const values = row.replace(/\r/g, "").split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(v => v.replace(/"/g, ""));
        const product: any = {};
        fields.forEach((field, i) => {
          product[field] = values[i];
        });
        // Convert stock to number
        if (product.stock) product.stock = Number(product.stock);
        // Send to API
        await postProduct(product);
        imported++;
      }
      setStatus(`Successfully imported ${imported} products.`);
    } catch (err: any) {
      setStatus("Error: " + err.message);
    } finally {
      setImporting(false);
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Import Products from CSV</h1>
      <button onClick={handleImport} disabled={importing} style={{ padding: 8, fontSize: 16 }}>
        {importing ? "Importing..." : "Import All Products"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
} 