import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="storefront-shell state-page">
      <p className="eyebrow">404 · Produkt nenalezen</p>
      <h1>Tento produkt tu není.</h1>
      <p>Možná už není v nabídce, nebo odkaz obsahuje překlep.</p>
      <Link className="button button--dark" href="/">
        Zpět do katalogu
      </Link>
    </main>
  );
}
