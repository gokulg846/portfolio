import type { ProjectArtifact } from "../../types";

export const waferArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "A product brief for the synthetic yield-analysis prototype, covering the target user, investigation flow, requirements, metrics, and domain-validation plan.",
    sections: [
      {
        title: "Context and source",
        state: "Current build",
        body: ["I created this portfolio PRD after completing the prototype. It documents the current implementation and the proposed product path."],
        table: { headers: ["Field", "Value"], rows: [
          ["Version", "2.0"],
          ["Updated", "September 2, 2026"],
          ["Source commit", "39a640c6f401b784ff18829962fe9ea813802753"],
          ["Evidence boundary", "Repository behavior is inspectable; the customer problem, domain validity, value, and rollout remain hypotheses until validated"],
        ] },
      },
      {
        title: "Product brief",
        state: "Design target",
        body: ["Build one investigation workflow that connects a low-yield wafer to its spatial signature, process context, equipment and chamber history, alarms, and lot genealogy. This gives a yield engineer the context to choose the next engineering hypothesis with every join already assembled."],
        table: { headers: ["PRD field", "Decision"], rows: [
          ["Status", "Implemented synthetic-data prototype; domain workflow and value remain hypotheses"],
          ["Product owner", "Gokul Gopalakrishnan · independent end-to-end build"],
          ["Primary-user hypothesis", "Yield engineer triaging a low-yield wafer or excursion"],
          ["Target job", "Connect a spatial yield symptom to upstream process and equipment context before choosing the next investigation"],
          ["Hypothesized current workflow", "Query die test, process, equipment, alarm, and genealogy sources separately, then reconcile the evidence"],
          ["Value hypothesis", "Shorten the path from alert to a prioritized hypothesis while reducing avoidable investigative detours"],
          ["Decision boundary", "Prioritize investigation hypotheses; domain engineers retain root-cause and disposition decisions"],
        ] },
      },
      {
        title: "Problem and open assumptions",
        state: "Design target",
        body: ["Problem hypothesis: a yield alert identifies loss while the next investigation still requires upstream context. The synthetic simulator establishes a coherent workflow. Real-fab frequency, physical validity, and user value require domain review and external data."],
        table: { headers: ["Statement", "Evidence state", "Implication"], rows: [
          ["Four source families can be joined into a wafer investigation", "Implemented with linked synthetic data", "The prototype can exercise the full analytical path"],
          ["Yield engineers reconstruct this context manually", "Unvalidated workflow hypothesis", "Confirm with a domain practitioner and one representative case"],
          ["Seeded process and chamber conditions resemble useful fab signals", "Simulator assumption", "Require expert review and independent-data replay"],
          ["The workflow reduces time or false investigative leads", "Unvalidated value hypothesis", "Measure task time, top-k recovery, and false leads"],
        ] },
      },
      {
        title: "Outcome to validate",
        state: "Design target",
        table: { headers: ["Layer", "Desired change", "Why it matters"], rows: [
          ["User outcome", "Move from a low-yield wafer to a defensible next hypothesis faster", "Focuses engineering time on the most relevant evidence"],
          ["Decision quality", "Reduce false investigative leads while keeping alternative explanations visible", "Physical proof requires a controlled engineering test"],
          ["Product behavior", "Connect spatial, statistical, equipment, and genealogy context in one traceable flow", "Makes the reasoning path inspectable"],
          ["Business hypothesis", "Reduce excursion-triage delay and avoidable engineering effort", "Requires domain workflow data before any savings or yield claim"],
        ] },
      },
      {
        title: "End-to-end investigation journey",
        state: "Design target",
        table: { headers: ["Step", "User question", "Product response", "Status"], rows: [
          ["1 · Locate loss", "Which wafer or product is losing yield?", "Yield trend and worst-first selection", "Implemented"],
          ["2 · Inspect shape", "What spatial signature is present?", "Wafer map with die coordinates and bins", "Implemented"],
          ["3 · Check stability", "Was a process parameter outside statistical context?", "SPC view with configured limits and violations", "Implemented; limits are synthetic"],
          ["4 · Trace upstream", "Which equipment, chamber, alarms, and lot are connected?", "Joined wafer investigation summary", "Implemented"],
          ["5 · Prioritize", "Which loss family deserves attention first?", "Failure Pareto and connected context", "Implemented for hypothesis prioritization"],
          ["6 · Record decision", "What hypothesis and next test will be pursued?", "Hypothesis log with evidence and alternatives", "Proposed P1"],
        ] },
      },
      {
        title: "Release scope and non-goals",
        state: "Design target",
        table: { headers: ["Priority", "In scope", "Boundary"], rows: [
          ["P0", "Generate four linked synthetic fab sources", "Production MES, STDF, SECS/GEM, and historian connectors are future work"],
          ["P0", "Govern Bronze, Silver, and Gold data contracts", "Local Parquet, dbt, and DuckDB prototype"],
          ["P0", "Wafer map, yield trend, SPC, and failure Pareto", "Decision support with root-cause ownership retained by domain engineers"],
          ["P0", "Join process, equipment, alarms, and genealogy to wafer outcome", "Relationships are planted simulation logic"],
          ["P1", "Capture and rank investigation hypotheses", "Status: planned; requires blinded validation and domain review"],
          ["Out of scope", "Equipment control, automated disposition, physical causal proof, production yield or revenue claims", "Read-only analytical workflow"],
        ] },
      },
      {
        title: "Requirements and acceptance criteria",
        state: "Design target",
        table: { headers: ["Type", "Requirement", "Acceptance criterion", "Status"], rows: [
          ["User", "Move from trend to one wafer", "Reviewer can select a low-yield wafer and retain its context across views", "Implemented"],
          ["User", "Trace evidence upstream", "Wafer summary exposes linked process, tool, chamber, alarms, and lot", "Implemented"],
          ["Analytical", "Preserve spatial evidence", "Wafer map retains die coordinates and bin classification", "Implemented"],
          ["Data", "Protect source and mart grains", "Tests enforce keys, relationships, categories, ranges, and one-row-per-wafer output", "Implemented"],
          ["Guardrail", "Separate correlation from cause", "UI and copy label planted relationships and alternative explanations", "Required"],
          ["Nonfunctional", "Reproduce a scenario", "Same configuration and seed produce the same sources and governed outputs", "Implemented locally"],
        ] },
      },
      {
        title: "Success measures",
        state: "Proposed next step",
        table: { headers: ["Metric", "Baseline / target", "How to measure", "Decision supported"], rows: [
          ["Time to first defensible hypothesis", "Target set after baseline", "Timed current workflow versus prototype scenario", "Does the workflow reduce investigation setup?"],
          ["Reviewer-ranked top-k recovery", "Report by hidden planted scenario; target set after baseline", "Freeze rules, hide simulator truth from the reviewer, and record the reviewer's ranked hypotheses", "Does the workflow prioritize evidence connected to the planted scenario?"],
          ["Unsupported or low-value hypotheses", "Report per scenario after expert adjudication", "Domain reviewer assesses whether selected follow-ups are supported, useful, duplicative, or distracting", "Does the interface create avoidable work or overconfidence?"],
          ["Genealogy completeness", "Reconcile expected links", "Resolved and unresolved relationships across four sources", "Can the context be trusted?"],
          ["Task completion and domain agreement", "Establish with yield/process reviewers", "Blinded task plus expert assessment of the next action", "Is the workflow usable and credible?"],
          ["External-data replay", "Target set after data selection", "Freeze workflow, then replay on independent authorized data", "Does validity extend beyond the simulator?"],
        ] },
      },
      {
        title: "Failure states, risks, and fallback",
        state: "Design target",
        table: { headers: ["Risk or failure", "Required behavior", "Fallback / owner"], rows: [
          ["Simulator validates its own rules", "Use hidden scenarios, negative controls, and frozen analysis logic", "Validation status: synthetic scenarios"],
          ["Correlation presented as causality", "Show evidence and alternative hypotheses", "Domain engineer owns the next test and conclusion"],
          ["Invalid SPC assumptions", "Document subgroup, limit, and distribution assumptions", "Hide or label SPC until reviewed"],
          ["Broken genealogy or stale partition", "Expose unresolved links and freshness", "Return to source records and mark the investigation incomplete"],
          ["Production connector mismatch", "Define source contracts before ingestion", "Continue with local synthetic workflow"],
          ["False investigative confidence", "Require hypothesis rationale and limitations", "Use the existing engineering investigation process"],
        ] },
      },
      {
        title: "Rollout plan",
        state: "Proposed next step",
        table: { headers: ["Stage", "What happens", "Exit gate"], rows: [
          ["1 · Synthetic evidence release", "Publish hidden-scenario results, failures, data grains, and limitations", "Scenario-level results reproduce"],
          ["2 · Domain review", "Yield/process engineer reviews assumptions and completes the investigation task", "Disagreements and workflow changes are recorded"],
          ["3 · Independent-data replay", "Run the frozen workflow on authorized external data", "Missing context, false leads, and domain gaps are understood"],
          ["4 · Read-only shadow", "Ingest production-like feeds in advisory mode", "Freshness, genealogy, performance, access, and operating ownership are acceptable"],
        ] },
        body: ["The existing engineering investigation remains the fallback. The product may organize evidence and hypotheses; a domain owner decides what test or disposition follows."],
      },
      {
        title: "Open questions before domain pilot",
        state: "Proposed next step",
        bullets: [
          "Which yield-engineering task and decision should define the first validated workflow?",
          "Which process and equipment signals are necessary versus merely interesting?",
          "What SPC rules and subgroup assumptions are accepted in the target environment?",
          "What constitutes a defensible hypothesis and how should alternative explanations be recorded?",
          "Which independent dataset or authorized source can test the frozen workflow?",
          "Who owns source contracts, domain review, access, rollout, and rollback?",
        ],
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
        body: ["The simulators propagate planted process and chamber conditions into downstream spatial failure patterns. This creates a coherent, reproducible investigation path across the generated tables."],
        bullets: [
          "Benefit: the product workflow can be exercised end to end with known ground truth.",
          "Tradeoff: the simulator validates assumptions it encodes. Physical validity requires external data and domain review.",
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
          ["Wafer map", "Locate spatial loss pattern", "Pattern suggests a mechanism for the next engineering test"],
          ["Yield trend", "Locate unstable products or periods", "A dip requires upstream context"],
          ["SPC", "Identify special-cause process behavior", "Control assumptions require domain review"],
          ["Pareto", "Prioritize dominant failure bins", "Causal attribution remains with the engineering investigation"],
        ] },
      },
      {
        title: "Path to production",
        state: "Proposed next step",
        bullets: [
          "Define read-only source contracts for STDF-like test, process, equipment, and MES data.",
          "Add source freshness, late-arrival, reconciliation, and access monitoring.",
          "Validate SPC subgrouping and interpretation with yield/process engineering.",
          "Retain investigation hypotheses and reviewer outcomes in an advisory workflow.",
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
          ["Decision", "Support the next investigation", "Keep human judgment and alternate hypotheses visible"],
        ] },
      },
      {
        title: "Shadow-pilot readiness",
        state: "Proposed next step",
        bullets: [
          "Read-only ingestion with equipment-control and disposition authority retained by production systems.",
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
        title: "Validation still required",
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
          ["Chamber degradation", "Does equipment context stay specific to the affected wafers?"],
          ["Spatial defect pattern", "Does the workflow connect the map to relevant process context?"],
          ["Healthy baseline", "Does the workflow preserve a stable process state?"],
          ["Broken genealogy", "Does missing context remain visible and guide the reviewer back to source records?"],
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
        body: ["Freeze the workflow before replaying it on a de-identified public or appropriately authorized wafer dataset. Compare surfaced hypotheses with known labels or expert conclusions and publish false leads and missing context. The current evidence supports a reproducible synthetic investigation workflow. Fab validation remains a future step."],
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "ALTERNATE DEMO RUNBOOK",
    title: "Recording Guide",
    // Private working material. Change to "public" only after a validated video URL exists.
    visibility: "private",
    summary: "A fallback recording plan that starts with a low-yield wafer, traces upstream context, and ends with an evidence-backed investigation hypothesis.",
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
          ["0–10s", "Product title", "A yield drop shows lost output. The engineer still needs process, chamber, lot, and spatial context to choose the next investigation."],
          ["10–25s", "Four linked sources and architecture", "This local prototype links synthetic die test, process, equipment, and genealogy evidence."],
          ["25–42s", "Choose a low-yield wafer and wafer map", "Start with the spatial symptom and keep multiple causes open."],
          ["42–65s", "Move to SPC and equipment context", "Trace the wafer upstream to process behavior, chamber history, alarms, and lot context."],
          ["65–78s", "Pareto view", "Use the dominant failure family to prioritize the next hypothesis while keeping causal conclusions open."],
          ["78–90s", "Quality gate and limitation", "dbt protects data contracts. All fab data is synthetic, so physical validity and production impact require external validation."],
        ] },
      },
    ],
  },
];
