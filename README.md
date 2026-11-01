# Učební e-shop

Malý výukový základ e-shopu. Projekt ukazuje, jak propojit Laravel JSON API,
PostgreSQL a frontend v Next.js. Je připravený pro lokální vývoj v Dockeru,
nikoli pro produkční nasazení.

## Technologie

- **API:** Laravel 13, PHP 8.5
- **Databáze:** PostgreSQL 17
- **Frontend:** Next.js App Router, React a TypeScript
- **Vývojové prostředí:** Docker Compose

## Spuštění

Je potřeba mít spuštěný Docker Desktop s podporou Docker Compose. V kořenové
složce projektu spusťte:

```powershell
docker compose up --build
```

Po prvním sestavení budou služby dostupné na:

- Frontend: <http://localhost:3000>
- API health-check: <http://localhost:8000/api/health>
- Seznam produktů: <http://localhost:8000/api/products>
- Databáze: `localhost:5432`

Při prvním startu API vytvoří lokální `api/.env`, vygeneruje vývojový klíč,
provede migrace a naplní databázi ukázkovými produkty. Databáze se ukládá do
pojmenovaného Docker volume, takže data zůstanou zachována i po zastavení
kontejnerů.

Zastavení služeb: `Ctrl+C`, případně `docker compose down`. Pokud chcete smazat
i uložená data databáze, použijte `docker compose down -v`.

Hodnoty portů a databáze lze upravit v kořenovém `.env` souboru. Začněte
zkopírováním `.env.example`; výchozí hodnoty umožňují spustit projekt i bez
tohoto souboru. Přihlašovací údaje v příkladu jsou určeny výhradně pro lokální
vývoj.

## Struktura projektu

```text
api/
  app/
    Http/
      Controllers/Api/       # API controllery
      Resources/             # tvar JSON odpovědí
    Models/                  # Eloquent modely
  database/
    migrations/              # změny databázového schématu
    seeders/                 # ukázková data
  routes/api.php             # API endpointy
  tests/Feature/             # API testy
  Dockerfile
web/
  src/
    app/                     # Next.js App Router stránky
    components/              # sdílené UI komponenty
    lib/                     # API klient a pomocné funkce
    types/                   # TypeScript typy
  Dockerfile
compose.yaml                 # propojení služeb
.env.example                 # lokální nastavení Docker Compose
```

## API

| Metoda | Endpoint | Popis |
|---|---|---|
| `GET` | `/api/health` | Stav API |
| `GET` | `/api/products` | Seznam produktů |
| `GET` | `/api/products/{slug}` | Detail produktu podle slugu |

Odpovědi s produkty používají Laravel API Resource a mají obálku `data`:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Hrnek z kameniny",
      "slug": "hrnek-z-kameniny",
      "description": "Ručně glazovaný hrnek na každodenní kávu nebo čaj.",
      "price": "490.00"
    }
  ]
}
```

Frontend načítá API na straně Next.js serveru přes interní adresu
`http://api:8000`. Pro komunikaci mezi kontejnery proto není potřeba nastavovat
CORS.

## Užitečné příkazy

```powershell
# Vypsat zaregistrované API routy
docker compose exec api php artisan route:list --path=api

# Spustit backendové testy
docker compose exec api php artisan test

# Zobrazit logy služeb
docker compose logs -f api web db
```

Po přidání Composer nebo npm závislosti ji nainstalujte v odpovídajícím
kontejneru (`composer install` nebo `npm install`). Po změně závislostí je také
potřeba znovu sestavit příslušný image.

## Rozsah ukázky

Projekt obsahuje katalog, seznam a detail produktu, ale neobsahuje přihlášení,
košík, objednávky ani platby. Ceny jsou pro ukázku zobrazované v Kč. Při dalším
rozšiřování je dobré začít migrací a modelem, pokračovat API routou a resource
a nakonec přidat stránku nebo komponentu ve frontendu.
