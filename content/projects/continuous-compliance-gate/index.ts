import type { ProjectArtifact } from "../../types";

export const complianceArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "PRODUCT DEFINITION",
    title: "Product Requirements Document",
    summary: "Defines a narrow deterministic release gate, the policy-owner relationship, implemented behavior, future exception workflow, and measures required before blocking delivery.",
    sections: [
      {
        title: "Decision snapshot",
        state: "Current build",
        table: { headers: ["Decision", "Definition"], rows: [
          ["Primary user", "Platform or release engineer enforcing container policy"],
          ["Policy owner", "Security or governance stakeholder who defines rule meaning and severity"],
          ["Job to be done", "Detect specified container violations consistently and retain an inspectable result"],
          ["Product boundary", "Deterministic policy-as-code automation; no AI or LLM component is implemented"],
          ["Current stage", "Working CLI/daemon prototype with a controlled three-container Docker demo"],
        ] },
      },
      {
        title: "Problem and current alternative",
        state: "Design target",
        body: ["Platform rules are difficult to apply consistently when they exist only in documentation or manual release checklists. Reviewers need to know which policy version was applied, what violated it, and whether the result can be used by CI or retained for audit."],
        bullets: [
          "Current alternative: human review of container configuration and ownership metadata.",
          "Highest-risk assumption: labels and exposed ports are useful, governable release controls for the target team.",
          "Secondary stakeholders: security, service owners, release management, and audit reviewers.",
        ],
      },
      {
        title: "Implemented MVP",
        state: "Current build",
        bullets: [
          "Load and validate a versioned JSON policy before connecting to Docker.",
          "Inspect running containers for required ownership labels.",
          "Inspect container and host-published ports against forbidden values.",
          "Write structured JSON evidence with per-container findings and errors.",
          "Return success for a clean audit and a nonzero status for violations or fatal errors.",
          "Support one-shot execution and periodic daemon operation.",
        ],
      },
      {
        title: "Prioritized requirements",
        state: "Design target",
        table: { headers: ["Priority", "Requirement", "Status"], rows: [
          ["P0", "Reject malformed policy before infrastructure inspection", "Implemented"],
          ["P0", "Identify missing required labels", "Implemented"],
          ["P0", "Identify forbidden exposed ports", "Implemented"],
          ["P0", "Produce machine-readable findings and enforcement status", "Implemented"],
          ["P1", "Route a finding to a named remediation owner", "Proposed"],
          ["P1", "Manage time-bounded exceptions with approval and expiry", "Proposed"],
          ["P1", "Retain signed policy and audit artifacts in CI", "Proposed"],
        ] },
      },
      {
        title: "Goals and non-goals",
        state: "Current build",
        table: { headers: ["Goals", "Non-goals"], rows: [
          ["Apply a narrow rule set reproducibly", "Declare an organization or workload formally compliant"],
          ["Make each violation and error inspectable", "Replace a security reviewer or auditor"],
          ["Provide a CI-compatible enforcement signal", "Scan images, packages, signatures, or Kubernetes resources"],
          ["Keep policy separate from inspection code", "Use AI to make the release decision"],
        ] },
      },
      {
        title: "Success metric tree",
        state: "Proposed next step",
        table: { headers: ["Layer", "Measure", "Evidence required"], rows: [
          ["Policy quality", "Scenario precision and recall", "Labeled policy fixtures beyond the three demo containers"],
          ["Workflow", "Time to understand and remediate a finding", "Observed release-engineer tasks"],
          ["Coverage", "Percentage of defined controls executable by the gate", "Approved control inventory"],
          ["Reliability", "Audit runtime and system-error rate", "CI telemetry across repeated runs"],
          ["Guardrail", "Blocking false positives and unowned exceptions", "Advisory pilot before enforcement"],
        ] },
      },
    ],
  },
  {
    slug: "technical-design",
    label: "TECHNICAL JUDGMENT",
    title: "Policy & Technical Design",
    summary: "Documents the policy contract, modular inspection path, report and exit behavior, Docker-socket threat boundary, and alternatives considered.",
    sections: [
      {
        title: "Architecture",
        state: "Current build",
        code: "policy.json ─> PolicyIngestor ─> typed GovernancePolicy\n                                      ↓\nDocker socket ──────────────────> Auditor\n                                  ├─ required label checks\n                                  └─ forbidden port checks\n                                      ↓\n                                  AuditReport ─> JSON evidence + CLI exit status",
      },
      {
        title: "Policy contract",
        state: "Current build",
        body: ["The JSON policy provides a version, required label keys, and forbidden port values. Validation occurs before the Docker connection so malformed governance input cannot create a misleading clean result."],
        bullets: [
          "Required labels express ownership and operating context.",
          "Forbidden ports express a narrow network-exposure rule.",
          "Rule changes do not require rewriting the inspection engine.",
          "Boolean values are rejected where integer port values are required.",
        ],
      },
      {
        title: "Result and exit contract",
        state: "Current build",
        table: { headers: ["Condition", "Report behavior", "Process behavior"], rows: [
          ["All inspected containers pass", "Structured per-container results and summary", "Exit 0"],
          ["Policy violation exists", "Explicit violation with container and rule context", "Exit 1"],
          ["Container inspection error", "Error retained without discarding other results", "Audit remains non-clean"],
          ["Invalid policy or fatal Docker error", "Actionable fatal error", "Exit 1"],
        ] },
      },
      {
        title: "Technology decisions",
        state: "Current build",
        bullets: [
          "Python and the Docker SDK keep inspection logic small and directly testable.",
          "JSON makes the current policy readable and versionable, but does not provide enterprise distribution or signing.",
          "Modular ingestion, auditing, reporting, and service control allow new rules without turning the first release into a platform rewrite.",
          "Docker Compose provides controlled compliant and non-compliant demo fixtures.",
        ],
      },
      {
        title: "Docker-socket threat model",
        state: "Design target",
        table: { headers: ["Threat", "Required control before production"], rows: [
          ["Docker socket grants privileged host visibility", "Run in an isolated, least-privileged execution environment; do not expose the socket to untrusted code"],
          ["Container metadata may reveal sensitive operating details", "Limit report access and redact or scope retained evidence"],
          ["Policy tampering changes enforcement", "Sign and version policy; restrict write authority"],
          ["Auditor compromise becomes a host risk", "Pin dependencies, isolate runtime, monitor access, and separate collection from decision storage"],
        ] },
      },
      {
        title: "Alternatives and boundary",
        state: "Design target",
        body: ["OPA or an admission-policy platform would be stronger choices for a broad production policy program. This prototype stays narrow to make policy ingestion, evidence, errors, and CI behavior inspectable. A future LLM may explain a finding or propose cited remediation, but deterministic policy code must retain release authority."],
      },
    ],
  },
  {
    slug: "program-plan",
    label: "DELIVERY LEADERSHIP",
    title: "TPM Rollout Pack",
    summary: "Defines policy ownership, advisory-to-blocking rollout, exception dependencies, RAID controls, readiness gates, and rollback behavior.",
    sections: [
      {
        title: "Milestones",
        state: "Design target",
        table: { headers: ["Milestone", "Exit gate"], rows: [
          ["1 · Policy definition", "One narrow release decision, policy owner, severity, and non-goals approved"],
          ["2 · Contract baseline", "Input, rule, result, error, and missing-evidence behavior documented"],
          ["3 · Deterministic MVP", "Rules, reports, exit behavior, and fixtures are inspectable"],
          ["4 · Advisory pilot", "Findings run in CI without blocking; false positives and remediation effort reviewed"],
          ["5 · Exception workflow", "Owner, justification, approval, expiry, and audit retention implemented"],
          ["6 · Blocking decision", "Readiness scorecard approved by policy and release owners"],
        ] },
      },
      {
        title: "RACI",
        state: "Design target",
        body: ["Gokul designed and built the current demonstration. The table describes the operating ownership needed for a real rollout; it does not imply that this production organization already exists."],
        table: { headers: ["Workstream", "Responsible", "Accountable", "Consulted", "Informed"], rows: [
          ["Policy meaning and severity", "Security engineer", "Policy owner", "Release and service owners", "TPM"],
          ["Product requirements", "Product owner", "Product owner", "Platform, security, release", "Engineering"],
          ["Rule implementation", "Software engineer", "Technical lead", "Policy owner", "Product owner"],
          ["Scenario validation", "Security/QA engineer", "Policy owner", "Engineering", "TPM"],
          ["Rollout and exceptions", "TPM", "Release owner", "Security and service teams", "Stakeholders"],
        ] },
      },
      {
        title: "Exception lifecycle dependency",
        state: "Proposed next step",
        table: { headers: ["State", "Required behavior"], rows: [
          ["Finding created", "Named rule, subject, evidence, severity, and remediation owner"],
          ["Exception requested", "Business reason, compensating control, risk owner, and requested expiry"],
          ["Decision", "Policy-owner approval or rejection retained with identity and timestamp"],
          ["Active exception", "Visible to CI and reviewer; cannot silently convert a violation into no finding"],
          ["Expiry", "Automatically returns to enforcement unless explicitly renewed"],
        ] },
      },
      {
        title: "RAID log",
        state: "Design target",
        table: { headers: ["Type", "Item", "Response"], rows: [
          ["Risk", "A green result is mistaken for formal compliance", "Use ‘policy check passed’; preserve scope and limitations"],
          ["Risk", "Rule code drifts from policy intent", "Version rules and require policy-owner approval"],
          ["Risk", "False positives block delivery", "Run advisory first; measure and review every blocking candidate"],
          ["Risk", "Privileged Docker access expands blast radius", "Isolate runtime and minimize socket exposure"],
          ["Dependency", "Production rollout needs an exception owner", "Do not enable blocking without an approved lifecycle"],
          ["Decision", "Deterministic checks own release status", "Keep any future AI layer explanatory and cited"],
        ] },
      },
      {
        title: "Readiness and rollback",
        state: "Proposed next step",
        bullets: [
          "Policy owner approves rule semantics, severity, and version.",
          "Scenario suite includes pass, fail, malformed, unavailable, and exception cases.",
          "Advisory telemetry establishes false-positive and runtime behavior.",
          "Every blocking finding has a remediation and escalation owner.",
          "Rollback changes the gate to advisory mode while continuing to retain findings.",
          "Emergency bypass requires named approval and expiration; it is not an undocumented flag.",
        ],
      },
    ],
  },
  {
    slug: "validation",
    label: "VALIDATION",
    title: "Scenario Validation Pack",
    summary: "Defines the current controlled fixtures and the failure, ambiguity, and rollout scenarios required before CI enforcement.",
    sections: [
      {
        title: "Current controlled demo",
        state: "Current build",
        table: { headers: ["Fixture", "Expected result", "Purpose"], rows: [
          ["Compliant web container", "No label or forbidden-port violation", "Positive path"],
          ["Rogue API container", "Missing required governance labels", "Ownership-metadata failure"],
          ["Exposed database container", "Forbidden Redis port detected", "Network-exposure failure"],
        ] },
      },
      {
        title: "Functional scenario suite",
        state: "Current build",
        table: { headers: ["Scenario", "Expected behavior"], rows: [
          ["Valid policy", "Loads into the typed policy model before inspection"],
          ["Missing policy keys", "Fails before Docker inspection"],
          ["Boolean forbidden port", "Rejected instead of being accepted as an integer"],
          ["Missing required label", "Container and missing label key appear in violations"],
          ["Forbidden port", "Container and port appear in violations"],
          ["Mixed audit population", "Successful inspections remain available even if one container errors"],
        ] },
      },
      {
        title: "Additional gate scenarios",
        state: "Proposed next step",
        bullets: [
          "Docker socket unavailable or permission denied.",
          "Unknown or unsigned policy version.",
          "Policy hot-reload introduces invalid input during daemon operation.",
          "Approved exception is active, expired, or missing an owner.",
          "Audit report cannot be retained or uploaded.",
          "No target containers match the configured prefix.",
        ],
      },
      {
        title: "Advisory-pilot scorecard",
        state: "Proposed next step",
        table: { headers: ["Measure", "Blocking decision"], rows: [
          ["Scenario precision and recall", "Rules behave as the policy owner expects on labeled cases"],
          ["False-positive review", "Blocking candidates do not create unacceptable delivery friction"],
          ["Median and tail audit runtime", "Gate fits the release path without hiding timeouts"],
          ["Remediation completion time", "Findings are understandable and actionable"],
          ["Unowned or expired exceptions", "Governance workflow is not creating permanent bypasses"],
          ["System-error rate", "Infrastructure failure is distinguishable from non-compliance"],
        ] },
      },
      {
        title: "Enforcement criteria",
        state: "Proposed next step",
        body: ["Enable blocking only for rules with an accountable policy owner, labeled scenario coverage, acceptable advisory behavior, a named remediation path, and an auditable exception lifecycle. Passing unit tests alone is not a release-readiness decision."],
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "DEMO RUNBOOK",
    title: "Recording Guide",
    summary: "A deterministic 60–90 second CLI walkthrough of policy, controlled containers, violations, evidence, and expected enforcement status.",
    sections: [
      {
        title: "One-command setup",
        state: "Current build",
        body: ["Run from the AI-Continuous-Compliance repository with Docker Desktop or Docker Engine running. The script falls back to committed sample output when Docker is unavailable; use the live Docker path for the recording."],
        code: "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\nchmod +x demo/run_demo.sh\n./demo/run_demo.sh",
      },
      {
        title: "Manual recording sequence",
        state: "Current build",
        code: "docker compose -f demo/docker-compose.demo.yml up -d\ndocker ps --filter name=cc-demo\ncat policy.json\npython3 -m compliance.main --policy policy.json --output demo/audit_log.json --container-prefix cc-demo\n# Exit 1 is expected because two fixtures intentionally violate policy.\npython3 demo/print_report.py demo/audit_log.json\ndocker compose -f demo/docker-compose.demo.yml down",
      },
      {
        title: "60–90 second narrative",
        state: "Current build",
        table: { headers: ["Time", "Show", "Say"], rows: [
          ["0–10s", "Policy and three fixtures", "This is for a platform or release engineer who needs a repeatable, inspectable policy check before release."],
          ["10–25s", "Required labels and forbidden ports", "The rule lives outside the engine in versioned JSON and is validated before infrastructure inspection."],
          ["25–50s", "Run the audit", "The auditor checks the controlled container population and records each result independently."],
          ["50–70s", "Printed findings and JSON", "One container passes; two expose intentional label and port violations with structured evidence."],
          ["70–85s", "Exit behavior", "A nonzero exit is expected because violations exist. This is deterministic policy automation—not AI and not a claim of formal compliance."],
        ] },
      },
      {
        title: "Safe claims and boundaries",
        state: "Current build",
        table: { headers: ["Safe to say", "Do not say"], rows: [
          ["The auditor applies implemented label and port rules reproducibly", "The system proves a container or organization is compliant"],
          ["The JSON report and exit code are CI-compatible", "The project is deployed as a production release gate"],
          ["The code is deterministic", "The repository name means the implementation uses AI"],
        ] },
      },
    ],
  },
];
