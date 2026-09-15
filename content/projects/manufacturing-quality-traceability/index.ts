import type { ProjectArtifact } from "../../types";

export const manufacturingArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "A product brief for the traceability prototype, covering the quality engineer task, investigation flow, requirements, metrics, risks, and pilot plan.",
    sections: [
      {
        title: "Context and source",
        state: "Current build",
        body: ["I created this portfolio PRD after completing the prototype. It documents the current implementation and the proposed product path."],
        table: { headers: ["Field", "Value"], rows: [
          ["Version", "2.0"],
          ["Updated", "September 2, 2026"],
          ["Source commit", "0dbef87c89acd14d6885d7251acd9ded675fcec5"],
          ["Evidence boundary", "Repository behavior is inspectable; the customer problem, value, and rollout remain hypotheses until validated"],
        ] },
      },
      {
        title: "Product brief",
        state: "Design target",
        body: ["Build an investigation aid for a manufacturing quality engineer who needs to assemble the records connected to a suspect part. The prototype joins four synthetic source families into one part-level view. Quality engineers retain containment and root-cause decisions."],
        table: { headers: ["PRD field", "Decision"], rows: [
          ["Status", "Implemented prototype; customer problem and value remain hypotheses"],
          ["Product owner", "Gokul Gopalakrishnan · independent end-to-end build"],
          ["Primary-user hypothesis", "Manufacturing quality engineer conducting containment"],
          ["Target job", "Inspect dimensional, process, torque, and supplier records in one connected view"],
          ["Hypothesized current workflow", "Export or query each source, reconcile identifiers, and rebuild the evidence trail manually"],
          ["Release decision", "Prove that one governed part history can support a complete, inspectable investigation"],
        ] },
      },
      {
        title: "Problem and open assumptions",
        state: "Design target",
        body: ["Problem hypothesis: containment work becomes slower and less reliable when inspection, process, torque, and supplier records require manual reconciliation. Plant interviews and a historical containment replay would test the assumed workflow, time savings, and decision value."],
        table: { headers: ["Statement", "Evidence state", "Implication"], rows: [
          ["Four source families exist at different grains", "Implemented in the synthetic source contracts", "The product must preserve grain and lineage before joining"],
          ["Quality engineers perform this reconciliation manually", "Unvalidated problem hypothesis", "Confirm through workflow interviews or one retrospective case"],
          ["Stable part_id and batch_id values can connect the records", "Technical assumption", "Measure unresolved genealogy and surface every unmatched record"],
          ["A unified view improves containment decisions", "Unvalidated value hypothesis", "Test task time, completeness, false inclusion, and false exclusion"],
        ] },
      },
      {
        title: "Outcome to validate",
        state: "Design target",
        table: { headers: ["Layer", "Desired change", "Why it matters"], rows: [
          ["User outcome", "Reach a complete evidence set for a suspect part faster", "Reduces time spent assembling context before engineering judgment begins"],
          ["Decision quality", "Make missing traceability and population uncertainty explicit", "Protects against missed affected parts and unnecessarily broad containment"],
          ["Product behavior", "Preserve source evidence, then publish one tested part-level history", "Keeps joins and rule boundaries inspectable"],
          ["Business hypothesis", "Reduce containment effort and avoidable investigation delay", "Requires plant workflow and case data before any savings claim"],
        ] },
      },
      {
        title: "End-to-end user journey",
        state: "Design target",
        table: { headers: ["Step", "User intent", "Product response", "Status"], rows: [
          ["1 · Set context", "Narrow the production window", "Filter by date, machine, and quality condition", "Implemented"],
          ["2 · Select a part", "Open one suspect record", "Load the governed part summary", "Implemented"],
          ["3 · Inspect evidence", "Compare dimensional, torque, process, and material context", "Show linked source evidence in one workflow", "Implemented"],
          ["4 · Assess gaps", "Understand whether records are incomplete", "Expose every missing source relationship as an investigation item", "Implemented"],
          ["5 · Determine scope", "Review candidate affected parts", "Generate a candidate population with reason codes", "Proposed P1"],
          ["6 · Hand off", "Retain the investigation evidence", "Export a governed evidence package", "Proposed P1"],
        ] },
      },
      {
        title: "Release scope and non-goals",
        state: "Design target",
        table: { headers: ["Priority", "In scope", "Boundary"], rows: [
          ["P0", "Preserve and validate all four source contracts", "Current inputs are synthetic; production connectors are future work"],
          ["P0", "Publish one inspectable history per part", "Quality engineers retain disposition decisions"],
          ["P0", "Filter context and inspect a suspect part", "Collaborative case management is future work"],
          ["P0", "Expose missing traceability", "Missing source records remain visible"],
          ["P1", "Generate an affected-population candidate list", "Status: planned; requires validated selection rules"],
          ["P1", "Export containment evidence", "Status: planned; requires policy, access, and retention decisions"],
          ["Out of scope", "MES/QMS replacement, physical root-cause automation, production control", "Validation status: synthetic prototype"],
        ] },
      },
      {
        title: "Requirements and acceptance criteria",
        state: "Design target",
        table: { headers: ["Type", "Requirement", "Acceptance criterion", "Status"], rows: [
          ["User", "Inspect one suspect part", "Reviewer can see available records from all four sources in one view", "Implemented"],
          ["User", "Recognize incomplete evidence", "Every missing required relationship has an explicit state", "Implemented"],
          ["Data", "Protect source grain and keys", "Tests reject duplicate grains, invalid identifiers, broken relationships, and invalid ranges", "Implemented"],
          ["System", "Produce reproducible output", "The same synthetic seed and source set produce the same governed marts", "Implemented"],
          ["Nonfunctional", "Preserve auditability", "Raw source evidence remains available and rule logic is version-controlled", "Implemented locally"],
          ["Guardrail", "Keep containment human-owned", "The interface labels candidate lists for review and approval", "Required for P1"],
        ] },
      },
      {
        title: "Success measures",
        state: "Proposed next step",
        table: { headers: ["Metric", "Baseline / target", "How to measure", "Decision supported"], rows: [
          ["Time to assemble records", "Target set after baseline", "Timed current workflow versus prototype on the same case", "Is the workflow materially faster?"],
          ["Traceability completeness", "Baseline from reconciled source population", "Eligible linked records divided by expected records", "Can the evidence set be trusted?"],
          ["Unresolved identifier rate", "Must be visible; acceptable level set by quality owner", "Exception report by source and reason", "Can the case proceed or must data be corrected?"],
          ["Candidate precision / recall", "Target set after historical cost review", "Compare hidden ground truth with proposed affected population", "Is P1 safe enough for shadow use?"],
          ["Task completion", "Establish with target users", "Observed scenario: locate, inspect, explain gaps, choose next step", "Is the workflow understandable?"],
        ] },
      },
      {
        title: "Failure states, risks, and fallback",
        state: "Design target",
        table: { headers: ["Risk or failure", "Required behavior", "Fallback / owner"], rows: [
          ["Identifier mismatch", "Keep the record in an unresolved exception state", "Quality/data owner reconciles before use"],
          ["Stale certificate or delayed source", "Show source freshness and prevent a false complete state", "Return to source system or manual evidence check"],
          ["Source outage", "Show the unavailable source and mark the investigation incomplete", "Use the existing manual workflow"],
          ["False exclusion from candidate population", "Require reason codes and human review", "Quality owner defines final containment scope"],
          ["Unauthorized production data", "Enforce source access and retention policy", "Governance approval is an ingestion entry criterion"],
        ] },
      },
      {
        title: "Rollout plan",
        state: "Proposed next step",
        table: { headers: ["Stage", "What happens", "Exit gate"], rows: [
          ["1 · Retrospective replay", "Run one known containment case with hidden ground truth", "Completeness and false inclusions/exclusions reconciled"],
          ["2 · Task review", "Observe quality engineers complete the defined investigation", "Workflow is understandable and decision evidence is sufficient"],
          ["3 · Shadow workflow", "Run read-only beside the existing process", "Critical traceability gaps are resolved and failure behavior is accepted"],
          ["4 · Limited pilot", "Use on a bounded scope with quality-owner approval", "Operating ownership, access, rollback, and telemetry are in place"],
        ] },
        body: ["The manual investigation process remains the rollback path. A quality owner retains authority over containment and disposition."],
      },
      {
        title: "Open questions before pilot",
        state: "Proposed next step",
        bullets: [
          "Which source system owns the canonical part and material-batch identifiers?",
          "What evidence is required before a containment population is considered complete?",
          "What is the cost tradeoff between false inclusion and false exclusion for the target workflow?",
          "Which source freshness limits and access controls apply to a real plant case?",
          "Who approves rules, exceptions, rollout, and rollback in an operating environment?",
        ],
      },
    ],
  },
  {
    slug: "technical-design",
    label: "TECHNICAL JUDGMENT",
    title: "Technical Design & Data Contract",
    summary: "Explains the source grains, traceability contracts, medallion layers, failure behavior, and why the local stack fits the prototype boundary.",
    sections: [
      {
        title: "Source-to-decision architecture",
        state: "Current build",
        code: "CMM inspection ─┐\nCNC parameters ─┼─> Bronze Parquet ─> dbt Silver contracts ─> Gold part summary ─> Streamlit investigation\nTorque audits  ─┤\nMaterial certs ─┘\n                    part_id joins process / CMM / torque\n                    batch_id joins part / supplier certificate",
      },
      {
        title: "Source contracts",
        state: "Current build",
        table: { headers: ["Source", "Implemented grain", "Traceability role"], rows: [
          ["CMM inspection", "One row per part and critical dimension", "Dimensional result and tolerance evidence"],
          ["CNC process parameters", "One row per part", "Machine, line, shift, batch, and process context"],
          ["Torque audit", "One row per part and joint", "Torque and angle result by joint"],
          ["Supplier material certificate", "One row per material batch", "Supplier, hardness, tensile, and certificate context"],
        ] },
      },
      {
        title: "Layer responsibilities",
        state: "Current build",
        table: { headers: ["Layer", "Responsibility", "Failure behavior"], rows: [
          ["Bronze", "Preserve daily source records as Parquet", "Retain raw evidence for replay and audit"],
          ["Silver", "Type, clean, validate, and join source contracts", "Reject invalid keys, categories, relationships, and physical ranges"],
          ["Gold", "Publish one investigation record per part", "Flag missing traceability and expose contributing quality conditions"],
          ["Interface", "Filter trends and drill into a part", "Show available records and label every missing source"],
        ] },
      },
      {
        title: "Technology decisions",
        state: "Current build",
        bullets: [
          "Parquet keeps the Bronze layer inspectable and partitionable in the local prototype.",
          "DuckDB runs analytical joins locally while preserving SQL semantics appropriate for a warehouse prototype.",
          "dbt makes metric logic, lineage, and data tests version-controlled.",
          "Prefect provides an orchestration path while the direct Python ingestion command remains reproducible.",
          "Streamlit provides a fast investigation surface for the prototype. A production UX would follow user testing.",
        ],
      },
      {
        title: "Alternatives and tradeoffs",
        state: "Design target",
        table: { headers: ["Alternative", "Reason for the current choice"], rows: [
          ["Dashboard directly over generated CSV files", "Faster initially, but hides source contracts, lineage, and grain protection"],
          ["Hosted warehouse and orchestration", "More production-like, but introduces accounts and cost before the workflow is validated"],
          ["Opaque predictive quality score", "Calibrated predictive validity requires plant data"],
        ] },
      },
      {
        title: "Path to production",
        state: "Proposed next step",
        bullets: [
          "Define owners, SLAs, and access boundaries for every source contract.",
          "Add freshness, reconciliation, and late-arrival monitoring.",
          "Move to authenticated, role-aware investigation views.",
          "Retain decision and export history for containment auditability.",
          "Separate candidate-generation logic from final quality disposition authority.",
        ],
      },
    ],
  },
  {
    slug: "program-plan",
    label: "DELIVERY LEADERSHIP",
    title: "Delivery Plan",
    summary: "Turns the prototype into an explicit program: milestones, ownership, dependencies, risks, decisions, readiness gates, and fallback behavior.",
    sections: [
      {
        title: "Milestones and gates",
        state: "Design target",
        table: { headers: ["Milestone", "Exit gate"], rows: [
          ["1 · Problem and metric definition", "Primary user, investigation decision, source population, metric definitions, and non-goals approved"],
          ["2 · Contract baseline", "Source grains, identifiers, owners, freshness expectations, and exception behavior documented"],
          ["3 · Transformation MVP", "Traceability mart and source drill-down complete with automated contract gates"],
          ["4 · Scenario validation", "Known scenarios reconcile to expected part histories and missing-data behavior"],
          ["5 · Shadow pilot", "Historical case completed beside the existing containment process"],
          ["6 · Pilot decision", "User task, completeness, false-inclusion, and false-exclusion results reviewed"],
        ] },
      },
      {
        title: "RACI",
        state: "Design target",
        body: ["Gokul currently performs the product, program, and implementation roles for the portfolio build. This RACI defines the minimum operating model for a future pilot."],
        table: { headers: ["Workstream", "Responsible", "Accountable", "Consulted", "Informed"], rows: [
          ["Problem and metric definition", "Product owner", "Quality owner", "Process and supplier quality", "Data team"],
          ["Source contracts", "Data engineer", "Source-system owner", "Quality engineer", "Product owner"],
          ["Models and quality gates", "Analytics engineer", "Technical lead", "Data owners", "Quality owner"],
          ["Scenario validation", "Quality engineer", "Quality owner", "Analytics engineer", "Operations lead"],
          ["Pilot readiness", "TPM", "Product owner", "Quality, data, security", "Plant stakeholders"],
        ] },
      },
      {
        title: "Dependency map",
        state: "Design target",
        bullets: [
          "Stable part and batch identifiers across CMM, process, torque, and supplier records.",
          "Named source owners and an agreed reconciliation population.",
          "Quality-approved metric definitions and missing-data severity.",
          "Authorized historical case and reviewer access for shadow validation.",
          "Export, retention, access-control, and audit requirements before workflow integration.",
        ],
      },
      {
        title: "RAID log",
        state: "Design target",
        table: { headers: ["Type", "Item", "Response"], rows: [
          ["Risk", "Synthetic patterns cover a narrow range of plant variability", "Keep business value hypothetical; shadow-test on authorized historical data"],
          ["Risk", "Correct SQL encodes the wrong metric", "Require metric dictionary and quality-owner review"],
          ["Risk", "False exclusions narrow containment incorrectly", "Fail closed on missing traceability and require human approval"],
          ["Assumption", "Stable cross-system identifiers exist", "Measure unresolved joins before a pilot"],
          ["Dependency", "Source owners can provide freshness and lineage", "Name ownership and escalation before onboarding"],
          ["Decision", "Prioritize traceability and trust before prediction", "Keep predictive scoring outside the MVP"],
        ] },
      },
      {
        title: "Launch checklist and fallback",
        state: "Proposed next step",
        bullets: [
          "Historical-case reconciliation complete and signed off by the quality owner.",
          "Source completeness and unresolved joins visible in the interface.",
          "Quality owners approve every containment or disposition change.",
          "Support owner, incident path, audit retention, and access controls named.",
          "Fallback remains the existing approved investigation and containment process.",
        ],
      },
    ],
  },
  {
    slug: "validation",
    label: "VALIDATION",
    title: "Validation & Pilot Plan",
    summary: "Defines technical scenarios, a target-user task, a historical shadow evaluation, and the scorecard required before expanding the product.",
    sections: [
      {
        title: "Implemented contract checks",
        state: "Current build",
        bullets: [
          "Required keys, dates, source measurements, and Gold outputs are present.",
          "CMM and torque part records relate to the CNC part population.",
          "CNC material batches relate to supplier certificates.",
          "Categories and physical ranges remain within documented boundaries.",
          "Gold preserves one record per part and a bounded composite score.",
        ],
      },
      {
        title: "Seeded product scenarios",
        state: "Proposed next step",
        table: { headers: ["Scenario", "Expected reviewer-visible behavior"], rows: [
          ["Complete part history", "All four source families are available and attributable"],
          ["Missing supplier certificate", "Missing genealogy appears as an explicit investigation item"],
          ["Dimensional failure", "Failed dimension and supporting measurement are inspectable"],
          ["Torque failure", "Failed joint and audit evidence are inspectable"],
          ["Duplicate or broken identifier", "Build or exception output prevents an ambiguous part history"],
          ["Healthy case", "System preserves the healthy state and source records"],
        ] },
      },
      {
        title: "Target-user task",
        state: "Proposed next step",
        body: ["Give a quality engineer one blinded suspect-part scenario and ask them to identify the available evidence, missing evidence, and the population they would investigate next."],
        bullets: [
          "Measure completion time, errors, confidence, and requests for missing context.",
          "Ask the reviewer to explain the metric denominator and whether missing data could change the conclusion.",
          "Record which views changed the next action and why.",
        ],
      },
      {
        title: "Historical shadow pilot",
        state: "Proposed next step",
        bullets: [
          "Select one authorized historical containment case.",
          "Freeze metric and candidate-generation logic before revealing the known result.",
          "Reconcile source completeness and the affected population.",
          "Review false inclusions, false exclusions, and unresolved records with a quality owner.",
          "Keep the approved production workflow in place during shadow evaluation.",
        ],
      },
      {
        title: "Pilot scorecard",
        state: "Proposed next step",
        table: { headers: ["Measure", "Decision use"], rows: [
          ["Task completion and time", "Does the workflow reduce investigation friction?"],
          ["Traceability completeness", "Is the evidence population sufficient for a decision?"],
          ["False inclusions and exclusions", "Is the candidate population safe enough for continued shadow use?"],
          ["Unresolved joins", "Which source contracts block expansion?"],
          ["Reviewer actionability", "Did the evidence change or clarify the next investigation step?"],
        ] },
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "DEMO RUNBOOK",
    title: "Recording Guide",
    // Private working material. Change to "public" only after a validated video URL exists.
    visibility: "private",
    summary: "A verified setup path and a concise recording narrative focused on the quality engineer workflow and its decisions.",
    sections: [
      {
        title: "Setup",
        state: "Current build",
        body: ["Run these commands from the root of the Manufacturing-quality-traceabilty repository. The demo uses synthetic data."],
        code: "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython -m pipelines.ingest --date 2026-06-11 --parts 500\ndbt run --profiles-dir .\ndbt test --profiles-dir .\nstreamlit run app.py",
      },
      {
        title: "60–90 second narrative",
        state: "Current build",
        table: { headers: ["Time", "Show", "Say"], rows: [
          ["0–10s", "Dashboard and product title", "A quality engineer investigating a suspect part often has to assemble evidence from separate inspection, machine, torque, and supplier systems."],
          ["10–25s", "Date, machine, and root-cause filters", "This prototype brings the four linked synthetic sources into one investigation workflow."],
          ["25–50s", "Select a part and inspect its summary", "The part-level record exposes the quality conditions and the process and material context behind them."],
          ["50–70s", "Open CMM, torque, process, and supplier details", "The reviewer can inspect each source record and understand how it joins to the part."],
          ["70–85s", "Show one missing or failing state", "Missing traceability remains visible. Quality engineers retain containment decisions."],
        ] },
      },
      {
        title: "Safe claims and boundaries",
        state: "Current build",
        table: { headers: ["Supported description", "Excluded claim"], rows: [
          ["The build connects four synthetic source families at part and batch grain", "It reduced production containment time or warranty cost"],
          ["The dashboard supports a part-level evidence review", "It automatically identifies every affected production part"],
          ["dbt tests protect implemented contracts", "Passing tests prove the physical quality rules are correct"],
        ] },
      },
    ],
  },
];
