export type EvidenceState = "Current build" | "Design target" | "Proposed next step";

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
  job: string;
  value: string;
  stage: string;
  owned: string;
  decision: string;
  nextValidation: string;
  stack: string[];
  repository: string;
  limitations: string[];
  artifacts: ProjectArtifact[];
};
