export type EvidenceState = "Current build" | "Design target" | "Proposed next step";
export type ContentVisibility = "public" | "private";

export type ArtifactTable = {
  headers: string[];
  rows: string[][];
};

export type ArtifactSection = {
  title: string;
  state?: EvidenceState;
  body?: string[];
  bullets?: string[];
  table?: ArtifactTable;
  code?: string;
};

export type ProjectArtifact = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  visibility?: "public" | "private";
  sections: ArtifactSection[];
};

export type ProjectCaseStudy = {
  slug: string;
  number: string;
  category: string;
  title: string;
  cardTitle: string;
  summary: string;
  audience: string;
  pain: string;
  whatItDoes: string;
  job: string;
  value: string;
  stage: string;
  decision: string;
  stack: string[];
  repository: string;
  limitations: string[];
  artifacts: ProjectArtifact[];
  placement: "flagship" | "additional";
  visibility: ContentVisibility;
};

export type ExperienceProject = {
  id: string;
  title: string;
  kicker: string;
  challenge: string;
  ownership: string;
  decision: string;
  outcomeLabel: "RESULT" | "CAPABILITIES DELIVERED" | "DELIVERY SCOPE";
  outcome: string;
  technical: string[];
  visibility: ContentVisibility;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  work: string[];
  projects: ExperienceProject[];
  supporting: string[];
  visibility: ContentVisibility;
};

export type CareerHighlight = {
  metric: string;
  description: string;
  label: string;
  destination: string;
  visibility: ContentVisibility;
};

export type WorkbenchEvidenceState =
  | "Observed fact"
  | "Scenario assumption"
  | "Interpretation"
  | "Product hypothesis"
  | "Proposed change"
  | "Target"
  | "Validated finding";

export type WorkbenchArtifactSection = Omit<ArtifactSection, "state"> & {
  state: WorkbenchEvidenceState;
};

export type WorkbenchArtifact = Omit<ProjectArtifact, "sections"> & {
  sections: WorkbenchArtifactSection[];
};

export type WorkbenchEntry = {
  slug: string;
  title: string;
  entryType: "Program case exercise" | "Product teardown" | "Improvement proposal" | "Product concept or PRD";
  productOrScenario: string;
  question: string;
  summary: string;
  disclosure: string;
  evidenceStatus: "Published" | "In progress" | "Planned";
  sourceBasis: string[];
  tags: string[];
  publicationDate: string;
  artifacts: WorkbenchArtifact[];
  visibility: ContentVisibility;
};
