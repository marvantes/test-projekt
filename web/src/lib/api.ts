import type { Product } from "@/types/product";

type ApiResource<T> = {
  data: T;
};

const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:8000";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${apiBaseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Product API returned ${response.status}`);
  }

  const result: ApiResource<Product[]> = await response.json();

  return result.data;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const response = await fetch(
    `${apiBaseUrl}/api/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Product API returned ${response.status}`);
  }

  const result: ApiResource<Product> = await response.json();

  return result.data;
}
