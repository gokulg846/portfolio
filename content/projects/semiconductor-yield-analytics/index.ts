import type { ProjectArtifact } from "../../types";

export const waferArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "Defines the yield-engineer investigation journey, value hypothesis, prioritized analytical requirements, guardrails, and measures needed beyond a synthetic fab.",
    sections: [
      {
        title: "Decision snapshot",
        state: "Current build",
        table: { headers: ["Decision", "Definition"], rows: [
          ["Primary user", "Yield engineer triaging a low-yield wafer or excursion"],
          ["Job to be done", "Connect a spatial yield symptom to process and equipment context before choosing the next investigation"],
          ["Value hypothesis", "Shorten the path from alert to a prioritized hypothesis while reducing avoidable investigative detours"],
          ["Current stage", "Working local prototype using linked synthetic fab data"],
        ] },
      },
      {
        title: "Problem and workflow",
        state: "Design target",
        body: ["A yield drop shows that output was lost; it does not explain where the loss originated. Investigation requires spatial die results, process measurements, equipment and chamber history, alarms, and lot genealogy that may be distributed across separate systems."],
        table: { headers: ["Step", "User question", "Implemented view"], rows: [
          ["1", "Which wafer or product is losing yield?", "Yield trend and worst-first selection"],
          ["2", "What spatial signature is present?", "Wafer map"],
          ["3", "Was a process parameter out of control?", "SPC view"],
          ["4", "Which equipment, chamber, alarms, and lot are connected?", "Investigation-ready wafer summary"],
          ["5", "Which failure family should be investigated first?", "Failure Pareto"],
        ] },
      },
      {
        title: "Goals and non-goals",
        state: "Current build",
        table: { headers: ["Goals", "Non-goals"], rows: [
          ["Preserve genealogy across four linked sources", "Identify a real faulty tool or chamber"],
          ["Bring spatial, statistical, and prioritization context together", "Control equipment or automate disposition"],
          ["Prevent broken contracts from publishing the mart", "Claim physical validity from planted simulation logic"],
          ["Make the next hypothesis traceable to evidence", "Claim yield, revenue, or triage-time improvement"],
        ] },
      },
      {
        title: "Prioritized requirements",
        state: "Current build",
        table: { headers: ["Priority", "Requirement", "Acceptance condition"], rows: [
          ["P0", "Locate low-yield wafers and trends", "Reviewer can compare products and choose a wafer"],
          ["P0", "Inspect spatial bin patterns", "Wafer map preserves die coordinates and bin classifications"],
          ["P0", "Review process behavior in statistical context", "SPC view exposes control limits and violations"],
          ["P0", "Connect upstream context", "Wafer summary joins process, equipment, alarms, and genealogy"],
          ["P0", "Prioritize loss mechanisms", "Pareto ranks failure bins without calling them proven causes"],
          ["P1", "Rank hypotheses across signals", "Proposed; requires hidden-scenario evaluation and domain review"],
        ] },
      },
      {
        title: "Success metric tree",
        state: "Proposed next step",
        table: { headers: ["Layer", "Measure", "Evidence required"], rows: [
          ["User", "Time from low-yield wafer to first defensible hypothesis", "Observed investigation task"],
          ["Workflow", "Completion rate for a defined excursion-triage scenario", "Blinded reviewer study"],
          ["Analytical", "Top-k recovery of a hidden planted cause", "Frozen logic and hidden scenario suite"],
          ["Analytical", "False investigative leads per scenario", "Scenario-level result report"],
          ["Data", "Genealogy completeness and unresolved links", "Reconciled source populations"],
          ["Guardrail", "No causal or production claim from synthetic evidence", "Content and domain-review gate"],
        ] },
      },
    ],
  },
  {
    slug: "technical-design",
    label: "TECHNICAL JUDGMENT",
    title: "Analytics & Data Design",
    summary: "Documents source grains, linked simulation logic, medallion contracts, investigation marts, view responsibilities, and the boundary between correlation and causality.",
    sections: [
      {
        title: "Architecture",
        state: "Current build",
        code: "lot genealogy ──────┐\nequipment / alarms ─┤\nprocess parameters ─┼─> hive-partitioned Bronze Parquet\ndie-level test ─────┘               ↓\n                              dbt + DuckDB Silver\n                               keys · grain · validity\n                                      ↓\n                              Gold wafer summary\n                                      ↓\n                       wafer map · trend · SPC · Pareto",
      },
      {
        title: "Source and mart grains",
        state: "Current build",
        table: { headers: ["Dataset", "Implemented grain", "Investigation role"], rows: [
          ["Lot genealogy", "One row per lot", "Product, recipe, and lot context"],
          ["Equipment logs", "Equipment/chamber events and alarms", "Tool history and SPC time axis"],
          ["Process parameters", "One row per wafer and process step", "Upstream measurements and excursions"],
          ["Wafer test", "One row per die", "Yield, bin mix, and spatial signature"],
          ["Gold wafer summary", "One row per wafer", "Joined yield, process, equipment, alarm, and genealogy context"],
        ] },
      },
      {
        title: "Linked simulator decision",
        state: "Current build",
        body: ["The simulators propagate planted process and chamber conditions into downstream spatial failure patterns. This creates a coherent, reproducible investigation path instead of unrelated random tables."],
        bullets: [
          "Benefit: the product workflow can be exercised end to end with known ground truth.",
          "Tradeoff: the simulator validates assumptions it encodes and cannot establish physical validity.",
          "Control: planted conditions must be hidden from the reviewer in any analytical evaluation.",
        ],
      },
      {
        title: "Storage and quality decisions",
        state: "Current build",
        bullets: [
          "Hive partitions by lot and wafer match the arrival and investigation grain and support idempotent replacement.",
          "dbt makes source relationships, die uniqueness, yield bounds, categories, and physical ranges executable contracts.",
          "DuckDB keeps the full prototype local while preserving warehouse-style SQL and governed marts.",
          "A failed model or test prevents the orchestration flow from completing successfully.",
        ],
      },
      {
        title: "View responsibilities",
        state: "Current build",
        table: { headers: ["View", "Decision support", "Guardrail"], rows: [
          ["Wafer map", "Locate spatial loss pattern", "Pattern suggests a mechanism; it does not prove one"],
          ["Yield trend", "Locate unstable products or periods", "A dip requires upstream context"],
          ["SPC", "Identify special-cause process behavior", "Control assumptions require domain review"],
          ["Pareto", "Prioritize dominant failure bins", "Ranking loss is not causal attribution"],
        ] },
      },
      {
        title: "Production evolution",
        state: "Proposed next step",
        bullets: [
          "Define read-only source contracts for STDF-like test, process, equipment, and MES data.",
          "Add source freshness, late-arrival, reconciliation, and access monitoring.",
          "Validate SPC subgrouping and interpretation with yield/process engineering.",
          "Retain investigation hypotheses and reviewer outcomes without controlling equipment.",
        ],
      },
    ],
  },
  {
    slug: "program-plan",
    label: "DELIVERY LEADERSHIP",
    title: "Program & Rollout Plan",
    summary: "Defines source and domain dependencies, phased domain review, external-data replay, shadow use, risks, ownership, and rollout gates.",
    sections: [
      {
        title: "Phased delivery",
        state: "Proposed next step",
        table: { headers: ["Phase", "Scope", "Exit gate"], rows: [
          ["0 · Prototype", "Current synthetic local build", "Four views and governed marts inspectable"],
          ["1 · Evidence release", "Architecture, grains, hidden scenarios, recording", "Scenario-level results and limitations published"],
          ["2 · Domain review", "Yield/process engineer task review", "Assumptions, disagreements, and actionability recorded"],
          ["3 · External-data replay", "De-identified public or authorized wafer data", "Frozen workflow compared with known labels or expert conclusions"],
          ["4 · Shadow pilot", "Read-only production-like feeds", "Ownership, freshness, access, rollback, and usage telemetry approved"],
        ] },
      },
      {
        title: "Dependencies and ownership",
        state: "Design target",
        table: { headers: ["Dependency", "Accountable owner"], rows: [
          ["Die-test contract and bin definitions", "Test/yield data owner"],
          ["Process measurements and SPC assumptions", "Process engineering owner"],
          ["Equipment, chamber, and alarm history", "Equipment engineering owner"],
          ["Lot genealogy and product context", "MES/manufacturing data owner"],
          ["Investigation workflow and rollout decision", "Yield product owner"],
          ["Milestones, risks, and readiness", "TPM"],
        ] },
      },
      {
        title: "RAID log",
        state: "Design target",
        table: { headers: ["Type", "Item", "Response"], rows: [
          ["Risk", "Simulator validates its own assumptions", "Freeze logic; use hidden scenarios and external replay"],
          ["Risk", "Planted correlation is presented as physical causality", "Use hypothesis language and domain review"],
          ["Risk", "SPC rules are invalid for the process", "Require subgroup and control-limit review before pilot"],
          ["Assumption", "Genealogy keys are complete across sources", "Publish completeness and unresolved-link results"],
          ["Dependency", "Authorized wafer data is available", "Keep external-validation claims absent until access is approved"],
          ["Decision", "Support the next investigation, not automatic root cause", "Keep human judgment and alternate hypotheses visible"],
        ] },
      },
      {
        title: "Shadow-pilot readiness",
        state: "Proposed next step",
        bullets: [
          "Read-only ingestion and no equipment-control or disposition action.",
          "Source freshness, genealogy completeness, query performance, and access monitoring available.",
          "Yield engineer can identify evidence and uncertainty behind a hypothesis.",
          "System failure returns the workflow to approved source tools and analysis methods.",
          "Usage and reviewer outcomes inform whether the product should expand.",
        ],
      },
    ],
  },
  {
    slug: "validation",
    label: "VALIDATION",
    title: "Seeded Validation Plan",
    summary: "Separates data-contract verification from analytical validity and defines hidden scenarios, negative cases, domain review, and external replay.",
    sections: [
      {
        title: "What current tests establish",
        state: "Current build",
        bullets: [
          "Tested wafers retain process, equipment, and lot-genealogy relationships.",
          "Die coordinates remain unique at wafer grain.",
          "Yield remains bounded between zero and one.",
          "Keys, categories, physical quantities, and grains satisfy configured contracts.",
          "The flow fails when a dbt model or quality gate fails.",
        ],
      },
      {
        title: "What tests do not establish",
        state: "Current build",
        bullets: [
          "Domain-valid SPC limits or physical mechanism interpretation.",
          "Causal discovery on an independent dataset.",
          "User task completion or reduced investigation time.",
          "Production integration, throughput, yield, or revenue impact.",
        ],
      },
      {
        title: "Hidden scenario suite",
        state: "Proposed next step",
        table: { headers: ["Scenario family", "Evaluation"], rows: [
          ["Process excursion", "Does the true planted condition appear in the top-k evidence-backed hypotheses?"],
          ["Chamber degradation", "Does equipment context surface without overgeneralizing to unrelated wafers?"],
          ["Spatial defect pattern", "Does the workflow connect the map to relevant process context?"],
          ["No excursion", "Does the workflow avoid inventing a special cause?"],
          ["Broken genealogy", "Does missing context remain visible rather than producing false confidence?"],
          ["Multiple plausible causes", "Does the workflow preserve alternatives and uncertainty?"],
        ] },
      },
      {
        title: "Required measures",
        state: "Proposed next step",
        table: { headers: ["Measure", "Decision use"], rows: [
          ["Top-k planted-cause recovery", "Does the evidence path surface the known scenario?"],
          ["False investigative leads", "How much unnecessary follow-up does the workflow create?"],
          ["Genealogy completeness", "Can the reviewer trust that the required context is present?"],
          ["Time to first hypothesis", "Does the interface reduce triage friction?"],
          ["Reviewer actionability and confidence", "Would the evidence change the next engineering action?"],
        ] },
      },
      {
        title: "External validity gate",
        state: "Proposed next step",
        body: ["Freeze the workflow before replaying it on a de-identified public or appropriately authorized wafer dataset. Compare surfaced hypotheses with known labels or expert conclusions and publish false leads and missing context. Until that work exists, the portfolio claims a reproducible synthetic investigation workflow—not fab-valid diagnosis."],
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "ALTERNATE DEMO RUNBOOK",
    title: "Recording Guide",
    summary: "A fallback recording plan that starts with a low-yield wafer, traces upstream context, and ends with an evidence-backed hypothesis rather than a causal claim.",
    sections: [
      {
        title: "Setup",
        state: "Current build",
        body: ["Run from the Semiconductor-wafer-yield-analysis-pipeline repository. The one-command flow creates synthetic sources, ingests Bronze data, and runs the dbt build before the dashboard starts."],
        code: "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython -m orchestration.flow\nstreamlit run app.py",
      },
      {
        title: "60–90 second narrative",
        state: "Current build",
        table: { headers: ["Time", "Show", "Say"], rows: [
          ["0–10s", "Product title", "A yield drop shows that output was lost, but not where an engineer should investigate next."],
          ["10–25s", "Four linked sources and architecture", "This local prototype links synthetic die test, process, equipment, and genealogy evidence."],
          ["25–42s", "Choose a low-yield wafer and wafer map", "Start with the spatial symptom rather than a predetermined cause."],
          ["42–65s", "Move to SPC and equipment context", "Trace the wafer upstream to process behavior, chamber history, alarms, and lot context."],
          ["65–78s", "Pareto view", "Use the dominant failure family to prioritize the next hypothesis—not declare proven root cause."],
          ["78–90s", "Quality gate and limitation", "dbt protects data contracts. All fab data is synthetic, so physical validity and production impact are not claimed."],
        ] },
      },
    ],
  },
];
