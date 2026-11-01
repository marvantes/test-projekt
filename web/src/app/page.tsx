import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const productCountLabel =
    products.length === 1
      ? "produkt"
      : products.length >= 2 && products.length <= 4
        ? "produkty"
        : "produktů";

  return (
    <main className="storefront-shell">
      <header className="site-header">
        <Link className="site-brand" href="/">
          <span className="site-brand__mark" aria-hidden="true">
            E
          </span>
          <span>Učební obchod</span>
        </Link>
        <nav aria-label="Hlavní navigace">
          <Link href="#katalog">Katalog</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Malý projekt, velký prostor pro nápady</p>
          <h1>Vítejte v ukázkovém e-shopu.</h1>
          <p className="hero__description">
            Jednoduchý katalog produktů, na kterém si můžete vyzkoušet, jak
            spolupracují Laravel API, PostgreSQL a Next.js.
          </p>
          <Link className="button button--dark" href="#katalog">
            Prohlédnout katalog
          </Link>
        </div>
        <div className="hero__note" aria-label="Technologie projektu">
          <span className="hero__note-label">Pod kapotou</span>
          <strong>Laravel</strong>
          <span aria-hidden="true">+</span>
          <strong>PostgreSQL</strong>
          <span aria-hidden="true">+</span>
          <strong>Next.js</strong>
        </div>
      </section>

      <section className="catalog" id="katalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Výběr z nabídky</p>
            <h2>Ukázkové produkty</h2>
          </div>
          <p className="section-heading__count">
            {products.length} {productCountLabel}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            Katalog je zatím prázdný. Přidejte produkty pomocí databázového
            seederu.
          </p>
        )}
      </section>

      <footer className="site-footer">
        Výukový projekt · Obsah katalogu slouží pouze jako ukázka.
      </footer>
    </main>
  );
}
