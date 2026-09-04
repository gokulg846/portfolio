import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

const projectArtifacts = {
  "real-time-cargo-flight-tracker": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
  ],
  "manufacturing-quality-traceability": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
  ],
  "industrial-sensor-anomaly-detection": [
    "prd",
    "technical-design",
    "evaluation",
    "model-card",
    "program-plan",
  ],
  "continuous-compliance-gate": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
  ],
  "semiconductor-yield-analytics": [
    "prd",
    "technical-design",
    "program-plan",
    "validation",
  ],
};

const workbenchArtifacts = {
  "kafka-iot-program": [
    "program-brief",
    "integrated-delivery-plan",
    "program-governance",
    "status-recovery",
  ],
};

async function exportedHtml(path = "index.html") {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports the recruiter-facing homepage without forbidden positioning", async () => {
  const html = await exportedHtml();

  assert.match(html, /Gokul Gopalakrishnan/);
  assert.doesNotMatch(html, /I BUILD · I ALIGN · I DELIVER/);
  assert.match(html, /I solve technical problems and deliver products that work/);
  assert.match(html, /Products built around real engineering work\./);
  assert.match(html, /Product case studies/);
  assert.doesNotMatch(html, /AI-native/);
  assert.match(html, /AI architecture and compliance platform/);
  assert.match(html, /CAPABILITIES DELIVERED/);
  assert.equal((html.match(/class="product-card"/g) ?? []).length, 4);
  assert.equal((html.match(/class="product-disclosure"/g) ?? []).length, 4);
  assert.equal((html.match(/class="additional-project"/g) ?? []).length, 1);
  assert.match(html, /Real-Time Cargo Flight Tracker/);
  assert.match(html, /Additional case study/);
  assert.match(html, /Semiconductor Yield Analytics/);
  assert.ok(html.indexOf("Real-Time Cargo Flight Tracker") < html.indexOf("Continuous Compliance Gate"));
  assert.ok(html.indexOf("Continuous Compliance Gate") < html.indexOf("Industrial Sensor Anomaly Detection"));
  assert.ok(html.indexOf("Industrial Sensor Anomaly Detection") < html.indexOf("Manufacturing Quality Traceability"));
  assert.match(html, /<summary>Menu<\/summary>/);
  assert.match(html, /Show details \+/);
  assert.match(html, /View case study →/);
  assert.match(html, /Read PRD →/);
  assert.doesNotMatch(html, /Demo guide|Recording Guide|recording-guide/i);
  assert.doesNotMatch(html, /Need a product owner/i);
  assert.match(html, /href="#experience-risingphoenix-platform"/);
  assert.doesNotMatch(html, /users interviewed before MVP definition/i);
  assert.doesNotMatch(html, /WHAT I OWNED|NEXT VALIDATION/);
  assert.match(html, /The systems run\. The artifacts make the product judgment visible\./);
  assert.ok(html.indexOf('id="artifacts"') < html.indexOf('class="section-shell approach"'));
  assert.ok(html.indexOf('id="artifacts"') < html.indexOf('id="experience"'));
  assert.match(html, /href="\/portfolio\/workbench\/"/);
  assert.match(html, /Independent product studies and case exercises\./);
  assert.ok(html.indexOf('id="experience"') < html.indexOf('id="workbench"'));
  assert.doesNotMatch(html, /Planning and recovering a delayed Kafka\/AWS program/);
  assert.doesNotMatch(html, /100,000|\$1\.44M|99\.99%|200,000/);

  for (const anchor of [
    "experience-cummins-rag",
    "experience-risingphoenix-platform",
    "experience-accenture-delivery",
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
  assert.doesNotMatch(html, /millisecond latency|single-command setup|fault tolerant|high-volume ingestion/i);
  assert.match(html, /\/portfolio\/_next\//);
});

test("exports the Product Workbench without mixing exercises into career evidence", async () => {
  const indexHtml = await exportedHtml("workbench/index.html");
  assert.match(indexHtml, /Product Workbench/);
  assert.match(indexHtml, /Independent product studies and case exercises/);
  assert.match(indexHtml, /Planning and recovering a delayed Kafka\/AWS program/);
  assert.match(indexHtml, /href="\/portfolio\/workbench\/kafka-iot-program\/"/);

  for (const [entry, artifacts] of Object.entries(workbenchArtifacts)) {
    const entryHtml = await exportedHtml(`workbench/${entry}/index.html`);
    assert.match(entryHtml, /Independent interview case exercise/);
    assert.match(entryHtml, /scenario assumptions or targets/i);
    assert.doesNotMatch(entryHtml, /professional or production results[.!]?<\/span>/i);

    for (const [artifactIndex, artifact] of artifacts.entries()) {
      const artifactHtml = await exportedHtml(`workbench/${entry}/${artifact}/index.html`);
      const normalizedArtifactHtml = artifactHtml.replaceAll("<!-- -->", "");
      assert.match(artifactHtml, /EVIDENCE BOUNDARY/);
      assert.match(normalizedArtifactHtml, new RegExp(`Artifact ${artifactIndex + 1} of ${artifacts.length}`));
      assert.match(artifactHtml, new RegExp(`href="/portfolio/workbench/${entry}/"`));
      if (artifactIndex > 0) {
        assert.match(artifactHtml, new RegExp(`href="/portfolio/workbench/${entry}/${artifacts[artifactIndex - 1]}/" rel="prev"`));
      } else {
        assert.doesNotMatch(artifactHtml, /rel="prev"/);
      }
      if (artifactIndex < artifacts.length - 1) {
        assert.match(artifactHtml, new RegExp(`href="/portfolio/workbench/${entry}/${artifacts[artifactIndex + 1]}/" rel="next"`));
      } else {
        assert.doesNotMatch(artifactHtml, /rel="next"/);
      }
    }
  }
});

test("keeps source interview PDFs out of the public export", async () => {
  for (const filename of [
    "IoT Data Processing with Apache Kafka Project Deck.pdf",
    "IoT Data Processing with Apache Kafka Project Plan.pdf",
    "IoT Data Processing with Apache Kafka Status Report.pdf",
  ]) {
    await assert.rejects(access(new URL(filename, outputRoot)));
  }
});

test("exports all project overviews and every published operating artifact", async () => {
  for (const [project, artifacts] of Object.entries(projectArtifacts)) {
    const projectHtml = await exportedHtml(`projects/${project}/index.html`);
    assert.match(projectHtml, /THE PAIN/);
    assert.match(projectHtml, /WHAT THE PRODUCT DOES/);
    assert.match(projectHtml, /PRIMARY USER/);
    assert.match(projectHtml, /JOB TO BE DONE/);
    assert.match(projectHtml, /VALUE HYPOTHESIS/);
    assert.doesNotMatch(projectHtml, /WHAT I OWNED/);
    assert.match(projectHtml, /KEY PRODUCT DECISION/);
    assert.match(projectHtml, /CURRENT LIMITS/);
    assert.doesNotMatch(projectHtml, /Demo guide|Recording Guide|recording-guide/i);

    for (const [artifactIndex, artifact] of artifacts.entries()) {
      const artifactHtml = await exportedHtml(
        `projects/${project}/${artifact}/index.html`,
      );
      const normalizedArtifactHtml = artifactHtml.replaceAll("<!-- -->", "");
      assert.match(artifactHtml, /class="case-back"/);
      assert.match(normalizedArtifactHtml, new RegExp(`Artifact ${artifactIndex + 1} of ${artifacts.length}`));
      assert.match(artifactHtml, new RegExp(`href="/portfolio/projects/${project}/"`));
      if (artifactIndex > 0) {
        assert.match(artifactHtml, new RegExp(`href="/portfolio/projects/${project}/${artifacts[artifactIndex - 1]}/" rel="prev"`));
      } else {
        assert.doesNotMatch(artifactHtml, /rel="prev"/);
      }
      if (artifactIndex < artifacts.length - 1) {
        assert.match(artifactHtml, new RegExp(`href="/portfolio/projects/${project}/${artifacts[artifactIndex + 1]}/" rel="next"`));
      } else {
        assert.doesNotMatch(artifactHtml, /rel="next"/);
      }
      assert.doesNotMatch(
        artifactHtml,
        /resume-reported|technical product builder|chatgpt|signin-with-chatgpt|openai/i,
      );
    }
  }
});

test("keeps recording guides out of the public static export", async () => {
  for (const project of Object.keys(projectArtifacts)) {
    await assert.rejects(
      access(new URL(`projects/${project}/recording-guide/index.html`, outputRoot)),
    );
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

test("exports decision-ready PRDs for all projects", async () => {
  for (const project of Object.keys(projectArtifacts)) {
    const html = (await exportedHtml(`projects/${project}/prd/index.html`)).replaceAll("<!-- -->", "");
    for (const section of [
      "Product brief",
      "Artifact status and provenance",
      "Problem evidence and assumptions",
      "Requirements and acceptance criteria",
      "Metric tree",
      "Failure",
      "Rollout and decision gates",
      "Open questions",
    ]) {
      assert.match(html, new RegExp(section, "i"));
    }
    assert.match(html, /Hypothesized current workflow/);
    assert.match(html, /Retrospective portfolio PRD/);
    assert.match(html, /Source commit/);
    assert.match(html, /Product owner/);
    assert.match(html, /Baseline \/ target/);
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

test("all visible résumé links use the current Google Drive document", async () => {
  const html = await exportedHtml();
  const resumeUrl =
    "https://drive.google.com/file/d/1Y5wKez5a-orzJgvev2w6zbhi1HBm89b7/view?usp=sharing";
  const resumeLinks = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>[^<]*Résumé/gi)];

  assert.ok(resumeLinks.length >= 2, "expected desktop, mobile, and footer résumé links");
  assert.ok(resumeLinks.every((match) => match[1] === resumeUrl));
  assert.doesNotMatch(html, /href="[^"]*Gokul_Gopalakrishnan[^"?]*\.pdf/i);
});

test("documents the data-driven update workflow", async () => {
  const instructions = await readFile(new URL("../update_instructions.md", import.meta.url), "utf8");
  assert.match(instructions, /visibility: "public"/);
  assert.match(instructions, /visibility: "private"/);
  assert.match(instructions, /placement: "flagship"/);
  assert.match(instructions, /defineProject/);
  assert.match(instructions, /defineWorkbenchEntry/);
  assert.match(instructions, /generic project and artifact routes are generated automatically/i);
});
