# K diskusi s organizátorem

Věci, které je potřeba probrat s organizátorem Off Ground (Tomův bratr), než web půjde ven.
Stav: 20. 10. 2026. Vyřešené body přesuňte do `rozhodnuti.md`.

## 1. Co je na webu ověřené a co ne

**Převzato z Instagramu `@offground_fest` (ověřit, že platí):**
- akce 10. 10. 2026, lokace na Instagramu „Burza #4“,
- line-up: 19:00 doors · 19:30 Amathyst · 20:30 Hip-hop freestyle showcase · 21:00 dance battle *misfits vs underdogs* · 22:00 Imellie · 23:00 defcom,
- „O vítězi rozhoduješ TY“ – o vítězi rozhoduje publikum,
- oficiální partner **rest.art – bar & cinema**, „sídlí na Podolské vodárně na Praze 4“.

**Nejasné – potřebuju doplnit:**
- ~~Co je „Burza #4“~~ – podle stránky akce na Boom Events místo v Holešovické tržnici (akce 10. 10. 19:00 – 11. 10. 1:00). Přesná adresa?
- Jak se akce jmenuje: „Off Ground“, „OFF GROUND fest“ (tak je na Boom Events), „Off Ground #1“? Na webu zatím „Off Ground · Burza #4“.
- Kdo jsou Amathyst, Imellie a defcom (DJs, tanečníci, kapely)? Na webu jsou jen jména.
- Kdo vyhrál první battle a jak hlasovalo publikum?
- Off Ground #2 „Zombiehood“: hero na úvodu ho už propaguje se **smyšleným** datem 31. 10. 2026 20:00 a místem „Kostnice Holešovice, Praha 7“ (jen pro návrh) – skutečné datum, čas a místo doplnit do akce `zombiehood` v `src/content/events.ts` (reklama je z ní přebírá), název do `nextEdition`. Vymyšlený je i popis akce na jejím detailu `/events/off-ground-2-zombiehood`.
- Ročníky **#3 Winter Cypher (23. 1. 2027)** a **#4 Neon Spring (20. 3. 2027)** na stránce Akce jsou **vymyšlené** pro návrh – nahradit skutečnými plány nebo smazat v `src/content/events.ts`.
- Kde se budou prodávat lístky na #2 (odkaz na e-shop / GoOut / Ticketportal)? Tlačítko „Koupit lístek“ zatím vede na Instagram.
- Jak se tanečníci do battlu #2 přihlásí (formulář, Google Form, e-mail, Instagram)? Tlačítko „Přihlásit se do battlu“ zatím vede na kontaktní formulář.

**Vymyšlené texty (zástupné, přepsat podle organizátora):**
- stránka „O nás“ → sekce „Jak to vzniklo“: celý příběh vzniku a citát jsou vymyšlené pro návrh – potřebujeme skutečný příběh (fotka obou zakladatelů už je doplněná, 30. 10. 2026 – souhlasí oba se zveřejněním?),
- úvod „Co je Off Ground“ (zmínka o DJ a kruhu),
- „Jak to probíhá“ (4 karty), stránka „O nás“ včetně hodnot (respekt, otevřený kruh, publikum),
- FAQ (přihlášení do battlu, vstupné, další termín) – odpovědi jsou obecné, bez konkrétních čísel,
- anglické překlady všech textů.

## 2. Fotky

- Fotky z první akce jsou ve složkách `Nálož 01` a `Nálož 02` (51 fotek). Na webu je jich 28: 8 velkých fotek v hlavičkách stránek a 20 v galerii (3 z nich i v „Momentech“ na úvodu). Obrázek na stránce O nás je zatím tie-dye dlaždice.
- Velká fotka v hero na úvodu je už **z prvního Off Ground** (dav kolem kruhu, černobílá, 2000 × 1333 px). Kdo je autor fotky – uvádět kredit? A souhlasí lidé, kteří jsou na ní dobře poznat, se zveřejněním?
- Až fotky přijdou: kolik jich chceme na webu, kdo je autor (uvádět kredit fotografa?) a jestli lidé na fotkách souhlasí se zveřejněním. Rozpoznatelní lidé = osobní údaje podle GDPR; u veřejné akce to obvykle řeší upozornění při vstupu, ale je dobré to mít domluvené.

## 3. Logo a písmo

- Logo je **překreslené podle screenshotu z Instagramu** (hvězda jako vektor, nápis jako text). Má organizátor originál (Canva, PSD, SVG)? Pak sladíme tvar hvězdy a barvy.
- Písmo plakátů je podle tvaru Helvetica Neue (pravděpodobně z Canvy). Na webu je nejbližší volná náhrada Inter Tight. Pokud mají jiné písmo, vyměníme ho na jednom místě (`src/lib/fonts.ts`).

## 4. Kontaktní formulář – co je potřeba zařídit

**Kontakty na stránce Kontakt** jsou převzaté ze stránky první akce na Boom Events (telefon +420 792 645 345, e-mail offgroundevent@gmail.com) – je v pořádku je mít veřejně i na webu? Adresa je zatím jen „Praha“: chceme uvést sídlo, nebo místo konání? Pro mapu Google Maps je potřeba adresa a úprava CSP.

Formulář je hotový a chráněný, ale v produkci nic neodešle, dokud se nenastaví:
1. kam mají zprávy chodit (`CONTACT_TO_EMAIL`) – e-mail organizátora,
2. účet **Resend** a API klíč (zdarma do 3 000 e-mailů/měsíc),
3. **Cloudflare Turnstile** (zdarma) – widget pro doménu webu a oba klíče do Vercelu.

## 5. Hosting, doména, předání

- Teď: Tomův free (Hobby) účet na Vercelu. Hobby je podle podmínek jen pro **nekomerční** použití – pokud web bude prodávat vstupenky nebo propagovat placené akce, je potřeba tarif Pro nebo jiný hosting.
- Doména zatím není (návrh: `offground.cz` nebo podobná – ověřit dostupnost). Doménu by měl vlastnit organizátor.
- Web je zatím `noindex` – vyhledávače ho neindexují.

## 6. Právní věci (zatím neřešíme)

- provozovatel webu (osoba / spolek / firma) a kontakt,
- zásady ochrany osobních údajů kvůli kontaktnímu formuláři (Resend, Cloudflare),
- cookie lišta zatím **není potřeba** – web nepoužívá analytiku ani sledovací cookies. Jediná cookie je funkční `NEXT_LOCALE` (zapamatovaná volba jazyka, 1 rok), která souhlas nevyžaduje, ale patří do zásad ochrany osobních údajů.

## 7. Správa obsahu (CMS) – návrh

Zatím je obsah v kódu (akce v `src/content/events.ts`). Až bude organizátor chtít sám přidávat akce, line-upy a fotky:
- **Sanity** (hostovaný CMS, zdarma) – pokud jde jen o obsah a fotky,
- **Payload CMS + Postgres** – pokud přijdou registrace do battlu, hlasování publika nebo účty.

## 8. Nápady na později

- registrace tanečníků do battlu přes web,
- online hlasování publika („o vítězi rozhoduješ ty“),
- prodej vstupenek,
- odkaz na Instagram v patičce už je; případně TikTok / YouTube s videi z battlu,
- analytika bez cookies (Vercel Web Analytics / Plausible).
