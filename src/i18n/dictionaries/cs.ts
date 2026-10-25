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
    partners: "Partneři",
    faq: "Časté dotazy",
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
      title: "Off Ground #",
      text: "Druhý Off Ground se chystá. Battle, showcase a line-up – a o vítězi zase rozhoduješ ty.",
      when: "Kdy",
      where: "Kde",
      dateTba: "Termín brzy oznámíme",
      placeTba: "Místo upřesníme",
      register: "Přihlásit se do battlu",
      follow: "Novinky na Instagramu",
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
      cta: "Všichni partneři",
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
    story: [
      "Začalo to jedním nápadem: dostat tanečníky z různých stylů a crews na jeden parket a nechat je potkat se v kruhu.",
      "První Off Ground proběhl 10. 10. 2026. A další přijdou.",
    ],
    valuesTitle: "Na čem nám záleží",
    values: [
      { title: "Respekt", text: "Battle naplno, respekt ještě víc. Každý tanečník dostane stejný prostor." },
      { title: "Otevřený kruh", text: "Misfits i underdogs vítáni – je jedno, odkud přicházíš." },
      { title: "Publikum", text: "Bez vás není atmosféra. Proto o vítězi rozhodujete vy." },
    ],
  },
  gallery: {
    title: "Galerie",
    lead: "Momenty z prvního Off Ground – 10/10/2026.",
    open: "Otevřít fotku",
    close: "Zavřít",
    previous: "Předchozí fotka",
    next: "Další fotka",
    viewer: "Prohlížení fotek",
  },
  partners: {
    title: "Partneři",
    lead: "Off Ground by se bez lidí a míst, která mu věří, neobešel.",
    official: "Oficiální partner",
    restArt: {
      name: "rest.art – bar & cinema",
      text: "Bar a kino na Podolské vodárně v Praze 4 a oficiální partner Off Ground.",
      link: "rest.art na Instagramu",
    },
    becomeTitle: "Staň se partnerem",
    becomeText: "Chceš Off Ground podpořit? Napiš nám a domluvíme se.",
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
    form: {
      name: "Tvoje jméno",
      email: "Tvůj e-mail",
      message: "Tvoje zpráva",
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
