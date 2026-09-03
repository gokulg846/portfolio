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
};
