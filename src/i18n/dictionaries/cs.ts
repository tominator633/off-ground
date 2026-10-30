import type { Dictionary } from "./en";

// Pracovní texty první verze – fakta jsou z instagramových příspěvků Off Ground,
// zbytek je zástupný, dokud od organizátora nepřijdou skutečné texty (viz docs/k-diskusi-s-organizatorem.md).
// Čeština je výchozí jazyk webu.

export const cs: Dictionary = {
  meta: {
    siteName: "Off Ground",
    description: "Off Ground – taneční battle v Praze. Line-up, akce, fotky a partneři.",
  },
  nav: {
    home: "Úvod",
    events: "Akce",
    about: "O nás",
    gallery: "Galerie",
    contact: "Kontakt",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    mainNavigation: "Hlavní navigace",
    skipToContent: "Přeskočit na obsah",
    switchLanguage: "Přepnout jazyk",
  },
  common: {
    learnMore: "Zjistit víc",
    getInTouch: "Napiš nám",
    allEvents: "Všechny akce",
    backToEvents: "Zpět na všechny akce",
    photoAlt: "Fotka z prvního Off Ground",
  },
  home: {
    hero: {
      eyebrow: "Taneční battle · Praha",
    },
    next: {
      label: "Další akce",
      edition: "Off Ground #",
      dateTba: "Termín brzy oznámíme",
      placeTba: "Místo upřesníme",
      ticket: "Koupit lístek",
      register: "Přihlásit se do battlu",
      lineup: "Line-up",
    },
    intro: {
      title: "Co je Off Ground",
      paragraphs: [
        "Off Ground je taneční battle, který se jednou za čas objeví v Praze. Tanečníci se potkají v kruhu, DJ udává tempo a publikum je součástí show.",
        "Je jedno, jestli tancuješ, nebo se přijdeš jen dívat – jakmile jsi tam, jsi součástí.",
      ],
    },
    format: {
      title: "Jak to probíhá",
      intro: "Každý Off Ground spojuje battly, showcase a hudbu.",
      items: [
        { title: "Dance battle", text: "Dvě strany, jeden kruh. První ročník se nesl ve znamení misfits vs underdogs." },
        { title: "Freestyle showcase", text: "Hip-hopový freestyle v té nejčistší podobě – žádná choreografie, jen okamžik." },
        { title: "Line-up", text: "Vystupující a DJs, kteří drží parket naživu od otevření až do poslední skladby." },
        { title: "Rozhoduješ ty", text: "Vítěze nevybírá porota za stolem – o vítězi rozhoduješ TY." },
      ],
    },
    lineup: {
      title: "Line-up",
      intro: "Takhle proběhl první Off Ground.",
      detail: "Detail akce",
    },
    gallery: {
      title: "Momenty",
      cta: "Celá galerie",
    },
    partner: {
      title: "Oficiální partner",
      text: "rest.art – bar & cinema na Podolské vodárně, Praha 4.",
      website: "Web rest.art",
      instagram: "rest.art na Instagramu",
      logoAlt: "Logo rest.art – bar & cinema",
      becomeTitle: "Staň se partnerem",
      becomeText: "Chceš Off Ground podpořit? Napiš nám a domluvíme se.",
    },
    cta: {
      title: "Chceš soutěžit, vystoupit nebo pomoct?",
      text: "Napiš nám – ozveme se se vším, co potřebuješ vědět o dalším Off Ground.",
      button: "Napiš nám",
    },
  },
  events: {
    title: "Akce",
    lead: "Všechny Off Groundy na jednom místě – nadcházející i proběhlé.",
    status: { upcoming: "Chystáme", past: "Proběhlo" },
    when: "Kdy",
    time: "Čas",
    where: "Kde",
    timeToBeAnnounced: "Čas upřesníme",
    about: "O akci",
    lineup: "Line-up",
    partner: "Partner",
    nextTitle: "Další Off Ground?",
    nextText: "Další termín oznámíme na Instagramu. Chceš soutěžit nebo vystoupit? Napiš nám.",
  },
  about: {
    title: "O nás",
    lead: "Off Ground je taneční battle od tanečníků pro tanečníky – a pro všechny, kdo se rádi dívají.",
    // Návrh příběhu (vymyšlený pro design) – přepsat podle organizátorů
    story: {
      title: "Jak to vzniklo",
      paragraphs: [
        "Off Ground začal jako rozhovor dvou kamarádů po jednom tréninku. Oba jsme roky jezdili po battlech a pořád se vraceli se stejným pocitem: v Praze chybí místo, kde se potkají všichni – hip-hop, house, krump, nováčci i staří mazáci.",
        "Nechtěli jsme další soutěž, kde se tančí pro porotu za stolem. Chtěli jsme kruh. Lidi namačkané kolem tanečníků, křik, tleskání a publikum, které samo rozhodne, kdo vyhrál.",
        "Název je o momentu, kdy se odlepíš od země – v tanci, v hlavě i v tom, na co si troufneš. Třpytivá hvězda v logu je ten záblesk, když se něco povede.",
        "Sháněli jsme místo, DJs a kamarády, kteří pomůžou se zvukem i s fotkami. Všechno po večerech a za svoje. 10. 10. 2026 se to poprvé povedlo: kruh se nezavřel až do konce a battle misfits vs underdogs rozhodlo publikum.",
        "Teď chystáme další ročníky – každý s vlastním tématem, ale se stejnou energií. Off Ground dělají tanečníci pro tanečníky. A pro každého, kdo se přijde dívat.",
      ],
      quote: "Chtěli jsme parket, kde nikdo nestojí bokem.",
      photoAlt: "Zakladatelé Off Ground spolu před barem s řetězy žárovek",
      photoCaption: "Zakladatelé Off Ground",
    },
    valuesTitle: "Na čem nám záleží",
    values: [
      { title: "Respekt", text: "Battle naplno, respekt ještě víc. Každý tanečník dostane stejný prostor." },
      { title: "Otevřený kruh", text: "Misfits i underdogs vítáni – je jedno, odkud přicházíš." },
      { title: "Publikum", text: "Bez vás není atmosféra. Proto o vítězi rozhodujete vy." },
    ],
  },
  gallery: {
    title: "Galerie",
    lead: "Fotky ze všech Off Groundů – každý ročník má své album.",
    open: "Otevřít fotku",
    close: "Zavřít",
    previous: "Předchozí fotka",
    next: "Další fotka",
    viewer: "Prohlížení fotek",
    openAlbum: "Prohlédnout album",
    backToGallery: "Zpět do galerie",
    photoCount: { one: "fotka", few: "fotky", other: "fotek" },
  },
  faq: {
    title: "Časté dotazy",
    lead: "Nenašel jsi odpověď? Klidně nám napiš.",
    items: [
      {
        question: "Kdo rozhoduje o vítězi?",
        answer: "Ty – publikum. Jak přesně se hlasuje, oznámíme u každé akce.",
      },
      {
        question: "Můžu přijít jen se dívat?",
        answer: "Jasně. Bez publika by Off Ground nebyl.",
      },
      {
        question: "Jak se přihlásím do battlu?",
        answer: "Podrobnosti o přihlášení zveřejníme před každou akcí na Instagramu. Do té doby nám klidně napiš.",
      },
      {
        question: "Kolik stojí vstup?",
        answer: "Cenu vstupného zveřejňujeme u každé akce.",
      },
      {
        question: "Kdy bude další Off Ground?",
        answer: "Sleduj nás na Instagramu – další termín oznámíme nejdřív tam.",
      },
    ],
  },
  contact: {
    title: "Kontakt",
    lead: "Dotaz, přihláška do battlu, partnerství, nebo nás chceš jen pozdravit? Napiš nám.",
    details: {
      text: "Napiš nám přes formulář, nebo nás najdi tady:",
      phone: "telefon",
      email: "e-mail",
      address: "adresa",
      instagram: "instagram",
      soon: "doplníme",
      mapSoon: "Mapa – doplníme, až bude jasné místo",
    },
    form: {
      name: "Jméno",
      email: "E-mail",
      message: "Zpráva",
      honeypot: "Toto pole nech prázdné",
      submit: "Odeslat zprávu",
      sending: "Odesílám…",
      privacyNote: "Tvoje údaje použijeme jen k odpovědi na tvou zprávu.",
      success: "Děkujeme! Tvoje zpráva dorazila. Brzy se ti ozveme.",
      errors: {
        name: "Vyplň prosím jméno (nejvýš 100 znaků).",
        email: "Zadej prosím platnou e-mailovou adresu.",
        message: "Napiš prosím zprávu o délce 10 až 3 000 znaků.",
        captcha: "Potvrď prosím, že nejsi robot.",
        rateLimited: "Za krátkou dobu jsi poslal několik zpráv. Zkus to prosím později.",
        unavailable: "Kontaktní formulář je dočasně nedostupný. Zkus to prosím později.",
        generic: "Něco se pokazilo. Zkus to prosím znovu.",
      },
    },
  },
  footer: {
    tagline: "Taneční battle v Praze.",
    location: "Praha, Česká republika",
    navigation: "Navigace",
    rights: "Všechna práva vyhrazena.",
    madeBy: "made by",
  },
  notFound: {
    title: "Stránka nenalezena",
    text: "Tahle stránka odešla z parketu.",
    back: "Zpět na úvod",
  },
};
