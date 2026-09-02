import type { ProjectArtifact } from "../../types";

export const manufacturingArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "Defines the containment-investigation user, the current prototype boundary, prioritized requirements, and the measures needed before claiming user value.",
    sections: [
      {
        title: "Decision snapshot",
        state: "Current build",
        body: ["Build an investigation aid for a manufacturing quality engineer who needs to assemble the available evidence connected to a suspect part. The current prototype joins four synthetic source families into a part-level view; it does not initiate containment or prove a physical root cause."],
        table: { headers: ["Decision", "Definition"], rows: [
          ["Primary user", "Manufacturing quality engineer conducting containment"],
          ["Job to be done", "Inspect dimensional, process, torque, and supplier evidence without manually joining four systems"],
          ["Value hypothesis", "Reduce evidence-assembly time while exposing missing traceability before a containment decision"],
          ["Current stage", "Working local prototype using linked synthetic manufacturing data"],
        ] },
      },
      {
        title: "Problem and current workflow",
        state: "Design target",
        body: ["Quality evidence commonly arrives at different grains and from different owners. A reviewer may need to reconcile CMM results, CNC parameters, torque audits, and material certificates before deciding which records or parts deserve investigation."],
        bullets: [
          "Current alternative: query or export each source independently, reconcile identifiers, then rebuild the evidence trail in a spreadsheet.",
          "Highest-risk assumption: stable part and material-batch identifiers exist across the required systems.",
          "Secondary stakeholders: supplier quality, process engineering, data owners, and plant quality leadership.",
        ],
      },
      {
        title: "Goals and non-goals",
        state: "Current build",
        table: { headers: ["Goals", "Non-goals"], rows: [
          ["Preserve source evidence and publish one inspectable part-level record", "Replace MES, QMS, CMM, torque, or supplier systems"],
          ["Make broken or missing traceability visible", "Automatically determine physical root cause"],
          ["Provide consistent filters and investigation views", "Claim yield, warranty, scrap, or containment savings"],
          ["Keep the local workflow reproducible", "Operate at production scale or trigger a production action"],
        ] },
      },
      {
        title: "Prioritized requirements",
        state: "Current build",
        table: { headers: ["Priority", "Requirement", "Acceptance condition"], rows: [
          ["P0", "Filter the available production context", "Reviewer can narrow by date, machine, and root-cause category"],
          ["P0", "Inspect a suspect part", "Part summary exposes the linked process, material, dimensional, and torque evidence"],
          ["P0", "Expose incomplete traceability", "Missing required source evidence is represented explicitly rather than silently dropped"],
          ["P0", "Protect the analytical grain", "Automated tests reject broken identifiers, relationships, categories, and ranges"],
          ["P1", "Generate an affected-population candidate list", "Proposed only; not implemented in the current interface"],
          ["P1", "Export containment evidence", "Proposed only; requires policy, ownership, and access decisions"],
        ] },
      },
      {
        title: "Success metric tree",
        state: "Proposed next step",
        table: { headers: ["Layer", "Measure", "Evidence required"], rows: [
          ["User outcome", "Time to assemble an investigation evidence set", "Timed comparison against the current manual workflow"],
          ["Workflow", "Task completion and reviewer confidence", "Defined investigation scenario with target-user observation"],
          ["Data product", "Traceability completeness and unresolved identifier rate", "Reconciled source population and exception report"],
          ["Decision quality", "Affected-population precision and recall", "Seeded or historical ground truth hidden from the reviewer"],
          ["Guardrail", "False exclusions from the candidate population", "Quality-engineer review before any containment use"],
        ] },
      },
      {
        title: "Release boundary",
        state: "Proposed next step",
        body: ["A real pilot should begin in shadow mode on one historical case. The product may assemble evidence and produce a candidate population, but a quality owner remains responsible for containment scope and disposition."],
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
          ["Interface", "Filter trends and drill into a part", "Show available evidence; do not imply missing data is healthy"],
        ] },
      },
      {
        title: "Technology decisions",
        state: "Current build",
        bullets: [
          "Parquet keeps the Bronze layer inspectable and partitionable without a hosted service.",
          "DuckDB runs analytical joins locally while preserving SQL semantics appropriate for a warehouse prototype.",
          "dbt makes metric logic, lineage, and data tests version-controlled.",
          "Prefect provides an orchestration path while the direct Python ingestion command remains reproducible.",
          "Streamlit provides a fast investigation surface; it is not treated as the final production UX.",
        ],
      },
      {
        title: "Alternatives and tradeoffs",
        state: "Design target",
        table: { headers: ["Alternative", "Why it was not selected for this prototype"], rows: [
          ["Dashboard directly over generated CSV files", "Faster initially, but hides source contracts, lineage, and grain protection"],
          ["Hosted warehouse and orchestration", "More production-like, but introduces accounts and cost before the workflow is validated"],
          ["Opaque predictive quality score", "Would imply calibrated predictive validity that the synthetic data cannot establish"],
        ] },
      },
      {
        title: "Production evolution",
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
    title: "TPM Delivery Pack",
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
          ["5 · Shadow pilot", "Historical case completed without changing the existing containment process"],
          ["6 · Pilot decision", "User task, completeness, false-inclusion, and false-exclusion results reviewed"],
        ] },
      },
      {
        title: "RACI",
        state: "Design target",
        body: ["Gokul currently performs the product, program, and implementation roles for the portfolio build. This RACI describes the minimum operating model required for a real pilot; it does not imply that this team existed."],
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
          ["Risk", "Synthetic patterns do not represent plant variability", "Keep business value hypothetical; shadow-test on authorized historical data"],
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
          "Candidate outputs cannot automatically change containment or disposition.",
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
          ["Missing supplier certificate", "Part is not silently treated as healthy; missing genealogy is explicit"],
          ["Dimensional failure", "Failed dimension and supporting measurement are inspectable"],
          ["Torque failure", "Failed joint and audit evidence are inspectable"],
          ["Duplicate or broken identifier", "Build or exception output prevents an ambiguous part history"],
          ["No-defect case", "System avoids creating a false defect narrative"],
        ] },
      },
      {
        title: "Target-user task",
        state: "Proposed next step",
        body: ["Give a quality engineer one blinded suspect-part scenario and ask them to identify the available evidence, missing evidence, and the population they would investigate next."],
        bullets: [
          "Measure completion time, errors, confidence, and requests for missing context.",
          "Ask the reviewer to explain the metric denominator and whether missing data could change the conclusion.",
          "Record which views changed the next action rather than asking whether the dashboard looks useful.",
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
          "Do not change the approved production workflow during shadow evaluation.",
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
    summary: "A verified setup path and a concise recording narrative focused on the quality-engineer workflow—not implementation counts.",
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
          ["50–70s", "Open CMM, torque, process, and supplier details", "The reviewer can inspect the source evidence instead of trusting an opaque score."],
          ["70–85s", "Show one missing or failing state", "Missing traceability remains visible. The current product supports investigation; it does not automate containment."],
        ] },
      },
      {
        title: "Safe claims and boundaries",
        state: "Current build",
        table: { headers: ["Safe to say", "Do not say"], rows: [
          ["The build connects four synthetic source families at part and batch grain", "It reduced production containment time or warranty cost"],
          ["The dashboard supports a part-level evidence review", "It automatically identifies every affected production part"],
          ["dbt tests protect implemented contracts", "Passing tests prove the physical quality rules are correct"],
        ] },
      },
    ],
  },
];
