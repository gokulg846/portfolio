import type { ProjectArtifact } from "../../types";

export const sensorArtifacts: ProjectArtifact[] = [
  {
    slug: "prd",
    label: "AI / ML PRODUCT DEFINITION",
    title: "AI/ML Product Requirements Document",
    summary: "Frames anomaly detection as a human review product, with an explicit false-alert budget, human-owned decisions, and no production-performance claim.",
    sections: [
      {
        title: "Product decision",
        state: "Current build",
        body: ["Build a review-support workflow for scarce-label condition monitoring. The system ranks unusual vibration windows for inspection; it does not recommend maintenance, predict remaining life, or stop equipment."],
        table: { headers: ["Decision", "Definition"], rows: [
          ["Primary user", "Reliability engineer reviewing equipment-condition data"],
          ["Job to be done", "Find the small set of vibration windows that deserve closer inspection"],
          ["Value hypothesis", "Increase review coverage without creating an uncontrolled false-alert burden"],
          ["Current stage", "Working prototype using public CWRU bearing data"],
        ] },
      },
      {
        title: "Why ML—and where it stops",
        state: "Design target",
        body: ["Healthy operating history is abundant while labeled failures are limited. Unsupervised and reconstruction-based approaches can learn a healthy baseline and rank deviations without requiring failure examples during training."],
        bullets: [
          "ML ranks windows; a reliability engineer owns the investigation and maintenance decision.",
          "The product must expose scores, thresholds, and source windows rather than only a binary alarm.",
          "A more complex model is not assumed to be better; useful detection must be balanced against review burden, latency, and reproducibility.",
        ],
      },
      {
        title: "Implemented MVP",
        state: "Current build",
        bullets: [
          "Download and register 13 public CWRU vibration recordings.",
          "Create 1,024-sample windows with 50% overlap.",
          "Engineer RMS, peak, crest factor, kurtosis, and skewness.",
          "Train an Isolation Forest and an LSTM autoencoder on healthy windows only.",
          "Split normal recordings contiguously with boundary gaps to reduce overlap leakage.",
          "Calibrate each threshold to a provisional 0.5% validation false-positive budget.",
          "Review flags, scores, threshold sensitivity, and labeled sample metrics in Streamlit.",
        ],
      },
      {
        title: "Goals and non-goals",
        state: "Current build",
        table: { headers: ["Goals", "Non-goals"], rows: [
          ["Prioritize review and make alert burden explicit", "Autonomous shutdown, work-order creation, or maintenance recommendation"],
          ["Preserve leakage-aware evaluation", "Remaining-useful-life prediction"],
          ["Compare interpretable and deep alternatives", "Assume the LSTM wins because it is more complex"],
          ["Make flagged windows inspectable", "Generalize beyond CWRU or claim plant savings"],
        ] },
      },
      {
        title: "Success metric tree",
        state: "Proposed next step",
        table: { headers: ["Layer", "Measure", "Evidence required"], rows: [
          ["User", "Time to inspect and disposition a flagged window", "Observed reviewer task"],
          ["Workflow", "Alerts per 1,000 windows and review queue completion", "Pinned evaluation and usability session"],
          ["Model", "Recall at the fixed validation false-positive policy", "Held-out test manifest"],
          ["Model", "Performance by recording, condition, load, and severity", "Slice report with sufficient sample context"],
          ["System", "Scoring latency and artifact footprint", "Timed pinned run"],
          ["Guardrail", "No autonomous maintenance recommendation", "UI and operating policy review"],
        ] },
      },
      {
        title: "Human review and fallback",
        state: "Design target",
        body: ["A flag means ‘inspect this window,’ not ‘this asset will fail.’ If the model artifact is unavailable, the current app can fit an exploratory detector to uploaded data, but that fallback is not equivalent to the calibrated trained path and must be labeled clearly. Production fallback remains the existing reliability workflow."],
      },
    ],
  },
  {
    slug: "technical-design",
    label: "TECHNICAL JUDGMENT",
    title: "ML System Design",
    summary: "Documents ingestion, leakage controls, feature and waveform paths, threshold calibration, persistence, review UI, and production monitoring considerations.",
    sections: [
      {
        title: "System architecture",
        state: "Current build",
        code: "13 CWRU recordings\n        ↓\n1,024-sample windows · 512-sample hop\n        ↓\nContiguous train / validation / test split with boundary gaps\n        ↓\n┌────────────────────────┬──────────────────────────┐\n│ five condition features│ raw waveform windows     │\n│ Isolation Forest       │ LSTM autoencoder         │\n└────────────────────────┴──────────────────────────┘\n        ↓\nvalidation threshold calibration · 0.5% provisional FPR budget\n        ↓\nflagged-window review in Streamlit",
      },
      {
        title: "Data and leakage controls",
        state: "Current build",
        bullets: [
          "Drive-end accelerometer signals are downloaded from the public CWRU Bearing Data Center.",
          "Fifty-percent-overlapping windows create near-neighbor dependence; random splitting would leak highly similar windows across sets.",
          "Normal windows are split contiguously within each recording, and boundary windows are dropped between segments.",
          "Fault windows remain test-only so neither detector sees fault examples during training.",
        ],
      },
      {
        title: "Candidate models",
        state: "Current build",
        table: { headers: ["Path", "Input", "Product tradeoff"], rows: [
          ["Isolation Forest", "Five engineered condition features", "More interpretable, lighter runtime, may miss waveform detail"],
          ["LSTM autoencoder", "Raw 1,024-sample windows reshaped to 64 × 16", "Richer temporal representation, higher complexity and runtime cost"],
          ["Threshold policy", "99.5th percentile of healthy validation scores", "Makes provisional alert burden explicit but still requires user validation"],
        ] },
      },
      {
        title: "Persistence and review path",
        state: "Current build",
        bullets: [
          "The Isolation Forest scaler, model, threshold, and feature contract are persisted with Joblib.",
          "The LSTM model and threshold metadata are persisted separately.",
          "The Streamlit app avoids importing TensorFlow for the lightweight review path.",
          "A reviewer can use the bundled labeled CSV, inspect anomaly counts, feature traces, score traces, and sensitivity changes.",
        ],
      },
      {
        title: "Stack rationale",
        state: "Current build",
        table: { headers: ["Technology", "Role"], rows: [
          ["NumPy / Pandas / SciPy", "Signal arrays, feature tables, and statistical feature extraction"],
          ["scikit-learn", "Scaling, Isolation Forest, and evaluation metrics"],
          ["TensorFlow / Keras", "LSTM autoencoder training and persistence"],
          ["Joblib", "Lightweight detector artifact"],
          ["Streamlit / Matplotlib", "Operator-facing review and threshold visualization"],
        ] },
      },
      {
        title: "Production monitoring design",
        state: "Proposed next step",
        bullets: [
          "Monitor input sampling rate, missingness, amplitude distribution, operating condition, and score drift.",
          "Track alerts per asset-hour, reviewer dispositions, false-alert feedback, latency, and artifact version.",
          "Require approval and replay evaluation before threshold or model changes.",
          "Separate monitoring failure from a healthy-equipment conclusion.",
        ],
      },
    ],
  },
  {
    slug: "evaluation",
    label: "AI / ML VALIDATION",
    title: "Reproducible Evaluation Protocol",
    summary: "Specifies the pinned run, baselines, slices, error analysis, runtime evidence, and publication gate required before any model-quality metric appears on the homepage.",
    sections: [
      {
        title: "Publication gate",
        state: "Proposed next step",
        body: ["No precision, recall, F1, latency, or model-comparison claim is published on the portfolio homepage until a clean run is tied to a public commit, environment, dataset registry, configuration, split manifest, and saved metrics artifact."],
      },
      {
        title: "Run manifest",
        state: "Proposed next step",
        table: { headers: ["Required field", "Purpose"], rows: [
          ["Repository commit and run date", "Tie the result to inspectable code"],
          ["Python and dependency versions", "Expose runtime variability"],
          ["Dataset file registry and hashes", "Fix the evaluated population"],
          ["Window, hop, gap, and split indices", "Make leakage controls inspectable"],
          ["Random seeds and model parameters", "Support repeated runs"],
          ["Threshold source and quantile", "Separate calibration behavior from test results"],
        ] },
      },
      {
        title: "Baseline and candidates",
        state: "Proposed next step",
        bullets: [
          "Simple non-ML feature threshold, if implemented, to test whether model complexity is justified.",
          "Isolation Forest on the five implemented features.",
          "LSTM autoencoder on raw windows.",
          "No winner selected until useful detection, alert burden, latency, reproducibility, and complexity are compared together.",
        ],
      },
      {
        title: "Required results",
        state: "Proposed next step",
        table: { headers: ["Evidence", "Why it matters"], rows: [
          ["Precision, recall, F1, and confusion matrix", "Basic held-out behavior with class context"],
          ["Alerts per 1,000 windows", "Translate threshold behavior into review burden"],
          ["Results by recording, fault location, size, and load where available", "Expose important performance variation"],
          ["Repeated seeded runs", "Show stability rather than one favorable run"],
          ["True-positive, false-positive, and false-negative waveforms", "Make failure modes inspectable"],
          ["Training/scoring time and artifact size", "Support an operating decision, not only model quality"],
        ] },
      },
      {
        title: "Evaluation status",
        state: "Current build",
        body: ["The repository implements evaluation code and publishes result values in its README. This portfolio deliberately withholds those values until the full pinned-run protocol above is reproduced and stored. Implemented evaluation logic is not the same as independently verified model evidence."],
      },
    ],
  },
  {
    slug: "model-card",
    label: "RESPONSIBLE DELIVERY",
    title: "Model & Failure Card",
    summary: "Defines intended use, out-of-scope decisions, dataset limits, human oversight, known failure classes, and controls required before a pilot.",
    sections: [
      {
        title: "Intended and prohibited use",
        state: "Design target",
        table: { headers: ["Intended", "Out of scope"], rows: [
          ["Rank vibration windows for reliability-engineer review", "Predict remaining useful life or imminent failure probability"],
          ["Compare detector operating tradeoffs on public data", "Generalize to plant assets without recalibration and validation"],
          ["Support investigation with inspectable signals", "Trigger safety-critical control, shutdown, or maintenance automatically"],
        ] },
      },
      {
        title: "Data limitations",
        state: "Current build",
        bullets: [
          "CWRU faults were created under controlled laboratory conditions and do not represent natural plant prevalence.",
          "The current registry covers a narrow bearing, sensor, speed, and fault domain.",
          "Fault windows are labeled for evaluation but do not establish early-warning lead time in a live asset.",
          "Public benchmark performance cannot be converted into downtime, safety, or maintenance savings.",
        ],
      },
      {
        title: "Failure taxonomy",
        state: "Design target",
        table: { headers: ["Failure", "Current control", "Remaining control"], rows: [
          ["Overlap leakage", "Contiguous splits and boundary gaps", "Publish split manifest and automated leakage assertion"],
          ["Excessive false alerts", "Provisional 0.5% validation budget", "Validate alert burden with target reviewers"],
          ["Missed fault pattern", "No production claim", "Publish false negatives and slice behavior"],
          ["Domain shift", "Public-dataset disclosure", "Shadow-test new or authorized data before pilot"],
          ["Load/speed sensitivity", "No broad generalization claim", "Evaluate and calibrate by operating condition"],
          ["Operator overtrust", "Review-support language", "Keep action human-owned and display limitations in the UI"],
        ] },
      },
      {
        title: "Monitoring and versioning",
        state: "Proposed next step",
        bullets: [
          "Log model, feature-contract, threshold, and data-source versions with every score batch.",
          "Monitor score distribution, alert rate, reviewer disposition, latency, input shift, and missing data.",
          "Require frozen replay evaluation before promotion of a new artifact.",
          "Define threshold-change authority and a rollback artifact before any limited pilot.",
        ],
      },
    ],
  },
  {
    slug: "program-plan",
    label: "DELIVERY LEADERSHIP",
    title: "AI Delivery & Launch Plan",
    summary: "Sets evidence, usability, shadow-evaluation, and human-oversight gates before a limited condition-monitoring pilot.",
    sections: [
      {
        title: "Phased delivery",
        state: "Proposed next step",
        table: { headers: ["Phase", "Scope", "Exit gate"], rows: [
          ["0 · Prototype", "Current CWRU workflow", "Implemented code and limitations inspectable"],
          ["1 · Evidence release", "Pinned evaluation and failure examples", "Reproducible manifest and held-out report published"],
          ["2 · Usability validation", "3–5 engineering-adjacent reviewers", "Task completion, confusion, and review burden documented"],
          ["3 · Shadow evaluation", "New public or authorized data", "Alerts compared with known events or expert review without action"],
          ["4 · Limited pilot", "Human-reviewed workflow only", "Ownership, monitoring, rollback, and acceptable error costs approved"],
        ] },
      },
      {
        title: "Operating ownership",
        state: "Design target",
        table: { headers: ["Decision", "Accountable role"], rows: [
          ["Acceptable false-alert burden", "Reliability workflow owner"],
          ["Model and feature contract", "ML technical owner"],
          ["Threshold change", "Reliability owner with ML review"],
          ["Alert disposition", "Reliability engineer"],
          ["Pilot continuation or rollback", "Product owner and reliability owner"],
        ] },
      },
      {
        title: "Feedback loop",
        state: "Proposed next step",
        code: "flagged window → reviewer disposition → labeled example → error analysis → frozen evaluation update → model / threshold decision",
      },
      {
        title: "Launch readiness",
        state: "Proposed next step",
        bullets: [
          "Pinned evaluation and failure card published.",
          "Target reviewer can complete the investigation task without interpreting a flag as a diagnosis.",
          "Alert and system-failure ownership are named.",
          "Input, score, latency, and disposition telemetry are available.",
          "Rollback restores the prior reliability workflow and previous model artifact.",
        ],
      },
    ],
  },
  {
    slug: "recording-guide",
    label: "DEMO RUNBOOK",
    title: "Recording Guide",
    summary: "A product-focused recording path covering scarce labels, leakage control, review workflow, threshold tradeoffs, and evidence boundaries.",
    sections: [
      {
        title: "Setup",
        state: "Current build",
        body: ["Run from the bearing-anomaly-detection directory. The full training path downloads approximately 50 MB of public data and creates the persisted model artifacts used by the dashboard."],
        code: "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython models.py\nstreamlit run app.py",
      },
      {
        title: "60–90 second narrative",
        state: "Current build",
        table: { headers: ["Time", "Show", "Say"], rows: [
          ["0–10s", "Product title", "Reliability teams often have abundant healthy history and few labeled failures. This tool prioritizes windows for human review."],
          ["10–25s", "Windowing and split logic", "Overlapping windows are split contiguously with boundary gaps so near-duplicates do not inflate evaluation."],
          ["25–40s", "Two detector paths", "The prototype compares a five-feature Isolation Forest with a raw-waveform LSTM; complexity is not assumed to be better."],
          ["40–65s", "Bundled demo in Streamlit", "The reviewer sees flagged windows, anomaly scores, and the operating threshold rather than only a binary alarm."],
          ["65–80s", "Sensitivity slider", "Changing sensitivity makes the alert-burden tradeoff visible. The 0.5% validation budget is provisional, not a plant-approved requirement."],
          ["80–90s", "Repository and limitations", "The workflow is implemented on public bearing data; production validity and savings are not claimed."],
        ] },
      },
      {
        title: "Metric rule",
        state: "Proposed next step",
        body: ["Do not narrate the README’s model scores in the final recording until the pinned evaluation artifact is reproduced. If the dashboard displays metrics from the bundled labeled CSV, describe them only as results for that visible sample and model artifact."],
      },
    ],
  },
];
