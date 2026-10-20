// Draft copy for the first version – facts come from the Off Ground Instagram posts,
// the rest is a placeholder until the organizer sends real texts (see docs/k-diskusi-s-organizatorem.md).
// The Czech dictionary (default language) must keep the same shape.

export const en = {
  meta: {
    siteName: "Off Ground",
    description: "Off Ground – a dance battle in Prague. Line-up, events, photos and partners.",
  },
  nav: {
    home: "Home",
    events: "Events",
    about: "About",
    gallery: "Gallery",
    partners: "Partners",
    faq: "FAQ",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    skipToContent: "Skip to content",
    switchLanguage: "Switch language",
  },
  common: {
    learnMore: "Learn more",
    getInTouch: "Get in touch",
    allEvents: "All events",
    backToEvents: "Back to all events",
    followInstagram: "Follow us on Instagram",
    photoAlt: "Photo from the first Off Ground",
  },
  home: {
    hero: {
      eyebrow: "Dance battle · Prague",
      subtitle: "Dancers, crews and a crowd that decides who wins. Off the ground, into the circle.",
      primaryCta: "See the line-up",
      secondaryCta: "What is Off Ground",
    },
    intro: {
      title: "What is Off Ground",
      paragraphs: [
        "Off Ground is a dance battle that pops up in Prague every now and then. Dancers face each other in the circle, the DJ sets the pace and the crowd is part of the show.",
        "No matter if you dance or just came to watch – once you're there, you're part of it.",
      ],
    },
    format: {
      title: "How it works",
      intro: "Every Off Ground mixes battles, showcases and music.",
      items: [
        { title: "Dance battle", text: "Two sides, one circle. The first edition was all about misfits vs underdogs." },
        { title: "Freestyle showcase", text: "Hip-hop freestyle in its purest form – no choreography, just the moment." },
        { title: "Line-up", text: "Performers and DJs who keep the floor alive from doors to the last track." },
        { title: "You decide", text: "The winner isn't picked by a jury behind a table – it's up to you." },
      ],
    },
    lineup: {
      title: "Line-up",
      intro: "This is how the first Off Ground went down.",
      detail: "Event details",
    },
    gallery: {
      title: "Moments",
      cta: "Full gallery",
    },
    partner: {
      title: "Official partner",
      text: "rest.art – bar & cinema at Podolská vodárna, Prague 4.",
      cta: "All partners",
    },
    cta: {
      title: "Want to battle, perform or help out?",
      text: "Write to us – we'll get back to you with everything about the next Off Ground.",
      button: "Write to us",
    },
  },
  events: {
    title: "Events",
    lead: "Every Off Ground in one place – upcoming and past.",
    status: { upcoming: "Coming up", past: "Took place" },
    when: "When",
    time: "Time",
    where: "Where",
    timeToBeAnnounced: "Time to be announced",
    about: "About the event",
    lineup: "Line-up",
    partner: "Partner",
    nextTitle: "Next Off Ground?",
    nextText: "The next date will be announced on Instagram. Want to compete or perform? Write to us.",
  },
  about: {
    title: "About",
    lead: "Off Ground is a dance battle made by dancers for dancers – and for everyone who loves to watch.",
    story: [
      "It started with one idea: bring dancers from different styles and crews to one floor and let them meet in the circle.",
      "The first Off Ground took place on 10 October 2026. More are coming.",
    ],
    valuesTitle: "What we care about",
    values: [
      { title: "Respect", text: "Battle hard, respect harder. Every dancer gets the same space." },
      { title: "Open circle", text: "Misfits and underdogs welcome – no matter where you come from." },
      { title: "The crowd", text: "Without you there's no vibe. That's why you decide who wins." },
    ],
  },
  gallery: {
    title: "Gallery",
    lead: "Moments from the first Off Ground – 10/10/2026.",
    open: "Open photo",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    viewer: "Photo viewer",
  },
  partners: {
    title: "Partners",
    lead: "Off Ground wouldn't happen without people and places that believe in it.",
    official: "Official partner",
    restArt: {
      name: "rest.art – bar & cinema",
      text: "A bar and cinema at Podolská vodárna in Prague 4 and the official partner of Off Ground.",
      link: "rest.art on Instagram",
    },
    becomeTitle: "Become a partner",
    becomeText: "Would you like to support Off Ground? Write to us and let's talk.",
  },
  faq: {
    title: "Frequently Asked Questions",
    lead: "Didn't find your answer? Just write to us.",
    items: [
      {
        question: "Who decides the winner?",
        answer: "You do – the crowd. The exact way of voting is announced for each event.",
      },
      {
        question: "Can I just come and watch?",
        answer: "Of course. The crowd is what makes Off Ground happen.",
      },
      {
        question: "How do I sign up for the battle?",
        answer: "Registration details are announced before each event on our Instagram. Until then, write to us.",
      },
      {
        question: "How much is the entry?",
        answer: "Prices are announced together with each event.",
      },
      {
        question: "When is the next Off Ground?",
        answer: "Follow us on Instagram – the next date will be announced there first.",
      },
    ],
  },
  contact: {
    title: "Contact",
    lead: "Questions, battle sign-up, partnership or just want to say hi? Send us a message.",
    form: {
      name: "Your name",
      email: "Your e-mail",
      message: "Your message",
      honeypot: "Leave this field empty",
      submit: "Send message",
      sending: "Sending…",
      privacyNote: "We'll use your details only to reply to your message.",
      success: "Thank you! Your message has arrived. We'll get back to you soon.",
      errors: {
        name: "Please enter your name (up to 100 characters).",
        email: "Please enter a valid e-mail address.",
        message: "Please write a message between 10 and 3,000 characters.",
        captcha: "Please confirm that you're not a robot.",
        rateLimited: "You've sent several messages in a short time. Please try again later.",
        unavailable: "The contact form is temporarily unavailable. Please try again later.",
        generic: "Something went wrong. Please try again.",
      },
    },
  },
  footer: {
    tagline: "Dance battle in Prague.",
    location: "Prague, Czech Republic",
    navigation: "Navigation",
  },
  notFound: {
    title: "Page not found",
    text: "This page left the floor.",
    back: "Back to the homepage",
  },
};

export type Dictionary = typeof en;
