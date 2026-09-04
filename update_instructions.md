# Updating the portfolio

The portfolio is content-driven. Projects, experience, highlights, Workbench entries, and artifacts can be shown or hidden from their content records. Generic routes generate the pages automatically, so adding an item does not require creating files under `app/projects/` or `app/workbench/`.

## Change the résumé link

Update `resumeUrl` in `content/site.ts`. The desktop navigation, mobile navigation, and footer all use this single value.

## Quick visibility controls

Use these values wherever a record has a `visibility` field:

```ts
visibility: "public"  // shown on the site and included in the static export
visibility: "private" // kept in the repository but removed from public lists and routes
```

Locations:

- Projects: `content/projects/catalog.ts`
- Project artifacts: `content/projects/<project>/index.ts`
- Experience and career highlights: `content/experience.ts`
- Workbench entries: `content/workbench/<entry>.ts`
- Workbench catalog: `content/workbench/catalog.ts`

Workbench artifacts use the same optional `visibility` field as project artifacts; set it to `"private"` to keep the artifact in code without exporting a route.

Project cards also use:

```ts
placement: "flagship"  // appears in the 2x2 expandable grid
placement: "additional" // appears as a compact supporting case study
```

Recording guides should remain `visibility: "private"` until a validated video exists.

## Add a product case study

### 1. Create its artifacts

Create `content/projects/<slug>/index.ts`:

```ts
import type { ProjectArtifact } from "../../types";

export const newProjectArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "One sentence explaining the decision this artifact supports.",
    sections: [
      {
        title: "Artifact status and provenance",
        state: "Current build",
        body: ["Explain when this was created and what evidence supports it."],
      },
      {
        title: "Product brief",
        state: "Design target",
        body: ["Define the user, job, problem, intended change, and boundary."],
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "DEMO RUNBOOK",
    title: "Recording Guide",
    summary: "Private recording preparation.",
    visibility: "private",
    sections: [
      {
        title: "Recording gate",
        state: "Proposed next step",
        bullets: ["List what must be verified before recording."],
      },
    ],
  },
];
```

Useful public artifact slugs are `prd`, `technical-design`, `program-plan`, `validation`, `evaluation`, and `model-card`.

### 2. Add one project record

Import the artifacts in `content/projects/catalog.ts`, then add this inside `allProjects`:

```ts
defineProject({
  slug: "new-project",
  number: "06",
  category: "Domain · product type",
  title: "Project name",
  cardTitle: "A short user-facing promise.",
  summary: "What the implemented product does, in one or two sentences.",
  audience: "Primary user or an explicitly labeled user hypothesis.",
  pain: "The workflow pain and whether it is observed or hypothesized.",
  whatItDoes: "Implemented behavior only.",
  job: "The user's job to be done.",
  value: "A hypothesis unless measured evidence exists.",
  stage: "Current, verifiable product stage.",
  decision: "The most important product or technical decision.",
  stack: ["Technology one", "Technology two"],
  repository: "https://github.com/gokulg846/repository",
  limitations: ["Known limitation", "Evidence still required"],
  artifacts: newProjectArtifacts,
  placement: "additional",
  visibility: "public",
})
```

The generic project and artifact routes are generated automatically after this catalog change.

## Add a Product Workbench entry

Create `content/workbench/<slug>.ts`:

```ts
import type { WorkbenchEntry } from "../types";
import { defineWorkbenchEntry } from "../define";

export const newWorkbenchEntry: WorkbenchEntry = defineWorkbenchEntry({
  slug: "product-review",
  title: "Clear title",
  entryType: "Product teardown",
  productOrScenario: "Product and market being studied",
  question: "The decision or opportunity being examined",
  summary: "What this independent exercise covers.",
  disclosure: "Independent analysis based on public information. Not affiliated with the company.",
  evidenceStatus: "Published",
  sourceBasis: ["Public product page", "Public documentation"],
  tags: ["Product strategy", "User experience"],
  publicationDate: "Month YYYY",
  visibility: "public",
  artifacts: [
    {
      slug: "product-brief",
      label: "FRAME THE OPPORTUNITY",
      title: "Product Brief",
      summary: "The audience, observed workflow, problem, and opportunity.",
      sections: [
        {
          title: "Observed workflow",
          state: "Observed fact",
          body: ["Describe only behavior supported by cited public evidence."],
        },
        {
          title: "Product opportunity",
          state: "Product hypothesis",
          body: ["Explain the interpretation and what must be validated."],
        },
        {
          title: "Proposed change",
          state: "Proposed change",
          body: ["Define the recommendation, tradeoffs, and non-goals."],
        },
        {
          title: "Success metrics",
          state: "Target",
          body: ["Define proposed metrics without presenting them as achieved results."],
        },
      ],
    },
  ],
});
```

Import the entry in `content/workbench/catalog.ts` and add it to `allWorkbenchEntries`. Its overview and artifact routes will be generated automatically.

Allowed Workbench evidence labels are:

- `Observed fact`
- `Scenario assumption`
- `Interpretation`
- `Product hypothesis`
- `Proposed change`
- `Target`
- `Validated finding`

Use `Validated finding` only when the method, sample, and result can be shown.

## Add or hide experience

Edit `content/experience.ts`.

- An employer entry has its own `visibility` field.
- Every nested professional project also has a `visibility` field.
- Career-impact tiles live in `allCareerHighlights` and can be hidden independently.
- Each career tile's `destination` must match the `id` of a visible nested experience project.
- A career tile is automatically suppressed when its destination employer or nested project is private, preventing a broken homepage anchor.

Use `RESULT` only for a supported outcome. Use `CAPABILITIES DELIVERED` or `DELIVERY SCOPE` for work that has no verified outcome metric.

## Evidence rules

- Describe repository behavior separately from user or business value.
- Mark synthetic data, interview exercises, and proposed features explicitly.
- Do not publish a performance number without the commit, environment, method, and sample size.
- Do not publish adoption or outcome claims without a source or completed validation.
- Do not identify confidential customers.
- Keep source interview files out of `public/` unless publication is explicitly approved.

## Check the site

Run:

```bash
npm run lint
npm test
```

`npm test` performs the GitHub Pages build and verifies public routes, `/portfolio` paths, artifact navigation, private recording guides, and forbidden claims.

After merging to `main`, the GitHub Pages workflow in `.github/workflows/pages.yml` deploys the new static build.
