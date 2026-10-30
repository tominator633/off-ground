# Off Ground

Web tanečního battlu **Off Ground** v Praze. Dvojjazyčný (CS výchozí, EN), zatím soukromý (`noindex`).

Fakta jsou převzatá z Instagramu [@offground_fest](https://www.instagram.com/offground_fest/), ostatní texty a obrázky jsou zatím **zástupné** – viz [docs/k-diskusi-s-organizatorem.md](docs/k-diskusi-s-organizatorem.md).

## Spuštění

```bash
npm install
cp .env.example .env.local   # a doplnit hodnoty (pro vývoj stačí testovací klíče Turnstile)
npm run dev
```

| Příkaz | Co dělá |
|---|---|
| `npm run dev` | vývojový server na http://localhost:3000 |
| `npm run build` / `npm start` | produkční build / jeho spuštění |
| `npm test` | unit testy (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | vygeneruje typy rout a spustí TypeScript |
| `npm run warm-images -- https://off-ground.vercel.app` | po nasazení zahřeje cache optimalizovaných fotek na Vercelu |

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack, Cache Components, React Compiler)
- **CSS Modules** + design tokeny v [src/styles/tokens.css](src/styles/tokens.css) – žádný Tailwind ani UI knihovny
- **next/font** – Inter Tight pro logo, nadpisy a menu, Encode Sans Expanded pro běžný text (obě vč. `latin-ext` kvůli češtině), **next/image** (AVIF/WebP) pro budoucí fotky
- **Zod** pro validaci formuláře, **Vitest** pro testy
- Hosting **Vercel**; e-maily **Resend**; ochrana proti botům **Cloudflare Turnstile**

## Struktura

```
src/
  app/
    [lang]/            všechny stránky pod /en a /cs (root layout je tady)
      page.tsx         úvod
      events/ events/[slug]/ about/ gallery/ contact/
      not-found.tsx
    robots.ts, icon.svg (favicon = symbol z loga)
  proxy.ts             přesměruje / a cesty bez jazyka na /en nebo /cs podle prohlížeče
  i18n/                konfigurace jazyků + slovníky (en.ts je vzor, cs.ts musí mít stejný tvar)
  content/events.ts    data akcí vč. line-upu – jediné místo, odkud stránky akce čtou
  content/site.ts      odkazy (Instagram, partneři)
  components/          komponenta = složka s <nazev>.tsx + <nazev>.module.css
  lib/                 fonty, formátování, metadata, kontaktní formulář (lib/contact)
  styles/              tokens.css, globals.css, sdílené styly podstránek
docs/                  rozhodnutí a otevřené otázky pro organizátora
```

## Jazyky (i18n)

- URL vždy s prefixem: `/en/...`, `/cs/...`. Na `/` rozhodne `Accept-Language` prohlížeče, jinak čeština.
- Bez knihovny: slovníky jsou TypeScript objekty, jazyk se čte přes `next/root-params` (`getLocale()`, `getDictionary()` v [src/i18n/dictionaries.ts](src/i18n/dictionaries.ts)). Klientským komponentám se texty předávají v props.
- Nový text = přidat klíč do `en.ts` (tvar slovníku) a do `cs.ts`; TypeScript vynutí, aby oba měly stejné klíče.

## Kontaktní formulář a zabezpečení

Server Action [src/lib/contact/actions.ts](src/lib/contact/actions.ts), logika v `process-submission.ts` (pokrytá testy). Vrstvy:

1. kontrola `Origin` (Next.js sám pouští požadavky bez Originu – my ne) + limit těla 64 kB
2. honeypot pole (bot dostane falešný úspěch)
3. rate limit podle IP (3 zprávy / 10 min, 10 / den – v paměti instance, tedy „best effort“)
4. validace Zod: délky, e-mail, zákaz řídicích znaků a zalomení v jméně (header injection), max. 3 odkazy
5. Cloudflare Turnstile ověřený na serveru
6. odeslání přes Resend jako čistý text, uživatelský vstup nikdy v předmětu ani hlavičkách
7. **fail-closed**: v produkci bez klíčů Turnstile/Resend formulář nic nepřijme a ukáže „dočasně nedostupný“

Plošně: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` ([next.config.ts](next.config.ts)).

## Nasazení na Vercel

1. Nahrát repo na GitHub, ve Vercelu „Add New → Project“ a vybrat repo (framework se pozná sám).
2. Nastavit proměnné z `.env.example` (Production i Preview).
3. Dokud `SITE_INDEXING` není `true`, web posílá `noindex` a `robots.txt` vše zakazuje.

Pozor: na free tieru je produkční URL veřejná – kdo zná odkaz, web uvidí. Viz [docs/k-diskusi-s-organizatorem.md](docs/k-diskusi-s-organizatorem.md).
