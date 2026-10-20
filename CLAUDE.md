@AGENTS.md

# Projekt: Off Ground

Web tanečního battlu Off Ground v Praze (organizuje ho Tomův bratr). Přehled, stack a struktura: `README.md`. Otevřené otázky pro organizátora: `docs/k-diskusi-s-organizatorem.md`. Rozhodnutí: `docs/rozhodnuti.md` (nová rozhodnutí připisuj: datum, co, proč).

## Pravidla
- Next.js 16 – před psaním kódu čti přibalenou dokumentaci v `node_modules/next/dist/docs/` (viz AGENTS.md).
- Styly jen CSS Modules + `var(--…)` z `src/styles/tokens.css`. Žádný Tailwind, UI knihovny, inline styly. Mobile-first (360 px).
- Jedno písmo na celý web: Inter Tight přes `src/lib/fonts.ts` (náhrada Helvetiky z plakátů). Navigace má stejný tučný a těsný řez jako nápis loga (`--font-nav`). Nadpisy tučně, těsně (`--font-display-tracking`) a se stínem `--shadow-text` jako na plakátech.
- Tie-dye pozadí z plakátů jen jako akcent (hero, line-up, zástupné obrázky) přes komponentu `TieDye`; jinak černé pozadí.
- Fotky přes `next/image` se statickým importem z `src/assets/images` (hero fotky stránek v `sections/`, zmenšené na max. 2400 px). Velká fotka s tónováním = komponenta `PhotoBackdrop`; jediný povolený inline styl je její `objectPosition` (ořez fotky je data, ne styl).
- Každý text v UI jde přes slovníky `src/i18n/dictionaries/{cs,en}.ts`. **Čeština je výchozí jazyk**, angličtina druhý. Česky se tyká.
- Fakta (termíny, line-up, místa, partneři) jen z podkladů od organizátora / z Instagramu `@offground_fest`. Nic si nevymýšlet; co je zástupné, zapsat do `docs/k-diskusi-s-organizatorem.md`.
- Akce se čtou jen přes `src/content/events.ts` (`getEvents`, `getEvent`), aby šel zdroj dat později vyměnit za CMS/databázi.
- Ikony jako inline SVG komponenty ve společné složce `src/components/icons/` (`<nazev>-icon.tsx`, barva `currentColor`, sdílené `icon.module.css`). Žádné knihovny ikon.
- Komponenta = složka v kebab-case s `<nazev>.tsx` + `<nazev>.module.css`. Unit testy vedle kódu (`*.test.ts`).
- Kontaktní formulář: neoslabovat ochrany (Origin, honeypot, rate limit, Zod, Turnstile, fail-closed). Změny logiky pokrýt testy v `process-submission.test.ts`.
- Nic tajného do repa (`.env*` je v `.gitignore`, kromě `.env.example`).
- Před commitem: `npm test`, `npm run lint`, `npm run build`.

## Git
- **Necommitovat, dokud o to Tom výslovně nepožádá.** První commit má obsahovat až relevantní obsah.
- Conventional Commits česky: `feat: …`, `fix: …`, `docs: …`.
- Vzorový projekt gay-aktivreisen (`~/Documents/DEV/MY-PROJECTS/FLO  MY VERSION/`) se nikdy nemění.

## Když si nejsi jistý
Rozhodni rozumně, zapiš do `docs/rozhodnuti.md` a pokračuj. Věci, které musí potvrdit organizátor (texty, termíny, fotky, právní věci), zapiš do `docs/k-diskusi-s-organizatorem.md`.
