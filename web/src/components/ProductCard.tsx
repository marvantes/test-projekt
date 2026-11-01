import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-card__art" aria-hidden="true">
        {product.name.slice(0, 1)}
      </div>
      <div className="product-card__body">
        <h2>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        <p>{product.description}</p>
        <div className="product-card__footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <Link className="product-card__link" href={`/products/${product.slug}`}>
            Detail produktu
          </Link>
        </div>
      </div>
    </article>
  );
}
