const rawSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim();
let canonicalSiteUrl: string | undefined;

if (rawSiteUrl) {
  const parsed = new URL(rawSiteUrl);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("PUBLIC_SITE_URL must be an HTTPS origin only, for example https://www.example.org");
  }
  canonicalSiteUrl = parsed.origin;
}

export const siteUrl = canonicalSiteUrl;
export const productionIndexingEnabled =
  import.meta.env.PUBLIC_INDEXING_ENABLED === "true" && Boolean(siteUrl);
