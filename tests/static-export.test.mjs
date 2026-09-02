import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

const projectArtifacts = {
  "manufacturing-quality-traceability": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
    "recording-guide",
  ],
  "industrial-sensor-anomaly-detection": [
    "prd",
    "technical-design",
    "evaluation",
    "model-card",
    "program-plan",
    "recording-guide",
  ],
  "continuous-compliance-gate": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
    "recording-guide",
  ],
  "semiconductor-yield-analytics": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
    "recording-guide",
  ],
};

async function exportedHtml(path = "index.html") {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports the recruiter-facing homepage without forbidden positioning", async () => {
  const html = await exportedHtml();

  assert.match(html, /Gokul Gopalakrishnan/);
  assert.match(html, /PRODUCT OWNERSHIP · ENGINEERING DEPTH/);
  assert.match(html, /I solve technical problems and deliver products that work/);
  assert.match(html, /Who it serves\. What it changes\. How it holds up\./);
  assert.match(html, /The code shows what runs\. The artifacts show how I lead\./);

  for (const anchor of [
    "experience-cummins-rag",
    "experience-cummins-validation",
    "experience-purdue-bayer",
    "experience-accenture-iot",
  ]) {
    assert.match(html, new RegExp(`href="#${anchor}"`));
    assert.match(html, new RegExp(`id="${anchor}"`));
  }

  assert.doesNotMatch(
    html,
    /resume-reported|technical product builder|chatgpt|signin-with-chatgpt|openai/i,
  );
  assert.doesNotMatch(html, /94\.8%|99\.2%|NCR-Bench|60\.1%|AMR edge/);
  assert.doesNotMatch(html, /90\/90|139\/139|11,310 die|5,012 source/);
  assert.match(html, /\/portfolio\/_next\//);
});

test("exports all project overviews and every published operating artifact", async () => {
  for (const [project, artifacts] of Object.entries(projectArtifacts)) {
    const projectHtml = await exportedHtml(`projects/${project}/index.html`);
    assert.match(projectHtml, /PRIMARY USER/);
    assert.match(projectHtml, /JOB TO BE DONE/);
    assert.match(projectHtml, /VALUE HYPOTHESIS/);
    assert.match(projectHtml, /WHAT I OWNED/);
    assert.match(projectHtml, /KEY PRODUCT DECISION/);
    assert.match(projectHtml, /CURRENT LIMITS/);

    for (const artifact of artifacts) {
      const artifactHtml = await exportedHtml(
        `projects/${project}/${artifact}/index.html`,
      );
      assert.match(artifactHtml, /class="case-back"/);
      assert.doesNotMatch(
        artifactHtml,
        /resume-reported|technical product builder|chatgpt|signin-with-chatgpt|openai/i,
      );
    }
  }
});

test("exports representative PM, technical, delivery, and validation evidence", async () => {
  const checks = [
    [
      "projects/manufacturing-quality-traceability/prd/index.html",
      /Product Requirements Document/,
    ],
    [
      "projects/continuous-compliance-gate/technical-design/index.html",
      /Policy &amp; Technical Design/,
    ],
    [
      "projects/industrial-sensor-anomaly-detection/evaluation/index.html",
      /Reproducible Evaluation Protocol/,
    ],
    [
      "projects/semiconductor-yield-analytics/validation/index.html",
      /Seeded Validation Plan/,
    ],
  ];

  for (const [path, heading] of checks) {
    assert.match(await exportedHtml(path), heading);
  }
});

test("exports GitHub Pages assets and public files", async () => {
  const html = await exportedHtml();
  const assetPaths = [
    ...html.matchAll(/(?:href|src)="\/portfolio\/([^"?#]+)/g),
  ]
    .map((match) => match[1])
    .filter((path) => path.startsWith("_next/"));

  assert.ok(assetPaths.length > 0, "expected exported CSS and JavaScript assets");
  await Promise.all(assetPaths.map((path) => access(new URL(path, outputRoot))));

  await Promise.all([
    access(new URL("Gokul_Gopalakrishnan_Resume.pdf", outputRoot)),
    access(new URL("Gokul_Gopalakrishnan_Technical_Program_Resume.pdf", outputRoot)),
    access(new URL("favicon.svg", outputRoot)),
    access(new URL("og-v2.png", outputRoot)),
  ]);
});
