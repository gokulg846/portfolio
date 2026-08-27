import { access, rename, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";

const outputRoot = new URL("../dist/client/", import.meta.url);
const nestedAssets = new URL("portfolio/_next", outputRoot);
const publicAssets = new URL("_next", outputRoot);

await access(nestedAssets, constants.R_OK);
await rm(publicAssets, { recursive: true, force: true });
await rename(nestedAssets, publicAssets);
await rm(new URL("portfolio", outputRoot), { recursive: true, force: true });
await writeFile(new URL(".nojekyll", outputRoot), "");
