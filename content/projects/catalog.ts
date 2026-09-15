import type { ProjectCaseStudy } from "../types";
import { defineProject, isPublic } from "../define";
import { artifactJourney } from "../site";
import { complianceArtifacts } from "./continuous-compliance-gate";
import { sensorArtifacts } from "./industrial-sensor-anomaly-detection";
import { manufacturingArtifacts } from "./manufacturing-quality-traceability";
import { waferArtifacts } from "./semiconductor-yield-analytics";
import { flightTrackerArtifacts } from "./real-time-cargo-flight-tracker";

// Add, reorder, hide, or promote project records here. See update_instructions.md.
const allProjects: ProjectCaseStudy[] = [
  defineProject({
    slug: "real-time-cargo-flight-tracker",
    number: "01",
    category: "Cargo operations · event-driven product",
    title: "Real-Time Cargo Flight Tracker",
    cardTitle: "Follow selected cargo flights through a live event stream.",
    summary: "A live map that filters OpenSky records by FDX and UPS callsign prefixes, then streams their positions through Redpanda and FastAPI into a React interface.",
    audience: "Target user: cargo operations coordinator monitoring active flights.",
    pain: "User hypothesis: cargo coordinators move between public flight views and refresh them manually, which makes flight lookup and data freshness harder to judge. User research remains open.",
    whatItDoes: "Polls OpenSky flight states, filters FDX and UPS callsigns, publishes records to Redpanda, forwards events over a FastAPI WebSocket, and renders flight markers in React and Leaflet.",
    job: "Locate a selected cargo flight and understand the freshness of its latest position.",
    value: "Reduce the time and uncertainty involved in monitoring selected cargo flights. This requires user validation.",
    stage: "Public prototype · frontend build reproduced at fc0ea6f · end-to-end validation pending",
    decision: "Place a Kafka-compatible event broker between ingestion and presentation so source integration and browser delivery can evolve independently.",
    stack: ["Python", "OpenSky API", "Redpanda", "Kafka protocol", "FastAPI", "AsyncIO", "WebSockets", "React", "TypeScript", "Leaflet", "Docker Compose"],
    repository: "https://github.com/gokulg846/flight-tracker",
    limitations: [
      "User interviews with cargo operations teams remain open.",
      "The frontend build is verified at fc0ea6f; end-to-end reproduction remains open.",
      "The next product scope includes search, freshness, reconnect, and multi-client broadcast.",
      "Latency, reliability, scale, adoption, and operational impact require measurement.",
    ],
    artifacts: flightTrackerArtifacts,
    placement: "flagship",
    visibility: "public",
  }),
  defineProject({
    slug: "manufacturing-quality-traceability",
    number: "04",
    category: "Manufacturing quality · data product",
    title: "Manufacturing Quality Traceability",
    cardTitle: "Trace a suspect part across four connected systems.",
    summary: "A traceability tool that brings inspection, process, torque, and supplier records into one part-level investigation.",
    audience: "Manufacturing quality engineers investigating a defect or containment event.",
    pain: "Product hypothesis: quality engineers assemble records from several systems before they can scope a containment investigation. Missing identifiers and records add delay and uncertainty.",
    whatItDoes: "Connects four record types in one part-level view and surfaces traceability gaps alongside the available evidence.",
    job: "Review the evidence associated with a suspect part across four source systems.",
    value: "Reduce investigation assembly time while making incomplete traceability visible before a containment decision.",
    stage: "Working local prototype · synthetic manufacturing data",
    decision: "Preserve source-level evidence and expose every join in a tested part-level view.",
    stack: ["Python", "Prefect", "Parquet", "dbt", "DuckDB", "Streamlit"],
    repository: "https://github.com/gokulg846/Manufacturing-quality-traceabilty",
    limitations: [
      "The prototype uses synthetic manufacturing records and failure patterns.",
      "Containment decisions and exports remain with the production quality process.",
      "A plant quality team must calibrate composite scores and thresholds.",
    ],
    artifacts: manufacturingArtifacts,
    placement: "flagship",
    visibility: "public",
  }),
  defineProject({
    slug: "industrial-sensor-anomaly-detection",
    number: "03",
    category: "Condition monitoring · applied ML",
    title: "Industrial Sensor Anomaly Detection",
    cardTitle: "Turn vibration data into a review queue reliability engineers can actually use.",
    summary: "An ML review tool that learns a healthy bearing baseline, flags unusual vibration windows, and lets reliability engineers inspect alert sensitivity.",
    audience: "Reliability engineers deciding which equipment signals deserve investigation.",
    pain: "Reliability teams often have extensive healthy history and few labeled failures. The product must surface useful anomalies within a review queue the team can manage.",
    whatItDoes: "Learns a healthy operating baseline from public bearing data, compares two detection approaches, calibrates the alert threshold to a false-positive budget, and presents flagged windows for human review.",
    job: "Prioritize abnormal vibration windows when healthy history is abundant and labeled failures are scarce.",
    value: "Surface more relevant anomalies while keeping alert volume within reviewer capacity.",
    stage: "Working ML prototype · public CWRU bearing data · evaluation reproduction required",
    decision: "Train on healthy history, split overlapping windows contiguously, and compare an interpretable feature detector with a raw-waveform autoencoder.",
    stack: ["Python", "NumPy", "Pandas", "SciPy", "scikit-learn", "TensorFlow/Keras", "Joblib", "Streamlit", "Matplotlib"],
    repository: "https://github.com/gokulg846/industry-sensor-anomaly-detection",
    limitations: [
      "The prototype uses public CWRU laboratory data; plant performance requires separate validation.",
      "Model metrics will follow a pinned reproduction run.",
      "Reliability engineers retain diagnosis and maintenance decisions.",
    ],
    artifacts: sensorArtifacts,
    placement: "flagship",
    visibility: "public",
  }),
  defineProject({
    slug: "continuous-compliance-gate",
    number: "02",
    category: "Platform governance · deterministic automation",
    title: "Continuous Compliance Gate",
    cardTitle: "Catch container-policy violations before they reach release.",
    summary: "A rules-based service that checks containers for missing labels and forbidden ports, then returns a readable report and CI exit code.",
    audience: "Platform and release engineers responsible for applying container policy consistently.",
    pain: "Required ownership labels and exposed-port rules are easy to miss when policy lives in documentation and engineers check it manually.",
    whatItDoes: "Loads a versioned policy, inspects running containers, reports the exact violations found, and returns a CI-compatible status that a release workflow can act on.",
    job: "Detect specified policy violations consistently before release and retain evidence another system or reviewer can inspect.",
    value: "Catch narrow policy violations earlier and give reviewers a clear rule, finding, and next action.",
    stage: "Working CLI prototype · deterministic rules · controlled Docker demo",
    decision: "Keep policy outside the engine and fail invalid governance input before inspecting infrastructure.",
    stack: ["Python", "Docker SDK", "JSON", "CLI/daemon", "Docker Compose"],
    repository: "https://github.com/gokulg846/AI-Continuous-Compliance",
    limitations: [
      "The repository name includes AI; this version uses deterministic rules.",
      "Current coverage is limited to labels and exposed ports.",
      "A production rollout requires exception ownership, signed policies, CI integration, and evidence retention.",
    ],
    artifacts: complianceArtifacts,
    placement: "flagship",
    visibility: "public",
  }),
  defineProject({
    slug: "semiconductor-yield-analytics",
    number: "05",
    category: "Semiconductor yield · product analytics",
    title: "Semiconductor Yield Analytics",
    cardTitle: "Give yield engineers the context behind a low-yield wafer.",
    summary: "A wafer-investigation dashboard that connects yield loss to spatial patterns, process conditions, equipment history, and lot genealogy.",
    audience: "Yield engineers deciding where to begin an excursion investigation.",
    pain: "A low-yield wafer reveals the loss. Yield engineers still need to connect its spatial pattern to process, chamber, and lot history before choosing an investigation.",
    whatItDoes: "Connects die-test results, process telemetry, equipment history, and lot genealogy through wafer maps, SPC signals, yield trends, and failure Pareto views.",
    job: "Connect a spatial yield pattern to process and equipment context before choosing the next engineering investigation.",
    value: "Shorten the path from alert to a prioritized hypothesis while reducing avoidable investigative detours.",
    stage: "Working local prototype · causally linked synthetic fab data",
    decision: "Seed linked process and chamber conditions so each synthetic excursion supports a traceable investigation path.",
    stack: ["Python", "Prefect", "Parquet", "dbt", "DuckDB", "Streamlit", "Plotly"],
    repository: "https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline",
    limitations: [
      "All fab data and physical relationships are synthetic and known in advance.",
      "The product prioritizes hypotheses; physical causality requires domain validation.",
      "A production yield team must validate SPC limits and interpretation.",
    ],
    artifacts: waferArtifacts,
    placement: "additional",
    visibility: "public",
  }),
];

export const projects = allProjects
  .filter(isPublic)
  .sort((left, right) => left.number.localeCompare(right.number));

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

export const flagshipProjects = projects.filter((project) => project.placement === "flagship");
export const additionalProjects = projects.filter((project) => project.placement === "additional");

const artifactOrder = artifactJourney.flatMap((step) => step.slugs);

export const publicArtifacts = (project: ProjectCaseStudy) =>
  project.artifacts
    .filter((artifact) => artifact.visibility !== "private")
    .sort((left, right) => {
      const leftIndex = artifactOrder.findIndex((slug) => slug === left.slug);
      const rightIndex = artifactOrder.findIndex((slug) => slug === right.slug);
      return (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex)
        - (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex);
    });
