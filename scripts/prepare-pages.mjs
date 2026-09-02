import { access, mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";

const outputRoot = new URL("../dist/client/", import.meta.url);
const nestedAssets = new URL("portfolio/_next", outputRoot);
const publicAssets = new URL("_next", outputRoot);

await access(nestedAssets, constants.R_OK);
await rm(publicAssets, { recursive: true, force: true });
await rename(nestedAssets, publicAssets);
await rm(new URL("portfolio", outputRoot), { recursive: true, force: true });

async function createCleanRouteDirectories(directory, relative = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;
    const nextUrl = new URL(nextRelative, outputRoot);
    if (entry.isDirectory()) {
      await createCleanRouteDirectories(nextUrl, nextRelative);
      continue;
    }
    if (!entry.name.endsWith(".html") || nextRelative === "index.html" || nextRelative === "404.html") continue;
    const routeDirectory = nextRelative.slice(0, -5);
    await mkdir(new URL(`${routeDirectory}/`, outputRoot), { recursive: true });
    await rename(nextUrl, new URL(`${routeDirectory}/index.html`, outputRoot));
  }
}

await createCleanRouteDirectories(outputRoot);
await writeFile(new URL(".nojekyll", outputRoot), "");
