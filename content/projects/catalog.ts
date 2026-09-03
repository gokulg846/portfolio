import type { ProjectCaseStudy } from "../types";
import { complianceArtifacts } from "./continuous-compliance-gate";
import { sensorArtifacts } from "./industrial-sensor-anomaly-detection";
import { manufacturingArtifacts } from "./manufacturing-quality-traceability";
import { waferArtifacts } from "./semiconductor-yield-analytics";
import { flightTrackerArtifacts } from "./real-time-cargo-flight-tracker";

export const projects: ProjectCaseStudy[] = [
  {
    slug: "real-time-cargo-flight-tracker",
    number: "01",
    category: "Cargo operations · event-driven product",
    title: "Real-Time Cargo Flight Tracker",
    cardTitle: "Follow selected cargo flights through a live event stream.",
    summary: "A public event-streaming prototype that filters FedEx and UPS flight states, routes them through Redpanda and FastAPI, and renders current positions on a React map.",
    audience: "Proposed user: a cargo operations coordinator maintaining awareness of active flights.",
    pain: "The product hypothesis is that repeatedly refreshing disconnected flight views makes it harder to locate the right flight and judge whether the information is current. This workflow has not yet been validated with users.",
    whatItDoes: "Polls OpenSky flight states, filters FDX and UPS callsigns, publishes records to Redpanda, forwards events over a FastAPI WebSocket, and renders flight markers in React and Leaflet.",
    job: "Proposed job: locate and inspect a cargo flight in a current shared view.",
    value: "A current shared view could reduce the effort required to monitor selected cargo flights; user value remains to be validated.",
    stage: "Public prototype · frontend build reproduced at fc0ea6f · end-to-end validation pending",
    decision: "Place a Kafka-compatible event broker between ingestion and presentation so source integration and browser delivery can evolve independently.",
    stack: ["Python", "OpenSky API", "Redpanda", "Kafka protocol", "FastAPI", "AsyncIO", "WebSockets", "React", "TypeScript", "Leaflet", "Docker Compose"],
    repository: "https://github.com/gokulg846/flight-tracker",
    limitations: [
      "Cargo operations coordinator is a proposed user, not a validated customer segment.",
      "The producer runs separately from Docker Compose, and the end-to-end flow has not been independently reproduced for this review.",
      "The current UI lacks search, freshness, stale-marker, reconnect, and multi-client broadcast behavior.",
      "No latency, reliability, scale, adoption, or operational-outcome metric has been established.",
    ],
    artifacts: flightTrackerArtifacts,
    placement: "flagship",
  },
  {
    slug: "manufacturing-quality-traceability",
    number: "04",
    category: "Manufacturing quality · data product",
    title: "Manufacturing Quality Traceability",
    cardTitle: "Trace a suspect part without hunting across four systems.",
    summary: "A local traceability product connecting dimensional inspection, process settings, torque audits, and supplier certificates in one investigation workflow.",
    audience: "Manufacturing quality engineers investigating a defect or containment event.",
    pain: "Before deciding what to contain, a quality engineer may need to assemble inspection, machine, torque, and supplier records by hand. Missing or mismatched traceability makes that investigation slower and less reliable.",
    whatItDoes: "Connects those four record types in one part-level investigation workflow, making the available evidence—and any traceability gaps—visible together.",
    job: "Inspect the available evidence connected to a suspect part without manually joining four source systems.",
    value: "Reduce investigation assembly time while making incomplete traceability visible before a containment decision.",
    stage: "Working local prototype · synthetic manufacturing data",
    decision: "Preserve source evidence first, then publish one tested part-level view instead of hiding the joins inside a dashboard.",
    stack: ["Python", "Prefect", "Parquet", "dbt", "DuckDB", "Streamlit"],
    repository: "https://github.com/gokulg846/Manufacturing-quality-traceabilty",
    limitations: [
      "The four source systems and their failure patterns are synthetic.",
      "The current interface supports investigation; it does not trigger or export a production containment action.",
      "Composite scores and thresholds have not been calibrated by a plant quality team.",
    ],
    artifacts: manufacturingArtifacts,
    placement: "flagship",
  },
  {
    slug: "industrial-sensor-anomaly-detection",
    number: "03",
    category: "Condition monitoring · applied ML",
    title: "Industrial Sensor Anomaly Detection",
    cardTitle: "Turn vibration data into a review queue reliability engineers can actually use.",
    summary: "A healthy-baseline anomaly-detection workflow for public bearing-vibration data with leakage-aware splits, calibrated thresholds, and an operator review interface.",
    audience: "Reliability engineers deciding which equipment signals deserve investigation.",
    pain: "Plants have abundant healthy sensor history but relatively few labeled failures. An anomaly detector that produces an uncontrolled stream of alerts creates more review work instead of helping.",
    whatItDoes: "Learns a healthy operating baseline from public bearing data, compares two detection approaches, calibrates the alert threshold to a false-positive budget, and presents flagged windows for human review.",
    job: "Prioritize abnormal vibration windows when healthy history is abundant and labeled failures are scarce.",
    value: "Increase failure coverage without overwhelming the reviewer with an uncontrolled false-alert burden.",
    stage: "Working ML prototype · public CWRU bearing data · evaluation reproduction required",
    decision: "Train on healthy history, split overlapping windows contiguously, and compare an interpretable feature detector with a raw-waveform autoencoder.",
    stack: ["Python", "NumPy", "Pandas", "SciPy", "scikit-learn", "TensorFlow/Keras", "Joblib", "Streamlit", "Matplotlib"],
    repository: "https://github.com/gokulg846/industry-sensor-anomaly-detection",
    limitations: [
      "The public CWRU dataset does not represent a live plant deployment or natural failure distribution.",
      "Homepage model metrics remain withheld until a pinned run and evaluation artifact are reproduced.",
      "The current dashboard is a review aid; maintenance decisions remain human-owned.",
    ],
    artifacts: sensorArtifacts,
    placement: "flagship",
  },
  {
    slug: "continuous-compliance-gate",
    number: "02",
    category: "Platform governance · deterministic automation",
    title: "Continuous Compliance Gate",
    cardTitle: "Catch container-policy violations before they reach release.",
    summary: "A deterministic policy-as-code service that inspects running containers for required labels and forbidden ports, then emits structured evidence and CI-compatible status.",
    audience: "Platform and release engineers responsible for applying container policy consistently.",
    pain: "Required ownership labels and exposed-port rules are easy to miss when policy lives in documentation and engineers check it manually.",
    whatItDoes: "Loads a versioned policy, inspects running containers, reports the exact violations found, and returns a CI-compatible status that a release workflow can act on.",
    job: "Detect specified policy violations consistently before release and retain evidence another system or reviewer can inspect.",
    value: "Move narrow governance checks earlier in delivery while making the rule, violation, and enforcement signal explicit.",
    stage: "Working CLI prototype · deterministic rules · controlled Docker demo",
    decision: "Keep policy outside the engine and fail invalid governance input before inspecting infrastructure.",
    stack: ["Python", "Docker SDK", "JSON", "CLI/daemon", "Docker Compose"],
    repository: "https://github.com/gokulg846/AI-Continuous-Compliance",
    limitations: [
      "Despite the repository name, the implemented system is deterministic and does not use AI.",
      "The rule library covers labels and exposed ports, not a complete container-security program.",
      "Exception ownership, signed policy distribution, CI rollout, and evidence retention are future product work.",
    ],
    artifacts: complianceArtifacts,
    placement: "flagship",
  },
  {
    slug: "semiconductor-yield-analytics",
    number: "05",
    category: "Semiconductor yield · product analytics",
    title: "Semiconductor Yield Analytics",
    cardTitle: "Give yield engineers the context behind a low-yield wafer.",
    summary: "A local analytics product linking die-test results, process telemetry, equipment history, and lot genealogy to wafer maps, SPC signals, yield trends, and failure Pareto views.",
    audience: "Yield engineers deciding where to begin an excursion investigation.",
    pain: "A yield alert shows that value was lost, but not which process step, chamber, lot, or spatial failure pattern deserves attention first.",
    whatItDoes: "Connects die-test results, process telemetry, equipment history, and lot genealogy through wafer maps, SPC signals, yield trends, and failure Pareto views.",
    job: "Connect a spatial yield pattern to process and equipment context before choosing the next engineering investigation.",
    value: "Shorten the path from alert to a prioritized hypothesis while reducing avoidable investigative detours.",
    stage: "Working local prototype · causally linked synthetic fab data",
    decision: "Generate linked process-to-yield storylines so the prototype can test an investigation workflow without pretending to discover causes in real fab data.",
    stack: ["Python", "Prefect", "Parquet", "dbt", "DuckDB", "Streamlit", "Plotly"],
    repository: "https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline",
    limitations: [
      "The fab, excursions, and physical relationships are synthetic and known in advance.",
      "The views support hypothesis formation; they do not prove physical causality.",
      "SPC limits and interpretations have not been validated by a production yield team.",
    ],
    artifacts: waferArtifacts,
    placement: "additional",
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

export const flagshipProjects = projects.filter((project) => project.placement === "flagship");
export const additionalProjects = projects.filter((project) => project.placement === "additional");

export const publicArtifacts = (project: ProjectCaseStudy) =>
  project.artifacts.filter((artifact) => artifact.visibility !== "private");
