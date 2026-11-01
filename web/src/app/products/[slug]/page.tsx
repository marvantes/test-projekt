import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="storefront-shell">
      <header className="site-header">
        <Link className="site-brand" href="/">
          <span className="site-brand__mark" aria-hidden="true">
            E
          </span>
          <span>Učební obchod</span>
        </Link>
        <Link href="/" className="site-header__back">
          Všechny produkty
        </Link>
      </header>

      <nav className="breadcrumbs" aria-label="Drobečková navigace">
        <Link href="/">Katalog</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <article className="product-detail">
        <div className="product-detail__art" aria-hidden="true">
          {product.name.slice(0, 1)}
        </div>
        <div className="product-detail__copy">
          <p className="eyebrow">Detail produktu</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">{formatPrice(product.price)}</p>
          <p className="product-detail__description">{product.description}</p>
        </div>
      </article>

      <section className="detail-note">
        <h2>Prostor pro další funkce</h2>
        <p>
          Tady můžete časem přidat dostupnost, galerii nebo tlačítko pro
          vložení do košíku. Teď stránka ukazuje jen data načtená z API.
        </p>
      </section>

      <footer className="site-footer">
        <Link href="/">Zpět na katalog</Link>
      </footer>
    </main>
  );
}
