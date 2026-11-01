"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="storefront-shell state-page">
      <p className="eyebrow">Něco se pokazilo</p>
      <h1>Obchod se nepodařilo načíst.</h1>
      <p>
        Zkontrolujte, že běží API a databáze, a potom zkuste stránku načíst
        znovu.
      </p>
      <button className="button button--dark" onClick={reset} type="button">
        Zkusit znovu
      </button>
    </main>
  );
}
