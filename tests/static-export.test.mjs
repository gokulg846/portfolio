import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports the portfolio and public assets for GitHub Pages", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Gokul Gopalakrishnan/);
  assert.match(html, /\/portfolio\/_next\//);

  await Promise.all([
    access(new URL("Gokul_Gopalakrishnan_Resume.pdf", outputRoot)),
    access(new URL("favicon.svg", outputRoot)),
    access(new URL("og.png", outputRoot)),
  ]);
});
