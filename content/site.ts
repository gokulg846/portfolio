export const resumeUrl =
  "https://drive.google.com/file/d/1Y5wKez5a-orzJgvev2w6zbhi1HBm89b7/view?usp=sharing";

export const artifactJourney = [
  {
    label: "DEFINE",
    title: "Product definition",
    slugs: ["prd"],
    description: "Start with the user, problem, scope, requirements, and success measures.",
  },
  {
    label: "DECIDE",
    title: "Technical judgment",
    slugs: ["technical-design", "model-card"],
    description: "Review the architecture, contracts, tradeoffs, and technical guardrails.",
  },
  {
    label: "DELIVER",
    title: "Delivery leadership",
    slugs: ["program-plan"],
    description: "See the milestones, dependencies, risks, ownership, and launch gates.",
  },
  {
    label: "VALIDATE",
    title: "Validation and learning",
    slugs: ["validation", "evaluation"],
    description: "Inspect the acceptance plan, evaluation method, failure analysis, and next decision.",
  },
] as const;
