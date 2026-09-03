import type { CareerHighlight, ExperienceEntry } from "./types";
import { defineCareerHighlight, defineExperience, isPublic } from "./define";

// Add or hide employers and nested projects here. See update_instructions.md.
const allExperience: ExperienceEntry[] = [
  defineExperience({
    id: "experience-risingphoenix",
    company: "RisingPhoenix.ai",
    role: "AI Product Engineer Intern",
    period: "Jul 2026 — present",
    summary: "Led product delivery for an AI-driven architecture and compliance platform serving a large financial-services customer, translating business requirements, security standards, and reference architectures into workflows spanning document ingestion, architecture generation, gap analysis, and assurance reporting.",
    work: [
      "Converted CIS, OWASP, NIST, and NYDFS requirements into reusable validation components spanning architecture design, compliance review, and software delivery.",
      "Defined release-assurance workflows integrating SonarQube, Jenkins, Trivy, JFrog, SBOM generation, and security-control validation.",
    ],
    projects: [
      {
        id: "experience-risingphoenix-platform",
        title: "AI architecture and compliance platform",
        kicker: "ENTERPRISE AI PRODUCT DELIVERY",
        challenge: "A large financial-services customer needed business requirements, reference architectures, and security standards turned into a consistent, traceable workflow across AI-generated architecture and compliance outputs.",
        ownership: "I owned cross-functional delivery across AI, backend, frontend, DevOps, security, and architecture teams, translating customer needs into user journeys, functional and technical specifications, implementation plans, test criteria, and deployment-ready capabilities.",
        decision: "Structure the product as versioned, gated workflow stages with persistent state and recovery handling, then combine domain-specific AI strategies and gold-standard examples with deterministic controls and human review.",
        outcomeLabel: "CAPABILITIES DELIVERED",
        outcome: "Document ingestion, architecture generation, gap analysis, assurance reporting, reusable policy controls, AI-assisted quality assurance, and governed software-supply-chain assurance.",
        technical: ["Multi-stage AI workflows", "Database-backed state and recovery", "Human-in-the-loop QA", "Deterministic validation", "CIS / OWASP / NIST / NYDFS", "CI/CD security and SBOM"],
        visibility: "public",
      },
    ],
    supporting: [],
    visibility: "public",
  }),
  defineExperience({
    id: "experience-cummins",
    company: "Cummins",
    role: "Product Engineer Co-op",
    period: "Feb 2025 — Jan 2026",
    summary: "Worked across field-failure investigation, validation programs, engineering workflow automation, and an internal AI knowledge product.",
    work: [],
    projects: [
      {
        id: "experience-cummins-rag",
        title: "Internal GenAI knowledge tool",
        kicker: "AI PRODUCT DELIVERY",
        challenge: "Engineers were spending too long locating information across internal documentation.",
        ownership: "I identified the opportunity, shaped the product concept, built the prototype, and carried the RAG-based knowledge tool through release.",
        decision: "Use retrieval-augmented generation to ground responses in internal documentation rather than ship a general-purpose chatbot.",
        outcomeLabel: "RESULT",
        outcome: "Reduced internal documentation-retrieval time by 80%.",
        technical: ["RAG architecture", "Document retrieval", "Context grounding", "LLM response generation"],
        visibility: "public",
      },
      {
        id: "experience-cummins-validation",
        title: "Field-failure validation program",
        kicker: "TECHNICAL PROGRAM OWNERSHIP",
        challenge: "Bolted-joint failures in field returns created a validation and warranty-risk question with potential exposure across more than 5,000 units.",
        ownership: "I spearheaded the investigation and developed a shaker-test plan using field-derived power spectral density profiles.",
        decision: "Base the validation input on observed field vibration rather than a generic test profile, so the test represented the actual failure environment.",
        outcomeLabel: "RESULT",
        outcome: "Established the validation path for a failure program involving potential exposure across 5,000+ units.",
        technical: ["Field-return analysis", "Bolted joints", "Shaker testing", "PSD vibration profiles", "Validation planning"],
        visibility: "public",
      },
    ],
    supporting: [
      "Automated test analysis and visualization in MATLAB, removing 20+ hours of manual work each week.",
      "Supported emissions validation through end-to-end test strategies and production-readiness coordination.",
      "Designed and analyzed production-scale components using Creo, GD&T, DFM/DFA, and ANSYS; identified two concepts with 20% performance improvement.",
    ],
    visibility: "public",
  }),
  defineExperience({
    id: "experience-purdue-bayer-role",
    company: "Purdue–Bayer Innovation",
    role: "Data Science Consultant",
    period: "Aug 2023 — Dec 2023",
    summary: "Took an agritech workflow from user discovery and requirements through a computer-vision MVP.",
    work: [],
    projects: [
      {
        id: "experience-purdue-bayer",
        title: "Agritech discovery and computer-vision MVP",
        kicker: "DISCOVERY TO MVP",
        challenge: "The agritech platform needed a more scalable way to map farmland from satellite imagery.",
        ownership: "I conducted 20+ user interviews, translated the findings into product requirements and MVP scope, and built the computer-vision workflow.",
        decision: "Prioritize farmland mapping as a bounded MVP tied directly to the workflow problems identified during discovery.",
        outcomeLabel: "RESULT",
        outcome: "Reduced operating costs by 45%.",
        technical: ["PyTorch", "OpenCV", "Satellite imagery", "Computer vision"],
        visibility: "public",
      },
    ],
    supporting: [],
    visibility: "public",
  }),
  defineExperience({
    id: "experience-accenture",
    company: "Accenture",
    role: "Analyst — Data & Analytics",
    period: "Jul 2021 — Jul 2023",
    summary: "Built industrial data and ML workflows that converted high-frequency sensor data into monitoring and predictive-maintenance decisions.",
    work: [],
    projects: [
      {
        id: "experience-accenture-delivery",
        title: "Delivery operations and SLA visibility",
        kicker: "PROGRAM OPERATIONS",
        challenge: "Delivery teams needed a clearer operating view of milestones, dependencies, and service-level performance.",
        ownership: "I built Tableau and Gantt-based KPI tracking that connected delivery progress with the service-level commitments teams were managing.",
        decision: "Bring schedule and SLA signals into one review workflow so delivery conversations could focus on exceptions, ownership, and recovery actions.",
        outcomeLabel: "RESULT",
        outcome: "Improved SLA compliance by 12%.",
        technical: ["Tableau", "KPI design", "Gantt planning", "SLA tracking", "Delivery reporting"],
        visibility: "public",
      },
      {
        id: "experience-accenture-iot",
        title: "Industrial IoT and predictive-maintenance platform",
        kicker: "DATA PRODUCT AT SCALE",
        challenge: "Industrial teams needed earlier failure signals across a large footprint of high-frequency equipment sensors.",
        ownership: "I built ETL, real-time analytics, machine-learning, and reporting workflows that converted sensor data into monitoring and predictive-maintenance outputs.",
        decision: "Connect ingestion, analytics, and early-failure detection in one operating workflow rather than treat the model as a standalone deliverable.",
        outcomeLabel: "RESULT",
        outcome: "Supported analytics across 10,000+ sensors and reduced equipment downtime by 25%.",
        technical: ["Python", "SQL", "Pandas", "scikit-learn", "BigQuery", "AWS S3", "Redshift"],
        visibility: "public",
      },
    ],
    supporting: [
      "Automated recurring retrieval and reporting, reducing generation time by 15%.",
      "Created SolidWorks digital-twin representations for physical-asset simulation.",
    ],
    visibility: "public",
  }),
];

// A highlight destination must match a visible nested project id.
const allCareerHighlights: CareerHighlight[] = [
  defineCareerHighlight({ metric: "6 functions", description: "aligned from customer requirements through deployment-ready capabilities", label: "ENTERPRISE AI PRODUCT DELIVERY · RISINGPHOENIX.AI", destination: "experience-risingphoenix-platform", visibility: "public" }),
  defineCareerHighlight({ metric: "80%", description: "faster documentation retrieval", label: "INTERNAL GENAI KNOWLEDGE TOOL · CUMMINS", destination: "experience-cummins-rag", visibility: "public" }),
  defineCareerHighlight({ metric: "12%", description: "improvement in SLA compliance", label: "DELIVERY OPERATIONS · ACCENTURE", destination: "experience-accenture-delivery", visibility: "public" }),
  defineCareerHighlight({ metric: "25%", description: "reduction in equipment downtime", label: "INDUSTRIAL DATA & ML · ACCENTURE", destination: "experience-accenture-iot", visibility: "public" }),
];

export const experience = allExperience
  .filter(isPublic)
  .map((entry) => ({ ...entry, projects: entry.projects.filter(isPublic) }));

const visibleExperienceProjectIds = new Set(
  experience.flatMap((entry) => entry.projects.map((project) => project.id)),
);

export const careerHighlights = allCareerHighlights
  .filter(isPublic)
  .filter((highlight) => visibleExperienceProjectIds.has(highlight.destination));
