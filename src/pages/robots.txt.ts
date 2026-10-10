import { siteUrl, productionIndexingEnabled } from "../lib/site-config";

export function GET() {
  const body = productionIndexingEnabled
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
