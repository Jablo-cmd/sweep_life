const siteUrl = import.meta.env.PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const indexingEnabled = import.meta.env.PUBLIC_INDEXING_ENABLED === "true" && Boolean(siteUrl);
const publicRoutes = [
  "/",
  "/pre-school/",
  "/primary-school/",
  "/admissions/",
  "/fees/",
  "/gallery/",
  "/about/",
  "/contact/"
];

export function GET() {
  const urls = indexingEnabled
    ? publicRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")
    : "";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
