"use client";

import { useEffect, useMemo, useState } from "react";

export const dynamic = "force-static";

type PrdSection = { title: string; body?: string; items?: string[] };
type CaseStudy = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  constraint: string;
  decision: string;
  outcome: string;
  reflection: string;
  metrics: { value: string; label: string }[];
  prd: PrdSection[];
};

const cases: CaseStudy[] = [
  {
    id: "ncr-bench",
    index: "01",
    eyebrow: "AI governance · RisingPhoenix.ai",
    title: "Scale the evaluator before scaling the agent",
    summary:
      "A release-gated benchmark for a LangGraph security-review system spanning OWASP, CIS, and ISO control mappings.",
    context:
      "The document pipeline generated evidence-backed security-review cartridges, but had no locked baseline for correctness, citation validity, or control-mapping reliability.",
    constraint:
      "A polished aggregate score could still hide one unsupported compliance claim. Scaling generation first would multiply review debt and weaken traceability.",
    decision:
      "Delay agent expansion by three weeks and ship NCR-Bench first: a versioned benchmark, node-level trace store, severity policy, and hard release gate for critical hallucinations.",
    outcome:
      "The benchmark established a 94.8% reliability baseline, reduced manual audit cycles by 80%, and recorded zero critical compliance hallucinations in production testing.",
    reflection:
      "Next, I would separate retrieval, mapping, and citation failure rates by control family so each regression routes to a specific owner instead of a single model-quality queue.",
    metrics: [
      { value: "94.8%", label: "output reliability" },
      { value: "−80%", label: "manual audit cycles" },
      { value: "0", label: "critical hallucinations" },
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
          "80% reduction in manual audit cycles.",
          "Zero critical compliance hallucinations in production testing.",
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
    eyebrow: "Computer vision · inspection layer",
    title: "Tune the gate to operational cost, not model confidence",
    summary:
      "An edge inspection system combining ConvNeXt-Tiny classification with spatial yield-anomaly analysis.",
    context:
      "PCB solder-joint images and wafer-coordinate data needed one decision layer that could classify defects, route uncertainty, and expose spatial patterns.",
    constraint:
      "The cost of an escaped critical defect exceeded the cost of re-inspection. One global accuracy score could not express that asymmetry.",
    decision:
      "Set the critical-path recall floor at 0.94 and route the uncertainty band to human review, accepting a four-point increase in re-inspection load to preserve zero critical leakage on the locked validation gate.",
    outcome:
      "The operating policy paired 99.2% defect detection with 12 ms edge inference and shortened spatial yield-analysis turnaround by 35%.",
    reflection:
      "I would add calibration and drift slices by camera, lighting condition, and defect class before allowing a threshold policy to transfer across inspection stations.",
    metrics: [
      { value: "99.2%", label: "defect detection" },
      { value: "12 ms", label: "edge inference" },
      { value: "−35%", label: "analysis turnaround" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "A ConvNeXt-Tiny classifier assessed solder-joint imagery while a spatial workflow identified wafer-level anomalies. The product needed a versioned threshold policy because escaped-defect cost and false-reject cost were not symmetric.",
      },
      {
        title: "Target personas",
        items: [
          "Inspection operator — pass, review, or block with a region and reason code.",
          "Yield analyst — spatial clusters joined to coordinates and inspection metadata.",
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
          "Keep edge inference ≤15 ms; measured release result is 12 ms.",
          "Default to review on model, image-quality, or resource failure—never automatic pass.",
        ],
      },
      {
        title: "Technical architecture & data flow",
        body: "Camera → image-quality checks → preprocessing → ConvNeXt-Tiny edge inference → calibrated scores → threshold gate → pass / HITL review / block → decision store. Inspection events join x/y coordinates for spatial clustering and yield views; reviewer corrections enter a governed label queue.",
      },
      {
        title: "Failure modes & edge cases",
        items: [
          "Blur, glare, or occlusion triggers recapture or review.",
          "New defect appearance and camera drift trigger distribution alerts and disable low-confidence automatic passes.",
          "Threshold changes require offline replay against the locked set.",
          "Missing wafer coordinates retain classification but cannot support spatial claims.",
        ],
      },
      {
        title: "Success metrics",
        items: [
          "99.2% defect detection on the production-gate benchmark.",
          "Critical-path recall ≥0.94 with zero critical leakage on the locked release set.",
          "12 ms edge inference; 35% shorter yield-analysis turnaround.",
          "+4 percentage points manual re-inspection load accepted at the chosen operating point.",
        ],
      },
      {
        title: "Go / no-go launch gates",
        items: [
          "GO: critical recall ≥0.94, zero critical leakage, and inference ≤15 ms under representative load.",
          "GO: review demand remains within the staffed four-point increase.",
          "NO-GO: invalid images can auto-pass, threshold updates bypass replay, or drift monitoring is unavailable.",
        ],
      },
    ],
  },
  {
    id: "telemetry",
    index: "03",
    eyebrow: "Streaming systems · connected fleets",
    title: "Spend bandwidth when the physical state changes",
    summary:
      "A device-keyed telemetry path for high-frequency sensor streams, real-time fleet state, and failure-aware replay.",
    context:
      "Connected hardware needed live state and map updates across a high-throughput event bus, drawing on IIoT streaming experience at 10,000+ sensor scale.",
    constraint:
      "Sending every signal at 100 Hz preserved motion detail but consumed the edge transmission budget while devices sat idle.",
    decision:
      "Move sampling policy to the edge: 100 Hz during acceleration, turning, braking, or obstacle events; 1 Hz after five stable seconds. Sequence IDs preserve replay and packet-gap detection.",
    outcome:
      "The architecture sustains 10,000+ messages per second with sub-50 ms visualization latency while the representative sampling model cuts bandwidth by 60%.",
    reflection:
      "Next, I would tune state triggers per device class and make the cost of missed transitions visible beside bandwidth savings in the release dashboard.",
    metrics: [
      { value: "10k+", label: "messages / second" },
      { value: "<50 ms", label: "map latency" },
      { value: "−60%", label: "edge bandwidth" },
    ],
    prd: [
      {
        title: "Problem statement",
        body: "Fleet operators needed current device state without paying to transmit idle signals at dynamic-state frequency. The product had to preserve transition fidelity, schema evolution, replay safety, and stale-data visibility at more than 10,000 messages per second.",
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
          "Sustain 10,000+ messages/second and keep ingest-to-view latency below 50 ms.",
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
          "10,000+ messages/second sustained throughput.",
          "<50 ms end-to-end visualization latency.",
          "60% edge-bandwidth reduction versus fixed 100 Hz transmission.",
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
    eyebrow: "Concept study · AMR edge AI",
    title: "Keep the stop path local; send the map global",
    summary:
      "A proposed Jetson AGX Orin and ROS 2 architecture that separates probabilistic task intent from deterministic motion safety.",
    context:
      "Warehouse AMRs need camera, depth, LiDAR, odometry, and semantic task context under a bounded edge compute and thermal envelope.",
    constraint:
      "Network availability and VLA inference time are not deterministic enough for dynamic obstacle response. GPU contention could also delay the safety-perception loop.",
    decision:
      "Keep perception, fusion, time-to-collision, and emergency stopping on-robot. Offload static map optimization and fleet scheduling. Constrain VLA output to validated semantic actions with no motor interface.",
    outcome:
      "Design targets are ≤22 ms p95 perception, 99.99% stop-request reliability, ≥20% GPU headroom, and an 18% projected mission-time improvement—pending target-hardware validation.",
    reflection:
      "After a pilot, I would compare the measurable value of VLA task planning with its compute cost and reduce its on-robot role if deterministic task templates cover most workflows.",
    metrics: [
      { value: "≤22 ms", label: "p95 target" },
      { value: "99.99%", label: "stop target" },
      { value: "+18%", label: "efficiency projection" },
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
  ["Jul 2026 — present", "RisingPhoenix.ai", "AI Product Engineer Intern", "Scoped the evaluation gate, traceability, and release policy for an AI-native governance pipeline."],
  ["Feb 2025 — Jan 2026", "Cummins", "Product Engineer Co-op", "Connected physical-system data to engineering decisions through structured analysis and technical dependency ownership."],
  ["Aug 2023 — Dec 2023", "Purdue–Bayer Innovation", "Data Science Consultant", "Translated an applied data-science problem into an evaluation plan, analytical workflow, and decision artifact."],
  ["Jul 2021 — Jul 2023", "Accenture", "Analyst, Data & Analytics", "Built and operated IIoT streaming and predictive-maintenance workflows across 10,000+ sensors."],
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
      { label: "HITL review", sub: "+4 pp load" },
      { label: "Yield analytics", sub: "spatial anomaly map" },
    ],
    telemetry: [
      { label: "10,000+ sensors", sub: "position · temp · vibration" },
      { label: "Edge collector", sub: "schema · sequence · spool" },
      { label: "Adaptive sampler", sub: "dynamic 100 Hz · idle 1 Hz" },
      { label: "Redpanda / Kafka", sub: "device-keyed partitions" },
      { label: "FastAPI consumer", sub: "enrich · aggregate" },
      { label: "Leaflet map", sub: "<50 ms live state" },
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
    ["Evidence fidelity", 96.4],
    ["Control mapping", 95.8],
    ["Citation coverage", 93.6],
    ["Hallucination safety", 92.2],
  ] as const;

  return (
    <div className="artifact-panel eval-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">Representative benchmark snapshot</span><h4>NCR-Bench / release 1.4</h4></div>
        <span className="status-pass">ALL GATES PASS</span>
      </div>
      <div className="eval-layout">
        <div className="score-orbit"><span>94.8</span><small>weighted reliability</small></div>
        <div className="score-bars">
          {dimensions.map(([label, value]) => (
            <div className="score-row" key={label}>
              <div><span>{label}</span><b>{value}%</b></div>
              <div className="bar-track"><i style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="gate-grid">
        <span><b>0</b> critical hallucinations</span>
        <span><b>9.8s</b> p95 / ≤12s gate</span>
        <span><b>15m</b> audit / 75m baseline</span>
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
        <div><span className="panel-kicker">Operating-point simulator</span><h4>Recall has an operating cost</h4></div>
        <span className="data-cohort">n = 5,000</span>
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
        <span className="decision-marker">SELECTED POLICY</span>
        <p>0.94 recall accepts +4 pp re-inspection versus the prior 7% queue. Critical subset leakage remains zero on the locked gate.</p>
      </div>
      <p className="fine-print">Interactive matrix uses a mixed-severity validation cohort; the 99.2% headline is a separate production-gate benchmark.</p>
    </div>
  );
}

function SamplingLab() {
  const segments = [
    ["Idle", 30, false], ["Acceleration", 12, true], ["Idle", 22, false], ["Turn / obstacle", 20, true], ["Idle", 9, false], ["Braking", 7, true],
  ] as const;
  return (
    <div className="artifact-panel sampling-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">60-second trip · 320 bytes / event</span><h4>Adaptive transmission model</h4></div>
        <span className="status-pass">−60.1% DATA</span>
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
      <p className="fine-print">Dynamic trigger: |Δvelocity| &gt; 0.4 m/s², heading &gt; 12°/s, or obstacle alert. Return to idle after five stable seconds.</p>
    </div>
  );
}

function AmrTable() {
  const rows = [
    ["Economy", "640×360", "60", "28 W", "95.5%", "Small-obstacle miss risk"],
    ["Balanced", "960×540", "45", "38 W", "97.8%", "Selected"],
    ["High fidelity", "1280×720", "30", "52 W", "98.8%", "Low latency margin"],
    ["Max detail", "1920×1080", "18", "72 W", "99.3%", "Fails 25 ms SLA"],
  ];
  return (
    <div className="artifact-panel table-panel">
      <div className="panel-title">
        <div><span className="panel-kicker">Proposed targets · prototype validation required</span><h4>Resolution / latency / power envelope</h4></div>
        <span className="concept-badge">CONCEPT</span>
      </div>
      <div className="responsive-table">
        <table>
          <thead><tr><th>Mode</th><th>Input</th><th>FPS</th><th>Power</th><th>Recall</th><th>Decision</th></tr></thead>
          <tbody>{rows.map((row, index) => <tr className={index === 1 ? "selected-row" : ""} key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="fine-print">Balanced mode reserves 22 W of a 60 W envelope for sensor fusion, planning, and ROS 2 overhead.</p>
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
        <a className="wordmark" href="#top" aria-label="Gokul Gopalakrishnan home">GG<span>/</span>SYS</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>Method</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a className="nav-cta" href="https://github.com/gokulg846" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta">
          <span>AI PM / TPM / PRODUCT ENGINEER</span>
          <span>DATA · ML · ROBOTICS · EDGE</span>
          <span>PURDUE MEM · MAY 2026</span>
        </div>
        <div className="hero-grid">
          <div>
            <p className="hero-kicker"><i /> SYSTEMS JUDGMENT FOR AI IN THE PHYSICAL WORLD</p>
            <h1>I work where<br /><em>models meet</em><br />physical systems.</h1>
          </div>
          <div className="hero-copy">
            <p>I operate at the seam between data/ML systems and physical hardware—training and evaluating models against real sensor and telemetry data, then making the product calls about what is trustworthy and efficient enough to deploy into production.</p>
            <div className="hero-actions">
              <a href="#work" className="primary-button">Examine the decisions <span>↓</span></a>
              <a href="#experience" className="text-link">Career signal →</a>
            </div>
          </div>
        </div>
        <div className="thesis-strip">
          <span>01 / THESIS</span>
          <p>The next generation of PM and TPM leadership sits where AI systems meet physical reality: robotics, semiconductors, and edge sensor networks. That work requires equal fluency in model evaluation and system constraints.</p>
        </div>
      </header>

      <section className="method section-shell" id="method">
        <div className="section-label"><span>02</span><p>Operating method</p></div>
        <div className="method-content">
          <p className="lead">I use AI to collapse the distance between a product question and a testable technical artifact.</p>
          <div className="method-grid">
            {[
              ["Frame", "Translate user risk into an API contract, latency budget, benchmark, or launch gate."],
              ["Prototype", "Use Cursor and Claude Code to test system boundaries before committing an engineering sprint."],
              ["Pressure-test", "Generate synthetic edge cases, replay failure paths, and probe PRD boundary conditions."],
              ["Commit", "Lock requirements only after the tradeoff and its operational cost are visible to every owner."],
            ].map(([title, copy], index) => (
              <article className="method-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-label"><span>03</span><p>Selected product decisions</p></div>
        <div className="work-intro">
          <h2>Four systems.<br />One operating principle.</h2>
          <p>Make the constraint measurable, put the risky decision behind a gate, and show the accepted cost—not just the output.</p>
        </div>
        <div className="case-stack">
          {cases.map((study) => (
            <article className="case-study" id={study.id} key={study.id}>
              <div className="case-head">
                <div className="case-number">{study.index}</div>
                <div className="case-title">
                  <span>{study.eyebrow}</span><h3>{study.title}</h3><p>{study.summary}</p>
                </div>
                <button className="prd-button" onClick={() => setActiveCase(study)} aria-label={`Open PRD for ${study.title}`}>OPEN PRD <span>↗</span></button>
              </div>
              <div className="metric-row">
                {study.metrics.map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}
              </div>
              <div className="decision-grid">
                <div><span>CONTEXT</span><p>{study.context}</p></div>
                <div><span>CONSTRAINT</span><p>{study.constraint}</p></div>
                <div className="decision-cell"><span>PRODUCT CALL</span><p>{study.decision}</p></div>
                <div><span>OUTCOME</span><p>{study.outcome}</p></div>
              </div>
              <FlowDiagram type={study.id} />
              <Artifact id={study.id} />
              <div className="reflection"><span>WHAT I’D DO DIFFERENTLY</span><p>{study.reflection}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-builds section-shell" id="repositories">
        <div className="section-label"><span>04</span><p>Verified public builds</p></div>
        <div className="repo-intro">
          <div><span className="panel-kicker">CURATED FROM GITHUB / GOKULG846</span><h2>Code behind the<br />systems judgment.</h2></div>
          <p>I feature repositories only when the code, architecture, evaluation logic, or data-quality gates add evidence beyond the case-study narrative.</p>
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

      <section className="competencies section-shell">
        <div className="section-label"><span>05</span><p>Capability matrix</p></div>
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

      <section className="experience section-shell" id="experience">
        <div className="section-label"><span>06</span><p>Experience signal</p></div>
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

      <footer>
        <div><span>AVAILABLE FOR APM · AI PM · TPM ROLES</span><h2>Let’s make the system<br />boundary explicit.</h2></div>
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
            <div className="drawer-meta"><span>STATUS · CASE STUDY</span><span>OWNER · PRODUCT / PROGRAM</span><span>VERSION · 1.0</span></div>
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
