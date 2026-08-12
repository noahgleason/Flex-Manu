// Runs after `vite build`. The site is a client-rendered SPA (react-router),
// so <title>/description/og:*/canonical for non-home routes only ever exist
// client-side (src/components/Seo.jsx sets them in a useEffect). Crawlers
// that don't execute JS — social-card generators (Slack, iMessage, LinkedIn),
// older/lighter search bots — only ever see dist/index.html's static head,
// meaning every route would report the homepage's title/description/OG image.
//
// Fix: stamp a physical dist/<route>/index.html per route with that route's
// real meta baked in. Netlify (like other static hosts) resolves clean URLs
// against on-disk files before falling through to the SPA catch-all rewrite
// in netlify.toml, so /capabilities is served from dist/capabilities/index.html
// directly. React then hydrates over it as normal and Seo.jsx's effect
// re-applies the same values (a no-op) as the route re-renders client-side.
//
// Keep this list's title/description in sync with each page's <Seo .../> call.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const siteUrl = "https://flexmanufacturing.net";

const ROUTES = [
  {
    slug: "capabilities",
    title: "Gear, Spline & Precision Machining Capabilities | Flex Mfg",
    description: 'Gears & splines to 240" diameter, grinding & honing, turning to 156", five-axis milling. Steel, cast iron, brass, aluminum, Micarta. Metro Detroit.',
  },
  {
    slug: "services",
    title: "Gearbox Repair, Heat Treat & Cryogenics | Flex Manufacturing",
    description: "Gearbox repair, coatings, assemblies, heat treat, cryogenic treatment & engineering services — alongside our custom gear and machining work. Metro Detroit.",
  },
  {
    slug: "about",
    title: "Family-Owned Custom Gear Machining Since 1960 | Flex Mfg",
    description: "Flex Manufacturing is a family-owned custom gear and precision machining sourcing house serving metro Detroit since 1960, now in its second generation.",
  },
  {
    slug: "quote",
    title: "Request a Quote | Flex Manufacturing — Metro Detroit",
    description: "Request a quote for custom gears, splines, grinding, turning, or milling. Attach a print, CAD file, or photo of the part. Family-owned since 1960.",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy | Flex Manufacturing, Inc.",
    description: "How Flex Manufacturing, Inc. collects, uses, and protects information submitted through this website.",
  },
  {
    slug: "thank-you",
    title: "Thank You | Flex Manufacturing, Inc.",
    description: "Your request has been received. Flex Manufacturing replies with a quote, usually the same or next business day.",
    noindex: true,
  },
  {
    slug: "partner-rfq",
    title: "Request for Quote | Flex Manufacturing, Inc.",
    description: "Submit a request for quote to Flex Manufacturing, Inc.",
    noindex: true,
  },
];

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender-seo: expected pattern not found: ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

async function main() {
  const homeHtml = await readFile(join(distDir, "index.html"), "utf8");

  for (const route of ROUTES) {
    const url = `${siteUrl}/${route.slug}`;
    const title = route.title;
    const description = escapeAttr(route.description);

    let html = homeHtml;
    html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${title}</title>`);
    html = replaceTag(html, /<meta name="description" content=".*?">/s, `<meta name="description" content="${description}">`);
    html = replaceTag(html, /<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="${url}">`);
    html = replaceTag(html, /<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${escapeAttr(title)}">`);
    html = replaceTag(html, /<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${description}">`);
    html = replaceTag(html, /<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${url}">`);
    html = replaceTag(html, /<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${escapeAttr(title)}">`);
    html = replaceTag(html, /<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${description}">`);

    if (route.noindex) {
      html = replaceTag(html, /<meta name="description" content="[^"]*">/s, (m) => `${m}\n<meta name="robots" content="noindex">`);
    }

    const outDir = join(distDir, route.slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html, "utf8");
    console.log(`prerender-seo: wrote dist/${route.slug}/index.html`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
