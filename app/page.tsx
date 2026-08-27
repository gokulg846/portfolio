"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

export const dynamic = "force-static";

type PrdSection = { title: string; body?: string; items?: string[] };
type CaseStudy = {
  id: string;
  index: string;
  kind: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  constraint: string;
  decision: string;
  outcome: string;
  reflection: string;
  decisionLabel: string;
  outcomeLabel: string;
  stakeholderLabel: string;
  scope: { role: string; collaborators: string; evidence: string };
  dependency: string;
  gate: string;
  metrics: { value: string; label: string; source: string }[];
  prd: PrdSection[];
};

const cases: CaseStudy[] = [
  {
    id: "ncr-bench",
    index: "01",
    kind: "EMPLOYER WORK · SELF-REPORTED INTERNAL RESULT",
    eyebrow: "RisingPhoenix.ai · AI governance",
    title: "Made AI compliance reliability measurable before agent scale",
    summary:
      "Recommended re-sequencing agent expansion by three weeks to establish a reproducible evaluation and release policy first.",
    context:
      "Security-review agents were producing OWASP, CIS, and ISO mappings faster than reviewers could validate them. One unsupported critical claim could invalidate an otherwise strong aggregate score.",
    constraint:
      "The sequence moved agent expansion by three weeks. I accepted slower feature throughput in exchange for a release decision that product, governance, and engineering could reproduce.",
    decision:
      "I defined the evaluation dimensions, benchmark-versioning rules, trace schema, severity policy, and go/no-go criteria; then connected reviewer-approved labels to node traces and the CI release gate.",
    outcome:
      "Internal evaluation reported 94.8% weighted reliability, an 80% reduction in manual audit effort, and no critical unsupported claims observed in the release test. Customer content and implementation details remain confidential.",
    reflection:
      "Next, I would separate retrieval, mapping, and citation failure rates by control family so each regression routes to a specific owner instead of a single model-quality queue.",
    decisionLabel: "MY DECISION SCOPE",
    outcomeLabel: "WHAT CHANGED",
    stakeholderLabel: "COLLABORATORS",
    scope: {
      role: "AI Product Engineer · evaluation contract and release policy",
      collaborators: "Security reviewers · governance · ML/platform engineering",
      evidence: "Internal benchmark summary · versioned traces · release criteria",
    },
    dependency: "Reviewer-approved annotations linked to retrievable evidence and node traces.",
    gate: "No release below 94% reliability or with any critical unsupported claim.",
    metrics: [
      { value: "94.8%", label: "weighted reliability", source: "SELF-REPORTED INTERNAL" },
      { value: "−80%", label: "manual audit effort", source: "SELF-REPORTED INTERNAL" },
      { value: "0 observed", label: "critical unsupported claims", source: "INTERNAL RELEASE TEST" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "The LangGraph pipeline could generate security findings faster than reviewers could validate them. Before expanding generation, the product needed a reproducible way to measure grounded correctness, citation validity, compliance-mapping accuracy, hallucination severity, latency, and release-to-release regression.",
      },
      {
        title: "Target personas",
        items: [
          "Security reviewer — cited evidence and a bounded dispute queue.",
          "AI governance lead — severity-based release gates and an audit trail.",
          "ML/platform engineer — node traces, benchmark versions, and regression diagnostics.",
          "Product owner — a launch decision tied to reliability and review cost.",
        ],
      },
      {
        title: "Functional & non-functional requirements",
        items: [
          "Ingest PDF, DOCX, and structured evidence while preserving page, chunk, control, and trace identifiers.",
          "Score grounded correctness, citation validity, mapping accuracy, hallucination severity, and latency against a reviewer-approved set.",
          "Store model, prompt, graph, control-library, and benchmark versions with every run.",
          "Prevent benchmark data from entering generation-time retrieval; never publish a partial or failed evaluation.",
          "Finish the first release within the three-week delay and remain executable in CI.",
        ],
      },
      {
        title: "Technical architecture & data flow",
        body: "Documents → parse/OCR → chunk and metadata store → retriever → LangGraph generation → citation validator → control-mapping validator → severity gate → publish or review. NCR-Bench joins each versioned run to locked annotations, calculates task-level scores, and connects every metric back to evidence and a node trace.",
      },
      {
        title: "Failure modes & edge cases",
        items: [
          "Low-quality OCR abstains and requests review instead of producing a control conclusion.",
          "Prompt injection inside source files is isolated from system instructions and included in the benchmark.",
          "A valid page with irrelevant cited text fails citation validity.",
          "Critical errors are gated before composite scoring; evaluator outages publish nothing and retry idempotently.",
        ],
      },
      {
        title: "Success metrics",
        items: [
          "94.8% output reliability on the locked benchmark.",
          "80% reduction in manual audit effort in the internal workflow.",
          "No critical unsupported claim observed in the internal release test.",
          "Per-release reporting for correctness, citations, mappings, latency, and reviewer disagreement.",
        ],
      },
      {
        title: "Go / no-go launch gates",
        items: [
          "GO: reliability ≥94%, control mapping ≥95%, p95 latency ≤12 seconds, and every published claim resolves to evidence.",
          "GO: zero critical unsupported compliance claims across the locked release suite.",
          "NO-GO: benchmark leakage, missing version metadata, or an evaluator failure that permits publication.",
        ],
      },
    ],
  },
  {
    id: "inspection",
    index: "02",
    kind: "INDEPENDENT PROTOTYPE · REPORTED RESULT",
    eyebrow: "Computer vision · inspection policy",
    title: "Designed a review policy around critical-defect recall",
    summary:
      "An illustrative operating policy targets 94% critical recall and models a four-point increase in human review rather than treating every model error as equally costly.",
    context:
      "A global accuracy score treated a missed critical solder defect and an unnecessary re-inspection as equivalent. Operators needed a decision policy, not another model score.",
    constraint:
      "In the illustrative policy, manual re-inspection rises from 7% to 11%. That modeled increase makes the cost of prioritizing critical-path recall explicit.",
    decision:
      "I defined severity-based launch criteria and routed uncertain frames to human review instead of allowing a low-confidence automatic pass. The interactive simulator makes the operating-cost curve visible.",
    outcome:
      "The project reported 99.2% defect detection and 12 ms edge inference. The threshold tool below is an illustrative simulator for product-policy reasoning, not the source of those reported results.",
    reflection:
      "I would add calibration and drift slices by camera, lighting condition, and defect class before allowing a threshold policy to transfer across inspection stations.",
    decisionLabel: "THE POLICY I DESIGNED",
    outcomeLabel: "REPORTED RESULT",
    stakeholderLabel: "INTENDED USERS / REVIEW PARTNERS",
    scope: {
      role: "Product and system case author · threshold policy and evaluation design",
      collaborators: "Inspection operators · ML engineering · review-queue owner",
      evidence: "Reported project result · illustrative operating-point simulator",
    },
    dependency: "Representative images, calibrated scores, and operator capacity for the review queue.",
    gate: "Target critical recall ≥94%; uncertain frames route to review; modeled demand must remain within validated operator capacity.",
    metrics: [
      { value: "99.2%", label: "defect detection", source: "SELF-REPORTED PROTOTYPE" },
      { value: "12 ms", label: "edge inference", source: "SELF-REPORTED PROTOTYPE" },
      { value: "+4 pp", label: "modeled review increase", source: "ILLUSTRATIVE SIMULATOR" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "A ConvNeXt-Tiny prototype assessed solder-joint imagery. The product problem was to define a review policy because escaped-defect cost and false-reject cost were not symmetric.",
      },
      {
        title: "Target personas",
        items: [
          "Inspection operator — pass, review, or block with a region and reason code.",
          "ML engineer — class-level precision/recall, calibration, drift, and corrected labels.",
          "Product owner — threshold controls tied to risk and review capacity.",
        ],
      },
      {
        title: "Functional & non-functional requirements",
        items: [
          "Validate image resolution, exposure, camera metadata, and completeness before inference.",
          "Return calibrated class probabilities, model version, preprocessing version, and latency.",
          "Apply thresholds by defect class and criticality; route uncertain and high-risk cases to HITL review.",
          "Target p95 edge inference ≤15 ms; the project-reported inference result is 12 ms.",
          "Default to review on model, image-quality, or resource failure—never automatic pass.",
        ],
      },
      {
        title: "Technical architecture & data flow",
        body: "Camera → image-quality checks → preprocessing → ConvNeXt-Tiny edge inference → calibrated scores → threshold gate → pass / HITL review / block → decision store. Reviewer corrections enter a governed label queue for calibration and retraining analysis.",
      },
      {
        title: "Failure modes & edge cases",
        items: [
          "Blur, glare, or occlusion triggers recapture or review.",
          "New defect appearance and camera drift trigger distribution alerts and disable low-confidence automatic passes.",
          "Threshold changes require offline replay against the locked set.",
          "Missing image or model metadata prevents an automatic pass and routes the frame to review.",
        ],
      },
      {
        title: "Success metrics",
        items: [
          "99.2% reported defect detection for the project benchmark.",
          "Critical-path recall target ≥0.94 with uncertain cases routed to review.",
          "12 ms reported edge inference; hardware and percentile details should be documented before deployment claims.",
          "Illustrative policy models manual re-inspection rising from 7% to 11% at the chosen operating point.",
        ],
      },
      {
        title: "Go / no-go launch gates",
        items: [
          "GO: critical recall ≥0.94 and p95 inference ≤15 ms under a documented representative test.",
          "GO: modeled review demand remains within an explicitly validated operator-capacity limit.",
          "NO-GO: invalid images can auto-pass, threshold updates bypass replay, or drift monitoring is unavailable.",
        ],
      },
    ],
  },
  {
    id: "telemetry",
    index: "03",
    kind: "PROFESSIONAL CONTEXT · DESIGN EXERCISE",
    eyebrow: "Accenture scale · portfolio architecture",
    title: "Modeled 60.1% fewer events with transition-aware sampling",
    summary:
      "At Accenture I supported IIoT workflows spanning 10,000+ sensors. This portfolio exercise applies that operating context to adaptive sampling, schema contracts, and failure-aware replay.",
    context:
      "Connected fleets need current state without transmitting stationary signals at motion frequency. Fixed 100 Hz preserves detail but spends bandwidth while devices sit idle.",
    constraint:
      "Adaptive sampling creates missed-transition risk. I bounded it with explicit triggers, hysteresis, a five-second stability window, sequence IDs, and replay-visible sampling state.",
    decision:
      "I moved the sampling decision to the edge: 100 Hz during acceleration, turns, braking, or obstacle events and 1 Hz after five stable seconds, with ordered replay and packet-gap detection.",
    outcome:
      "In a representative 60-second trace, event volume falls from 6,000 to 2,396—a modeled 60.1% reduction. The 10,000+ figure refers to professional sensor-estate scale; <50 ms is a design SLO, not a claimed field result.",
    reflection:
      "Next, I would tune state triggers per device class and make the cost of missed transitions visible beside bandwidth savings in the release dashboard.",
    decisionLabel: "THE ARCHITECTURE I PROPOSED",
    outcomeLabel: "MODELED RESULT",
    stakeholderLabel: "STAKEHOLDERS MODELED",
    scope: {
      role: "Accenture: Data & Analytics Analyst · portfolio: system-policy author",
      collaborators: "Fleet operations · platform engineering · data/ML consumers",
      evidence: "Professional sensor scale · representative 60-second model",
    },
    dependency: "Versioned schemas, device-keyed ordering, and durable disconnect replay.",
    gate: "No stale state shown as live; benchmark transitions must survive sampling and replay.",
    metrics: [
      { value: "10k+", label: "sensors in IIoT scope", source: "PROFESSIONAL SCALE" },
      { value: "60.1%", label: "modeled event reduction", source: "60-SECOND TRACE" },
      { value: "<50 ms", label: "visualization SLO", source: "DESIGN TARGET" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "The portfolio design tests adaptive sampling, replay safety, and stale-state behavior for a professional context spanning 10,000+ sensors. That sensor-estate figure is not a measured message-throughput claim.",
      },
      {
        title: "Target personas",
        items: [
          "Fleet operator — live state, location, alerts, and stale-data indicators.",
          "Platform engineer — schema contracts, partition lag, retries, and dead-letter diagnostics.",
          "Data/ML engineer — ordered events with sampling-state context.",
          "Connectivity owner — bandwidth and packet loss by sampling policy.",
        ],
      },
      {
        title: "Functional & non-functional requirements",
        items: [
          "Publish timestamped, sequenced events with device ID, schema version, sampling state, and quality flags.",
          "Switch locally between 1 Hz idle and 100 Hz transition capture with hysteresis and immediate state-change events.",
          "Partition by device, buffer during disconnects, and replay idempotently with original time and sequence.",
          "Stream materialized state through FastAPI/WebSockets and mark stale devices explicitly.",
          "Define a reproducible load test and evaluate ingest-to-view latency against a <50 ms design SLO.",
        ],
      },
      {
        title: "Technical architecture & data flow",
        body: "Sensors → edge state detector and sampler → local buffer → Redpanda/Kafka → schema validation → device-keyed partitions → stream processor → FastAPI/WebSocket → Leaflet dashboard. Durable raw storage enables replay; event time and sequence IDs detect drops, duplicates, and late arrivals.",
      },
      {
        title: "Failure modes & edge cases",
        items: [
          "Network loss buffers locally and marks the dashboard stale until ordered replay completes.",
          "Sampling-mode oscillation is controlled by hysteresis and a minimum dwell time.",
          "Unknown schemas route to a dead-letter stream without blocking valid traffic.",
          "Consumer slowdown applies backpressure and scales by partition; client reconnect begins from current materialized state.",
        ],
      },
      {
        title: "Success metrics",
        items: [
          "Professional context: IIoT workflows spanning 10,000+ sensors.",
          "Modeled event volume: 6,000 to 2,396 in the representative 60-second trace (−60.1%).",
          "Design SLO: <50 ms ingest-to-view latency; a load-test result is not claimed.",
          "Visible packet loss, duplicate rate, consumer lag, stale-device count, and schema rejections.",
        ],
      },
      {
        title: "Go / no-go launch gates",
        items: [
          "GO: representative load sustains throughput inside the latency target.",
          "GO: sampling cuts bandwidth without missing benchmark state transitions; disconnect replay preserves ordering.",
          "NO-GO: stale data appears current, unknown schemas reach consumers, or one partition breaches fleet latency.",
        ],
      },
    ],
  },
  {
    id: "amr",
    index: "04",
    kind: "CONCEPT · VALIDATION PLAN, NOT DEPLOYED",
    eyebrow: "Systems design lab · AMR edge AI",
    title: "Kept probabilistic planning out of the robot’s safety path",
    summary:
      "A technical product brief that keeps perception, collision policy, and emergency stopping local even when the network or VLA fails.",
    context:
      "Warehouse AMRs need camera, depth, LiDAR, odometry, and semantic task context under a bounded edge compute and thermal envelope.",
    constraint:
      "Local safety consumes reserved compute and limits on-robot semantic reasoning. The design holds ≥20% GPU headroom and pauses VLA first under thermal pressure.",
    decision:
      "Keep perception, fusion, time-to-collision, and emergency stopping on-robot. Offload static map optimization and fleet scheduling. Constrain VLA output to validated semantic actions with no motor interface.",
    outcome:
      "Pilot approval would require ≤22 ms p95 perception, a 99.99% stop-request lower bound over at least 30,000 representative trials, zero invalid VLA actions reaching Nav2, and a working stop path with the network disconnected.",
    reflection:
      "After a pilot, I would compare the measurable value of VLA task planning with its compute cost and reduce its on-robot role if deterministic task templates cover most workflows.",
    decisionLabel: "THE SYSTEM BOUNDARY I PROPOSED",
    outcomeLabel: "HOW I WOULD PROVE IT",
    stakeholderLabel: "VALIDATION OWNERS REQUIRED",
    scope: {
      role: "Technical product spec author · system boundary and validation plan",
      collaborators: "Required: robotics · perception · fleet platform · safety ownership",
      evidence: "Architecture and acceptance criteria · no field deployment claimed",
    },
    dependency: "Sensor calibration, timestamp integrity, GPU scheduling, and an independent stop path.",
    gate: "Network loss cannot disable obstacle perception or emergency stopping.",
    metrics: [
      { value: "≤22 ms", label: "p95 perception", source: "DESIGN TARGET" },
      { value: "99.99%", label: "stop lower bound", source: "VALIDATION CRITERION" },
      { value: "+18%", label: "mission-time hypothesis", source: "PROJECTION" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "This concept defines how an AMR can add richer perception and semantic task handling without making a fleet server or probabilistic VLA model part of the safety-critical motion path. All values are proposed targets pending prototype validation.",
      },
      {
        title: "Target personas",
        items: [
          "Fleet operator — state, intervention reason, map freshness, and degraded-mode alerts.",
          "Robotics engineer — ROS 2 contracts, timestamp bounds, calibration, and deterministic replay.",
          "Perception engineer — sensor confidence, fused detections, latency, and evaluation slices.",
          "Safety owner — proof that network or VLA failure cannot bypass local stopping.",
        ],
      },
      {
        title: "Functional & non-functional requirements",
        items: [
          "Synchronize RGB, depth, LiDAR, IMU, and odometry through versioned ROS 2 messages with ≤2 ms skew target.",
          "Keep obstacle fusion, stopping-distance logic, watchdog, and E-stop on-robot.",
          "Restrict VLA to schema-validated semantic goals; never velocity, stop zones, drive enable, or motor commands.",
          "Target ≤22 ms p95 perception, ≤50 W sustained Orin power, and ≥20% GPU reserve.",
          "Support safe local behavior for at least ten minutes without fleet connectivity, then stop on authorization expiry.",
        ],
      },
      {
        title: "Technical architecture & data flow",
        body: "Sensors → hardware time sync → accelerated preprocessing → TensorRT perception → spatial fusion → occupancy and tracked objects → local planner / collision policy → motor controller and independent stop path. Fleet services supply signed static maps and missions; VLA proposes validated task intents only.",
      },
      {
        title: "Failure modes & edge cases",
        items: [
          "Network loss retains local perception and cached map; new remote tasks stop on lease expiry.",
          "GPU or thermal pressure pauses VLA first; persistent safety-deadline violation triggers controlled stop.",
          "Timestamp drift rejects fused output and transitions to conservative geometry checks or stop.",
          "Unsigned model or map artifacts refuse activation and roll back to the last approved bundle.",
          "Sensor disagreement expands occupied space and reduces speed rather than averaging away risk.",
        ],
      },
      {
        title: "Success metrics",
        items: [
          "≤22 ms p95 and ≤30 ms p99 frame-to-obstacle decision target.",
          "99.99% stop-request lower-bound target across at least 30,000 representative trigger trials.",
          "≥20% GPU headroom, ≤50 W sustained Orin power, and zero sustained throttling in a two-hour qualification run.",
          "18% projected median mission-time improvement; invalid VLA actions reaching Nav2: zero.",
        ],
      },
      {
        title: "Go / no-go launch gates",
        items: [
          "GO: stop path works with the fleet network physically disconnected and VLA has no motor interface.",
          "GO: critical evaluation slices meet recall targets; model, calibration, sensor, and map versions are traceable.",
          "GO: timing, compute, and thermal targets hold under concurrent navigation, recording, and VLA load.",
          "NO-GO: any single network, server, model, or sensor fault can cause continued unbounded motion.",
        ],
      },
    ],
  },
];

const prPoints = [
  { t: 0.95, p: 99.5, r: 72, review: 4 },
  { t: 0.9, p: 98.8, r: 84, review: 6 },
  { t: 0.85, p: 97.5, r: 90, review: 8 },
  { t: 0.8, p: 95.9, r: 94, review: 11 },
  { t: 0.75, p: 94.2, r: 97, review: 15 },
  { t: 0.7, p: 92.5, r: 98.8, review: 19 },
  { t: 0.65, p: 89.5, r: 99.6, review: 25 },
  { t: 0.6, p: 87.2, r: 99.8, review: 31 },
  { t: 0.5, p: 82, r: 100, review: 42 },
];

const skills = [
  {
    name: "ML & data systems scoping",
    tag: "EVALUATE",
    items: [
      "LLM benchmarks, evidence grounding, and severity-based release gates in NCR-Bench.",
      "Precision/recall threshold policy and calibration for edge inspection.",
      "Kafka/Redpanda event contracts, replay semantics, SQL, PyTorch, and stream observability.",
    ],
  },
  {
    name: "Hardware–software system judgment",
    tag: "ALLOCATE",
    items: [
      "Edge versus server compute boundaries for dynamic and static AMR workloads.",
      "Latency, thermal, power, bandwidth, and throughput budgets tied to product behavior.",
      "Human-in-the-loop queues designed as part of the operating policy.",
    ],
  },
  {
    name: "AI reliability & governance",
    tag: "GATE",
    items: [
      "Versioned benchmark sets, traceable decisions, guardrails, and abstention paths.",
      "Slice-based metrics that prevent aggregate scores from hiding critical failures.",
      "Go/no-go gates tied to evidence, not subjective release confidence.",
    ],
  },
  {
    name: "Cross-functional program execution",
    tag: "SEQUENCE",
    items: [
      "Dependency mapping across ML, platform, robotics, data, safety, and site operations.",
      "Interface ownership, API contracts, release manifests, and rollback criteria.",
      "Decision logs that make accepted cost and rejected risk explicit.",
    ],
  },
];

const publicBuilds = [
  {
    name: "Industrial Data Telemetry Pipeline",
    type: "DATA PLATFORM",
    proof: "S3 / MinIO · Postgres · dbt · Prefect · Terraform",
    copy: "An idempotent raw-to-mart telemetry system with schema-drift logging, source-freshness checks, orchestration history, operator views, and documented product decisions.",
    href: "https://github.com/gokulg846/data_telemetry",
    signal: "PRD + ARCHITECTURE + CODE",
  },
  {
    name: "Semiconductor Wafer Yield Pipeline",
    type: "YIELD ANALYTICS",
    proof: "~943k die records · 139 dbt tests · DuckDB",
    copy: "A causal wafer-data simulation, medallion model, SPC and spatial yield workflow that links process excursions to die-level failure patterns.",
    href: "https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline",
    signal: "DATA CONTRACTS + QUALITY GATES",
  },
  {
    name: "Industrial Sensor Anomaly Detection",
    type: "ML EVALUATION",
    proof: "5,500 windows · 0.5% false-positive budget",
    copy: "A leakage-aware CWRU vibration pipeline comparing an Isolation Forest with an LSTM autoencoder trained only on healthy baseline data.",
    href: "https://github.com/gokulg846/industry-sensor-anomaly-detection",
    signal: "THRESHOLD POLICY + EVALS",
  },
  {
    name: "AI Continuous Compliance",
    type: "GOVERNANCE SYSTEM",
    proof: "Policy schema · Docker audit · CI exit gates",
    copy: "A modular policy ingestor, container auditor, and evidence reporter with fail-fast validation, structured violations, and repeatable demo scenarios.",
    href: "https://github.com/gokulg846/AI-Continuous-Compliance",
    signal: "POLICY-AS-CODE + EVIDENCE",
  },
];

const timeline = [
  ["Jul 2026 — present", "RisingPhoenix.ai", "AI Product Engineer Intern", "Defined evaluation dimensions, traceability, severity policy, and release criteria for AI-generated OWASP, CIS, and ISO mappings."],
  ["Feb 2025 — Jan 2026", "Cummins", "Product Engineer Co-op", "Structured system data, technical requirements, and cross-workstream dependencies for product-engineering decisions."],
  ["Aug 2023 — Dec 2023", "Purdue–Bayer Innovation", "Data Science Consultant", "Built the evaluation plan, analytical workflow, and decision artifact for an applied data-science engagement."],
  ["Jul 2021 — Jul 2023", "Accenture", "Analyst, Data & Analytics", "Supported production IIoT streaming and predictive-maintenance workflows spanning 10,000+ sensors."],
];

function FlowDiagram({ type }: { type: string }) {
  const flows: Record<string, { label: string; sub: string }[]> = {
    "ncr-bench": [
      { label: "Document intake", sub: "PDF · DOCX · API" },
      { label: "Evidence index", sub: "chunks · citations · trace ID" },
      { label: "LangGraph", sub: "OWASP · CIS · ISO" },
      { label: "Generation", sub: "findings · mappings" },
      { label: "NCR-Bench", sub: "fidelity · safety · latency" },
      { label: "Release gate", sub: "pass · retry · abstain" },
    ],
    inspection: [
      { label: "AOI camera", sub: "solder-joint frames" },
      { label: "Normalize", sub: "crop · denoise · calibrate" },
      { label: "ConvNeXt-Tiny", sub: "12 ms edge inference" },
      { label: "Recall gate", sub: "floor = 0.94" },
      { label: "HITL review", sub: "modeled review load" },
      { label: "Decision store", sub: "image · score · review label" },
    ],
    telemetry: [
      { label: "10,000+ sensors", sub: "position · temp · vibration" },
      { label: "Edge collector", sub: "schema · sequence · spool" },
      { label: "Adaptive sampler", sub: "dynamic 100 Hz · idle 1 Hz" },
      { label: "Redpanda / Kafka", sub: "device-keyed partitions" },
      { label: "FastAPI consumer", sub: "enrich · aggregate" },
      { label: "Leaflet map", sub: "<50 ms design SLO" },
    ],
    amr: [
      { label: "RGB · depth · LiDAR", sub: "odometry · IMU" },
      { label: "ROS 2 time sync", sub: "≤2 ms skew target" },
      { label: "Edge perception", sub: "Jetson AGX Orin" },
      { label: "Sensor fusion", sub: "pose · obstacle tracks" },
      { label: "Local safety", sub: "TTC · watchdog" },
      { label: "Motor / E-stop", sub: "no network dependency" },
    ],
  };

  return (
    <figure className="architecture" aria-label={`${type} system architecture`}>
      <div className="architecture-head">
        <figcaption>System boundary</figcaption>
        <span>DATA FLOW → DECISION</span>
      </div>
      <ol className="flow">
        {flows[type].map((node, index) => (
          <li className={`flow-node ${index === 4 ? "accent-node" : ""}`} key={node.label}>
            <span className="node-index">0{index + 1}</span>
            <strong>{node.label}</strong>
            <small>{node.sub}</small>
          </li>
        ))}
      </ol>
      {type === "amr" && (
        <p className="invariant">Safety invariant: network loss cannot disable dynamic obstacle perception or emergency stopping.</p>
      )}
    </figure>
  );
}

function NcrDashboard() {
  const dimensions = [
    "Evidence fidelity",
    "Control mapping",
    "Citation coverage",
    "Hallucination safety",
  ] as const;

  return (
    <div className="artifact-panel eval-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">Internal evaluation snapshot</span><h4>NCR-Bench</h4></div>
        <span className="data-cohort">SELF-REPORTED</span>
      </div>
      <div className="eval-layout">
        <div className="score-orbit"><span>94.8</span><small>weighted reliability</small></div>
        <div className="score-bars">
          {dimensions.map((label, index) => (
            <div className="eval-dimension" key={label}>
              <span>0{index + 1}</span><b>{label}</b><small>included in weighted evaluation</small>
            </div>
          ))}
        </div>
      </div>
      <div className="gate-grid">
        <span><b>−80%</b> manual audit effort</span>
        <span><b>0 observed</b> critical unsupported claims</span>
        <span><b>Internal</b> customer details omitted</span>
      </div>
    </div>
  );
}

function ThresholdLab() {
  const [threshold, setThreshold] = useState(0.8);
  const point = useMemo(
    () => prPoints.reduce((best, item) => Math.abs(item.t - threshold) < Math.abs(best.t - threshold) ? item : best),
    [threshold],
  );

  return (
    <div className="artifact-panel threshold-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">Illustrative operating-point simulator</span><h4>Recall has an operating cost</h4></div>
        <span className="data-cohort">ILLUSTRATIVE</span>
      </div>
      <div className="threshold-readout">
        <div><span>Threshold</span><b>{point.t.toFixed(2)}</b></div>
        <div><span>Precision</span><b>{point.p.toFixed(1)}%</b></div>
        <div className="selected-stat"><span>Recall</span><b>{point.r.toFixed(1)}%</b></div>
        <div><span>Review load</span><b>{point.review}%</b></div>
      </div>
      <label className="slider-label" htmlFor="threshold-slider">
        <span>More recall / review</span><span>More precision</span>
      </label>
      <input
        id="threshold-slider"
        className="threshold-slider"
        type="range"
        min="0.5"
        max="0.95"
        step="0.05"
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
      />
      <div className="decision-note">
        <span className="decision-marker">EXAMPLE POLICY</span>
        <p>At the 0.80 example threshold, the simulator shows 94% recall and an 11% review queue. The values demonstrate the cost curve; they are not measured project results.</p>
      </div>
      <p className="fine-print">The project-reported 99.2% detection and 12 ms inference are separate from this illustrative interaction.</p>
    </div>
  );
}

function SamplingLab() {
  const segments = [
    ["Idle", 30, false], ["Acceleration", 11.667, true], ["Idle", 21.667, false], ["Turn / obstacle", 20, true], ["Idle", 9, false], ["Braking", 7.666, true],
  ] as const;
  return (
    <div className="artifact-panel sampling-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">60-second trip · 320 bytes / event</span><h4>Adaptive transmission model</h4></div>
        <span className="data-cohort">MODELED −60.1%</span>
      </div>
      <div className="sampling-chart" aria-label="Adaptive sampling timeline">
        {segments.map(([label, width, dynamic], index) => (
          <div className={dynamic ? "sample-segment dynamic" : "sample-segment"} style={{ width: `${width}%` }} key={`${label}-${index}`}>
            <span>{dynamic ? "100 Hz" : "1 Hz"}</span><small>{label}</small>
          </div>
        ))}
      </div>
      <div className="comparison-row">
        <div><span>Fixed 100 Hz</span><b>6,000 events</b><small>1.92 MB</small></div>
        <div className="comparison-selected"><span>Adaptive</span><b>2,396 events</b><small>0.767 MB</small></div>
      </div>
      <p className="fine-print">Design exercise: dynamic trigger at |Δvelocity| &gt; 0.4 m/s², heading &gt; 12°/s, or obstacle alert; return to idle after five stable seconds.</p>
    </div>
  );
}

function AmrTable() {
  const rows = [
    ["Economy", "640×360", "60", "28 W", "Small-obstacle miss risk"],
    ["Balanced", "960×540", "45", "38 W", "Selected assumption"],
    ["High fidelity", "1280×720", "30", "52 W", "Low latency margin"],
    ["Max detail", "1920×1080", "18", "72 W", "Fails 25 ms budget"],
  ];
  return (
    <div className="artifact-panel table-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">Modeled planning assumptions · not benchmark results</span><h4>Resolution / latency / power envelope</h4></div>
        <span className="concept-badge">CONCEPT</span>
      </div>
      <div className="responsive-table">
        <table>
          <thead><tr><th>Mode</th><th>Input</th><th>FPS</th><th>Power</th><th>Decision</th></tr></thead>
          <tbody>{rows.map((row, index) => <tr className={index === 1 ? "selected-row" : ""} key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="fine-print">Planning assumption: balanced mode reserves 22 W of a 60 W envelope for fusion, planning, and ROS 2 overhead. Hardware validation is required.</p>
    </div>
  );
}

function Artifact({ id }: { id: string }) {
  if (id === "ncr-bench") return <NcrDashboard />;
  if (id === "inspection") return <ThresholdLab />;
  if (id === "telemetry") return <SamplingLab />;
  return <AmrTable />;
}

export default function Home() {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeCase ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCase]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setActiveCase(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Gokul Gopalakrishnan home">GOKUL <span>GOPALAKRISHNAN</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#repositories" onClick={() => setMenuOpen(false)}>Public builds</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a className="nav-cta" href="./Gokul_Gopalakrishnan_Resume.pdf" download>Résumé ↓</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta">
          <span>GOKUL GOPALAKRISHNAN</span>
          <span>DATA SYSTEMS · AI/ML · ENGINEERING · PRODUCT</span>
          <span>PURDUE MEM · MAY 2026</span>
        </div>
        <div className="hero-grid">
          <div>
            <p className="hero-kicker"><i /> PRODUCT JUDGMENT ACROSS DATA, AI &amp; ENGINEERED SYSTEMS</p>
            <h1>I turn data, AI &amp;<br /><em>engineering constraints</em><br />into launch decisions.</h1>
          </div>
          <div className="hero-copy">
            <p>I combine product management with hands-on data, ML, and systems engineering—setting the requirements, evaluation gates, and architecture boundaries that determine whether a system is ready for the real world.</p>
            <div className="hero-actions">
              <a href="#work" className="primary-button">View case studies <span>↓</span></a>
              <a href="./Gokul_Gopalakrishnan_Resume.pdf" className="text-link" download>Download résumé ↓</a>
            </div>
          </div>
        </div>
        <div className="proof-rail" aria-label="Evidence snapshot">
          {[
            ["10,000+", "sensors in IIoT scope", "PROFESSIONAL SCALE · ACCENTURE"],
            ["94.8%", "grounded compliance-output reliability", "LOCKED INTERNAL BENCHMARK · RISINGPHOENIX"],
            ["139", "dbt quality tests", "PUBLIC WAFER-YIELD BUILD"],
            ["4", "public systems", "CODE · TESTS · ARCHITECTURE"],
          ].map(([value, label, source]) => (
            <div key={label}><b>{value}</b><span>{label}</span><small>{source}</small></div>
          ))}
        </div>
      </header>

      <section className="work section-shell" id="work">
        <div className="section-label"><span>02</span><p>Selected product decisions</p></div>
        <div className="work-intro">
          <h2>Proof before<br />positioning.</h2>
          <p>Each case states the operating risk, my mandate, the cost I accepted, what changed, and the evidence behind the claim.</p>
        </div>
        <div className="case-stack">
          {cases.map((study) => (
            <Fragment key={study.id}>
            {study.id === "amr" && (
              <div className="concept-divider">
                <span>SYSTEMS DESIGN LAB</span>
                <div><h3>AMR edge AI: architecture and validation plan.</h3><p>A forward-looking systems exercise showing how I define safety boundaries, compute budgets, dependencies, and go/no-go criteria before prototype investment. Every value below is a target, criterion, or hypothesis.</p></div>
              </div>
            )}
            <article className={`case-study ${study.id === "amr" ? "concept-case" : ""}`} id={study.id}>
              <div className="case-head">
                <div className="case-number">{study.index}</div>
                <div className="case-title">
                  <span className="case-kind">{study.kind}</span><small>{study.eyebrow}</small><h3>{study.title}</h3><p>{study.summary}</p>
                  {study.id === "ncr-bench" && <em className="confidentiality-note">Public summary; customer content and internal implementation details omitted.</em>}
                </div>
                <button className="prd-button" onClick={() => setActiveCase(study)} aria-label={`Open PRD for ${study.title}`}>OPEN PRD <span>↗</span></button>
              </div>
              <div className="metric-row">
                {study.metrics.map((metric) => <div key={metric.label}><small>{metric.source}</small><b>{metric.value}</b><span>{metric.label}</span></div>)}
              </div>
              <div className="scope-rail">
                <div><span>MY ROLE</span><p>{study.scope.role}</p></div>
                <div><span>{study.stakeholderLabel}</span><p>{study.scope.collaborators}</p></div>
                <div><span>EVIDENCE TYPE</span><p>{study.scope.evidence}</p></div>
              </div>
              <div className="decision-grid">
                <div><span>THE OPERATING RISK</span><p>{study.context}</p></div>
                <div className="decision-cell"><span>{study.decisionLabel}</span><p>{study.decision}</p></div>
                <div><span>THE TRADE-OFF</span><p>{study.constraint}</p></div>
                <div className="evidence-cell"><span>{study.outcomeLabel}</span><p>{study.outcome}</p></div>
              </div>
              <div className="launch-bar">
                <div><span>CRITICAL DEPENDENCY</span><p>{study.dependency}</p></div>
                <div><span>LAUNCH GATE</span><p>{study.gate}</p></div>
              </div>
              <details className="technical-details">
                <summary><b>INSPECT SYSTEM + EVIDENCE</b><span>Architecture · benchmark · trade-off ↘</span></summary>
                <div className="technical-details-body">
                  <FlowDiagram type={study.id} />
                  <Artifact id={study.id} />
                </div>
              </details>
              <div className="reflection"><span>WHAT I LEARNED / NEXT DECISION</span><p>{study.reflection}</p></div>
            </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="section-label"><span>03</span><p>Experience and education</p></div>
        <div className="experience-grid">
          <div className="education-card">
            <span className="panel-kicker">EDUCATION</span>
            <h2>Master of Engineering Management</h2>
            <p>Purdue University · May 2026</p>
            <div className="education-rule" />
            <h3>B.Tech, Mechanical Engineering</h3>
            <p>SASTRA University</p>
            <a href="./Gokul_Gopalakrishnan_Resume.pdf" className="primary-button" download>Download résumé <span>↓</span></a>
          </div>
          <div className="timeline">
            {timeline.map(([date, company, role, copy], index) => (
              <article className="timeline-item" key={company}>
                <span className="timeline-index">0{index + 1}</span>
                <div><time>{date}</time><h3>{company}</h3><b>{role}</b><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-builds section-shell" id="repositories">
        <div className="section-label"><span>04</span><p>Public build record</p></div>
        <div className="repo-intro">
          <div><span className="panel-kicker">PUBLIC CODE / GOKULG846</span><h2>Inspect the<br />implementation.</h2></div>
          <p>These repositories make the architecture, evaluation logic, data contracts, and quality gates inspectable beyond the narrative.</p>
        </div>
        <div className="repo-grid">
          {publicBuilds.map((repo, index) => (
            <a className="repo-card" href={repo.href} target="_blank" rel="noreferrer" key={repo.name}>
              <div className="repo-top"><span>0{index + 1} / {repo.type}</span><b>GITHUB ↗</b></div>
              <h3>{repo.name}</h3>
              <p>{repo.copy}</p>
              <div className="repo-proof"><span>{repo.proof}</span><b>{repo.signal}</b></div>
            </a>
          ))}
        </div>
        <a className="github-profile-link" href="https://github.com/gokulg846" target="_blank" rel="noreferrer">View all public repositories <span>github.com/gokulg846 ↗</span></a>
      </section>

      <section className="method section-shell" id="method">
        <div className="section-label"><span>05</span><p>From ambiguity to release</p></div>
        <div className="method-content">
          <p className="lead">I turn an uncertain product question into a measurable launch decision.</p>
          <div className="method-grid">
            {[
              ["Frame the risk", "Name the user consequence and the failure the system cannot afford to hide."],
              ["Establish evidence", "Define the benchmark, baseline, latency budget, or data contract before debating solutions."],
              ["Sequence dependencies", "Make interfaces, owners, accepted cost, and rollback criteria visible across teams."],
              ["Enforce the gate", "Ship only when the agreed evidence passes—and revise the policy when new data changes the decision."],
            ].map(([title, copy], index) => (
              <article className="method-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="competencies section-shell">
        <div className="section-label"><span>06</span><p>Capability matrix</p></div>
        <div className="competency-head"><h2>Skills organized by<br />what they enable.</h2><p>Tools matter only when they help a team set a better requirement, identify a dependency, or make a higher-quality release decision.</p></div>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <article className="skill-card" key={skill.name}>
              <div><span>0{index + 1}</span><b>{skill.tag}</b></div><h3>{skill.name}</h3>
              <ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div><span>DATA SYSTEMS · AI/ML · ENGINEERING · PRODUCT JUDGMENT</span><h2>Make the evidence clear.<br />Then make the call.</h2></div>
        <a href="https://github.com/gokulg846" target="_blank" rel="noreferrer">Review the public build record <span>↗</span></a>
        <div className="footer-meta"><span>GOKUL GOPALAKRISHNAN © 2026</span><span>DATA / ML × PHYSICAL SYSTEMS</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      <button
        type="button"
        className={activeCase ? "drawer-backdrop active" : "drawer-backdrop"}
        onClick={() => setActiveCase(null)}
        aria-label="Close case study"
        tabIndex={activeCase ? 0 : -1}
      />
      <aside className={activeCase ? "prd-drawer active" : "prd-drawer"} aria-hidden={!activeCase} aria-label="Product requirements document">
        {activeCase && (
          <>
            <div className="drawer-head">
              <div><span>TECHNICAL PRODUCT REQUIREMENTS / {activeCase.index}</span><h2>{activeCase.title}</h2></div>
              <button onClick={() => setActiveCase(null)} aria-label="Close PRD">CLOSE ×</button>
            </div>
            <div className="drawer-meta"><span>{activeCase.kind}</span><span>DOCUMENT · TECHNICAL PRODUCT REQUIREMENTS</span><span>VERSION · 1.0</span></div>
            <div className="drawer-body">
              {activeCase.id === "amr" && <div className="concept-alert"><b>CONCEPT CASE STUDY</b><p>This proposed system demonstrates edge-AI scoping. Performance and fleet values are targets or projections pending hardware validation, not work history.</p></div>}
              {activeCase.prd.map((section, index) => (
                <section className="prd-section" key={section.title}>
                  <span>0{index + 1}</span><div><h3>{section.title}</h3>{section.body && <p>{section.body}</p>}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</div>
                </section>
              ))}
            </div>
          </>
        )}
      </aside>
    </main>
  );
}
