import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports the portfolio and public assets for GitHub Pages", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Gokul Gopalakrishnan/);
  assert.match(html, /I solve technical problems and deliver products that work/);
  assert.match(html, /PUBLIC BUILD · SYNTHETIC DATA · VERIFIED RUN/);
  assert.match(html, /RESUME-REPORTED PROFESSIONAL RESULTS/);
  assert.match(html, /A system view connecting data pipelines, quality gates, and product delivery/);
  assert.doesNotMatch(html, /AI PM \/ TPM \/ PRODUCT ENGINEER/);
  assert.doesNotMatch(html, /94\.8%|99\.2%|NCR-Bench|60\.1%|AMR edge/);
  assert.match(html, /\/portfolio\/_next\//);

  const assetPaths = [
    ...html.matchAll(/(?:href|src)="\/portfolio\/([^"?#]+)/g),
  ].map((match) => match[1]);

  assert.ok(assetPaths.length > 0, "expected exported CSS and JavaScript assets");
  await Promise.all(assetPaths.map((path) => access(new URL(path, outputRoot))));

  await Promise.all([
    access(new URL("Gokul_Gopalakrishnan_Resume.pdf", outputRoot)),
    access(new URL("Gokul_Gopalakrishnan_Technical_Program_Resume.pdf", outputRoot)),
    access(new URL("favicon.svg", outputRoot)),
    access(new URL("og-v2.png", outputRoot)),
  ]);
});
