// Warms Vercel's image cache after a deploy, so the first visitor doesn't wait for
// on-demand optimization (0.4–1.2 s per photo variant when cold, ~0.1 s when cached).
//
// Usage: npm run warm-images -- https://off-ground.vercel.app

const base = (process.argv[2] ?? "").replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Usage: npm run warm-images -- https://your-site.vercel.app");
  process.exit(1);
}

const locales = ["cs", "en"];
const pages = ["", "/events", "/about", "/gallery", "/gallery/off-ground-1", "/contact"];
const formats = ["image/avif", "image/webp"];
const CONCURRENCY = 4;

async function collectImageUrls() {
  const urls = new Set();
  for (const locale of locales) {
    for (const page of [...pages, ...(await eventPages(locale))]) {
      const html = await fetch(`${base}/${locale}${page}`).then((r) => r.text());
      for (const match of html.matchAll(/\/_next\/image\?url=[^"\s,]+/g)) {
        urls.add(match[0].replaceAll("&amp;", "&"));
      }
    }
  }
  return [...urls];
}

async function eventPages(locale) {
  const html = await fetch(`${base}/${locale}/events`).then((r) => r.text());
  const slugs = new Set([...html.matchAll(new RegExp(`/${locale}(/events/[a-z0-9-]+)`, "g"))].map((m) => m[1]));
  return [...slugs];
}

async function run() {
  const urls = await collectImageUrls();
  const jobs = urls.flatMap((url) => formats.map((format) => ({ url, format })));
  console.log(`Warming ${urls.length} image variants × ${formats.length} formats = ${jobs.length} requests`);

  let done = 0;
  let cold = 0;
  async function worker() {
    while (jobs.length) {
      const { url, format } = jobs.shift();
      const response = await fetch(`${base}${url}`, { headers: { Accept: `${format},*/*` } });
      await response.arrayBuffer();
      if (response.headers.get("x-vercel-cache") !== "HIT") cold++;
      done++;
      if (!response.ok) console.warn(`${response.status} ${url}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`Done: ${done} requests, ${cold} were not cached yet.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
