const formatter = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
});

export function formatPrice(price: string): string {
  return formatter.format(Number(price));
}
