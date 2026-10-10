import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const htmlFiles = [];
const failures = [];
const titles = new Map();
const productionIndexing = process.env.PUBLIC_INDEXING_ENABLED === "true" && Boolean(process.env.PUBLIC_SITE_URL?.trim());

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
await walk(root);

const expectedRoutes = [
  "index.html", "pre-school/index.html", "primary-school/index.html",
  "admissions/index.html", "fees/index.html", "gallery/index.html",
  "about/index.html", "contact/index.html", "parent-portal/index.html",
  "privacy/index.html", "terms/index.html"
];
for (const route of expectedRoutes) {
  try { await access(path.join(root, route)); }
  catch { failures.push("Missing expected route: /" + route.replace(/index\.html$/, "")); }
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = path.relative(root, file);

  if (!/<html\b[^>]*\blang=["']en-ZA["']/i.test(html)) {
    failures.push(page + ": missing South African English document language");
  }

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  if (!title) failures.push(page + ": missing or empty title");
  else {
    if (titles.has(title)) failures.push(page + ": duplicate title also used by " + titles.get(title));
    titles.set(title, page);
  }

  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim();
  if (!description || description.length < 50 || description.length > 180) {
    failures.push(page + ": meta description missing or outside 50–180 characters");
  }

  const h1Count = [...html.matchAll(/<h1(?:\s[^>]*)?>/gi)].length;
  if (h1Count !== 1) failures.push(page + ": expected exactly one h1, found " + h1Count);

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const alt = match[1].match(/\balt=["']([^"']*)["']/i);
    if (!alt || !alt[1].trim()) failures.push(page + ": image missing non-empty alt text");
  }

  if (/href=["']#["']|href=["']javascript:/i.test(html)) {
    failures.push(page + ": contains a placeholder or javascript link");
  }

  const hasNoIndex = /<meta\s+name=["']robots["']\s+content=["']noindex, nofollow["']/i.test(html);
  const privateRoute = /^(parent-portal|privacy|terms)\/index\.html$/.test(page);
  if ((!productionIndexing || privateRoute) && !hasNoIndex) {
    failures.push(page + ": route should remain noindex until explicitly enabled for production");
  }
  if (productionIndexing && !privateRoute && hasNoIndex) {
    failures.push(page + ": public route unexpectedly remains noindex in production-indexing mode");
  }
}

const robotsPath = path.join(root, "robots.txt");
try {
  const robots = await readFile(robotsPath, "utf8");
  if (!/User-agent:\s*\*/i.test(robots)) failures.push("robots.txt: missing wildcard user-agent rule");
  if (productionIndexing) {
    const expectedSitemap = process.env.PUBLIC_SITE_URL.trim().replace(/\/$/, "") + "/sitemap.xml";
    if (!/Allow:\s*\//i.test(robots) || !robots.includes(expectedSitemap)) {
      failures.push("robots.txt: production crawl policy must allow crawling and advertise the configured sitemap");
    }
  } else if (!/Disallow:\s*\//i.test(robots)) {
    failures.push("robots.txt: preview must disallow crawling until production indexing is explicitly enabled");
  }
} catch {
  failures.push("robots.txt: generated crawl policy is missing");
}

const sitemapPath = path.join(root, "sitemap.xml");
try {
  const sitemap = await readFile(sitemapPath, "utf8");
  if (!sitemap.includes("http://www.sitemaps.org/schemas/sitemap/0.9")) {
    failures.push("sitemap.xml: missing sitemap XML namespace");
  }
  const locCount = (sitemap.match(/<loc>/g) ?? []).length;
  if (!productionIndexing && locCount !== 0) failures.push("sitemap.xml: preview must not publish crawlable production URLs");
  if (productionIndexing && locCount !== 8) failures.push("sitemap.xml: expected 8 public URLs when production indexing is enabled");
} catch {
  failures.push("sitemap.xml: generated sitemap endpoint is missing");
}

const galleryPath = path.join(root, "gallery", "index.html");
try {
  const gallery = await readFile(galleryPath, "utf8");
  const grid = gallery.match(/class=["']gallery-page-grid["'][\s\S]*?<\/div>/i)?.[0] ?? "";
  const imageCount = (grid.match(/<img\b/gi) ?? []).length;
  if (imageCount < 13) failures.push("gallery/index.html: expected at least 13 source gallery images, found " + imageCount);
} catch {
  failures.push("gallery/index.html: unable to inspect gallery output");
}

if (failures.length) {
  console.error("Quality checks failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Quality checks passed for " + htmlFiles.length + " generated HTML pages.");
