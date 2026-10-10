const siteUrl = import.meta.env.PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const indexingEnabled = import.meta.env.PUBLIC_INDEXING_ENABLED === "true" && Boolean(siteUrl);

export function GET() {
  const body = indexingEnabled
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
