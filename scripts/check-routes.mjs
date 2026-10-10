import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
await walk(root);
const broken = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/\bhref=["']([^"'#]+)["']/g)) {
    const href = match[1].trim();
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = decodeURIComponent(href.split(/[?#]/)[0]);
    const target = pathname.endsWith("/")
      ? path.join(root, pathname, "index.html")
      : path.join(root, pathname);
    try { await access(target); }
    catch { broken.push({ page: path.relative(root, file), href }); }
  }
}
if (broken.length) {
  console.error("Broken internal links found:");
  for (const item of broken) console.error(`- ${item.page}: ${item.href}`);
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} generated HTML pages; no broken internal links found.`);
