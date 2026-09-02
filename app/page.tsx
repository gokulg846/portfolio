import Image from "next/image";

export const dynamic = "force-static";

type Build = {
  number: string;
  status: string;
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  owned: string;
  decision: string;
  delivered: string;
  evidence: { value: string; label: string; source: string }[];
  repo: string;
  brief?: string;
  note: string;
};

const builds: Build[] = [
  {
    number: "01",
    status: "PUBLIC BUILD · SYNTHETIC DATA · VERIFIED RUN",
    eyebrow: "Manufacturing quality · data product",
    title: "Turned four disconnected quality sources into one containment view.",
    summary:
      "A reproducible lakehouse that lets a quality engineer trace a suspect part across dimensional inspection, machine settings, torque audits, and supplier certificates.",
    problem:
      "When quality records live in separate systems, containment starts with manual joins. Teams lose time identifying which parts share the same machine, batch, failed dimension, or torque condition.",
    owned:
      "I framed the investigation workflow, defined the source grains and traceability keys, built the ingestion and transformation path, and organized the final data product around part-level decisions.",
    decision:
      "Preserve each source in an auditable Bronze layer, then publish one tested Gold record per part. This favors traceability and reproducibility over a faster but opaque dashboard-only prototype.",
    delivered:
      "Four synthetic source generators, partitioned Parquet ingestion, 10 dbt models, a part-quality mart, 90 data-quality tests, and a Streamlit investigation dashboard.",
    evidence: [
      { value: "500", label: "parts in verification run", source: "LOCAL REPRODUCTION · SEED 42" },
      { value: "5,012", label: "source records processed", source: "4 SYNTHETIC SOURCE SYSTEMS" },
      { value: "90/90", label: "data tests passed", source: "DBT BUILD · AUG 27 2026" },
    ],
    repo: "https://github.com/gokulg846/Manufacturing-quality-traceabilty",
    brief:
      "https://github.com/gokulg846/portfolio/blob/main/docs/projects/manufacturing-quality-traceability.md",
    note: "Evidence proves the implementation and data contracts—not deployment, adoption, or production savings.",
  },
  {
    number: "02",
    status: "PUBLIC BUILD · SYNTHETIC FAB · VERIFIED RUN",
    eyebrow: "Semiconductor yield · product analytics",
    title: "Connected process excursions to the yield patterns engineers investigate.",
    summary:
      "A wafer-yield product that links process telemetry, equipment history, lot genealogy, and die-level test results to wafer maps, SPC signals, yield trends, and Pareto analysis.",
    problem:
      "A yield drop says that value was lost; it does not explain where or why. Engineers need to connect spatial failure patterns and out-of-control process conditions to the affected wafers.",
    owned:
      "I designed causally linked source simulators, the lot-to-die data model, the quality gates, and the four investigation views that move from excursion detection to yield-loss diagnosis.",
    decision:
      "Model process excursions as causes of downstream spatial failures instead of generating unrelated random tables. The trade-off is explicit: the pipeline proves analytical behavior, not real-fab predictive validity.",
    delivered:
      "Four connected fab sources, a Bronze/Silver/Gold pipeline, 11 dbt models, 139 data tests, and four decision-focused dashboard views.",
    evidence: [
      { value: "11,310", label: "die records in verification run", source: "6 WAFERS · SYNTHETIC" },
      { value: "139/139", label: "data tests passed", source: "DBT BUILD · AUG 27 2026" },
      { value: "4", label: "investigation views", source: "WAFER MAP · YIELD · SPC · PARETO" },
    ],
    repo: "https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline",
    brief:
      "https://github.com/gokulg846/portfolio/blob/main/docs/projects/semiconductor-wafer-yield-analytics.md",
    note: "The values above come from a small reproducible portfolio run. All fab data is synthetic.",
  },
  {
    number: "03",
    status: "PUBLIC BUILD · DETERMINISTIC AUTOMATION · VERIFIED TESTS",
    eyebrow: "Platform governance · compliance automation",
    title: "Converted platform policy into a repeatable container audit.",
    summary:
      "A focused policy-as-code service that checks running containers for missing ownership labels and forbidden exposed ports, then produces structured evidence and CI-friendly exit codes.",
    problem:
      "Platform rules are difficult to enforce when they live only in documentation. Reviewers need the same policy applied to every container and an audit result that another system can act on.",
    owned:
      "I separated policy ingestion, container inspection, reporting, and orchestration; defined failure behavior; and built a controlled demo with compliant and intentionally non-compliant containers.",
    decision:
      "Keep rules outside the engine in versioned JSON and fail invalid policy before inspecting infrastructure. The first release stays intentionally narrow instead of pretending to be a complete security platform.",
    delivered:
      "A CLI and daemon-capable auditor, structured JSON reports, a three-container Docker demo, and tests for policy validation, audit scope, label enforcement, and exposed ports.",
    evidence: [
      { value: "6/6", label: "unit tests passed", source: "PYTEST · AUG 27 2026" },
      { value: "3", label: "demo containers", source: "1 COMPLIANT · 2 VIOLATIONS" },
      { value: "2", label: "policy rule families", source: "LABELS · EXPOSED PORTS" },
    ],
    repo: "https://github.com/gokulg846/AI-Continuous-Compliance",
    brief:
      "https://github.com/gokulg846/portfolio/blob/main/docs/projects/continuous-compliance-auditor.md",
    note: "This is deterministic governance automation, not an AI or LLM product.",
  },
  {
    number: "04",
    status: "PUBLIC ML BUILD · PUBLIC DATASET · RUNTIME MANIFEST PENDING",
    eyebrow: "Condition monitoring · applied ML",
    title: "Designed anomaly detection for the data plants actually have: mostly healthy history.",
    summary:
      "A bearing-monitoring workflow using public CWRU vibration data, healthy-only training, leakage-aware time splits, an explicit false-positive budget, and an operator-facing review interface.",
    problem:
      "Plants collect abundant normal-operation data but relatively few labeled failures. A useful first model must learn the healthy baseline without leaking overlapping windows across train and test sets.",
    owned:
      "I implemented ingestion, windowing, feature engineering, two complementary detectors, threshold calibration, evaluation, and a Streamlit interface for reviewing flagged windows.",
    decision:
      "Use contiguous time splits with boundary gaps and train only on healthy data. Compare an interpretable feature model with a more complex raw-waveform model instead of optimizing one headline score.",
    delivered:
      "Thirteen public recordings, 1,024-sample windows, five condition features, Isolation Forest and LSTM autoencoder paths, and an operating threshold tied to a validation false-positive budget.",
    evidence: [
      { value: "13", label: "public vibration recordings", source: "CWRU FILE REGISTRY" },
      { value: "1,024", label: "samples per window", source: "50% OVERLAP" },
      { value: "0.5%", label: "validation false-positive budget", source: "IMPLEMENTED THRESHOLD POLICY" },
    ],
    repo: "https://github.com/gokulg846/industry-sensor-anomaly-detection",
    note: "Model scores stay off this page until a pinned run manifest and metrics artifact are published.",
  },
];

const experience = [
  {
    company: "RisingPhoenix.ai",
    role: "AI Product Engineer Intern",
    period: "Jul 2026 — present",
    summary:
      "Building AI-native document ingestion and traceable decision workflows for security architecture and compliance analysis.",
    work: [
      "Engineered document classification, LLM inference, and content-pattern extraction for unstructured security artifacts.",
      "Implemented configurable AI harnesses and traceable workflows for reproducible testing, auditing, and governance.",
      "Built a reusable OWASP, CIS, and ISO knowledge layer for control mapping and compliance analysis.",
    ],
    projects: [],
    supporting: [],
  },
  {
    company: "Cummins",
    role: "Product Engineer Co-op",
    period: "Feb 2025 — Jan 2026",
    summary:
      "Worked across field-failure investigation, validation programs, engineering workflow automation, and an internal AI knowledge product.",
    work: [],
    projects: [
      {
        id: "experience-cummins-rag",
        title: "Internal GenAI knowledge tool",
        kicker: "AI PRODUCT DELIVERY",
        problem: "Engineering documentation was difficult to retrieve efficiently, creating friction when teams needed internal knowledge to move technical work forward.",
        responsibility: "I identified the opportunity, shaped the product concept, built the prototype, and carried the RAG-based knowledge tool through release.",
        approach: "I organized the experience around the retrieval workflow: connect engineering questions to relevant internal documentation, use generation to synthesize the retrieved context, and make the result useful inside an engineering team’s existing work.",
        decision: "Treat retrieval quality and access to grounded internal context as the core product problem—not a generic chatbot experience.",
        technical: "Retrieval-augmented generation, LLM integration, internal knowledge sources, and a release workflow designed around engineering-document discovery.",
        outcome: "Reduced internal documentation-retrieval time by 80%.",
        signal: "Demonstrates AI product ownership from problem framing through prototype and release.",
      },
      {
        id: "experience-cummins-validation",
        title: "Field-failure validation program",
        kicker: "TECHNICAL PROGRAM OWNERSHIP",
        problem: "Bolted-joint failures found in field returns created a design-validation and warranty-risk question with a potential exposure scope of more than 5,000 units.",
        responsibility: "I spearheaded the investigation and developed the validation strategy needed to test proposed design fixes under representative vibration conditions.",
        approach: "I translated field behavior into a shaker-test plan using field-derived power spectral density profiles, then connected the investigation to the evidence required for design and production-readiness decisions.",
        decision: "Use field-derived vibration inputs to make the validation representative of the observed failure environment instead of relying on a generic test profile.",
        technical: "Bolted-joint behavior, shaker testing, PSD-based vibration profiles, repeatability, and mechanical validation of design changes.",
        outcome: "Created a validation path for a failure program with 5,000+ units in its potential risk scope.",
        signal: "Demonstrates risk framing, validation planning, technical dependency management, and readiness support.",
      },
    ],
    supporting: [
      "Migrated legacy test analysis from Excel to MATLAB and automated validation and visualization, removing 20+ hours of manual work each week.",
      "Supported engine-emissions validation by defining end-to-end test strategies and coordinating for accurate, repeatable production-readiness evidence.",
      "Designed production-scale components in PTC Creo using GD&T, tolerance stack-ups, and DFM/DFA principles.",
      "Used ANSYS Discovery to evaluate back-pressure tradeoffs and identify two concepts with 20% performance improvement.",
      "Coordinated inventory and test-program needs across testing, quality, procurement, and fabrication teams.",
    ],
  },
  {
    company: "Purdue–Bayer Innovation",
    role: "Data Science Consultant",
    period: "Aug 2023 — Dec 2023",
    summary:
      "Took an agritech workflow from user discovery and requirements through a computer-vision MVP.",
    work: [],
    projects: [
      {
        id: "experience-purdue-bayer",
        title: "Agritech discovery and computer-vision MVP",
        kicker: "DISCOVERY TO MVP",
        problem: "A Nigerian agritech platform needed to reduce operational friction and make farmland mapping less manual as it scaled farmer onboarding.",
        responsibility: "I helped lead discovery, translated user pain points into product requirements, scoped the MVP, and built the core computer-vision workflow.",
        approach: "I conducted more than 20 interviews before defining scope, then used the findings to prioritize a satellite-imagery mapping workflow instead of beginning with a predetermined technical solution.",
        decision: "Focus the MVP on automating farmland mapping because it addressed a concrete onboarding bottleneck and could be tested as a bounded workflow.",
        technical: "PyTorch and OpenCV applied to satellite imagery for computer-vision-based farmland mapping.",
        outcome: "The engagement achieved 45% lower operating costs and 70% faster farmer onboarding.",
        signal: "Demonstrates customer discovery, requirement definition, MVP prioritization, and end-to-end delivery.",
      },
    ],
    supporting: [],
  },
  {
    company: "Accenture",
    role: "Analyst — Data & Analytics",
    period: "Jul 2021 — Jul 2023",
    summary:
      "Built and maintained industrial data and ML workflows that turned high-frequency sensor data into operating decisions.",
    work: [],
    projects: [
      {
        id: "experience-accenture-iot",
        title: "Industrial IoT and predictive-maintenance platform",
        kicker: "DATA PRODUCT AT SCALE",
        problem: "Industrial teams needed dependable access to high-frequency equipment data and earlier indicators of component failure across a large sensor footprint.",
        responsibility: "I built and maintained the ingestion, analytics, and machine-learning workflows that converted raw sensor signals into monitoring and predictive-maintenance outputs.",
        approach: "I connected ETL, real-time analytics, early-failure modeling, and stakeholder-facing reporting so the work supported an operating decision rather than stopping at a model output.",
        decision: "Build a governed data path around the detection workflow so analytics could operate across more than 10,000 sensors and remain usable for ongoing monitoring.",
        technical: "Python, SQL, Pandas, scikit-learn, BigQuery, AWS S3, Redshift, ETL pipelines, and real-time industrial analytics.",
        outcome: "Enabled earlier failure detection and reduced equipment downtime by 25% across a 10,000+ sensor analytics scope.",
        signal: "Demonstrates data-platform execution, operational scale, reliability thinking, and decision-focused delivery.",
      },
    ],
    supporting: [
      "Automated recurring data retrieval and reporting with Python and SQL, reducing report-generation time by 15%.",
      "Created Tableau dashboards and Gantt-based KPI tracking that improved SLA compliance by 12%.",
      "Built SolidWorks digital-twin representations to support high-fidelity simulation of physical assets.",
    ],
  },
];

const evidenceLabels = [
  {
    title: "Verified run",
    text: "I reran the public code at a known date and report only the output produced by that run.",
  },
  {
    title: "Repository evidence",
    text: "The claim is directly inspectable in source code, tests, configuration, or committed sample data.",
  },
  {
    title: "Resume-reported",
    text: "A professional result stated in my resume. Confidential employer data and internal artifacts are not published.",
  },
  {
    title: "Portfolio reconstruction",
    text: "A document created afterward to explain product reasoning. It is never presented as an original employer artifact.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Gokul Gopalakrishnan, home">
          Gokul Gopalakrishnan<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#evidence">Evidence</a>
          <a className="nav-cta" href="/portfolio/Gokul_Gopalakrishnan_Resume.pdf">
            Résumé
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta">
          <span>PRODUCT EXECUTION · DATA · AI · ENGINEERING</span>
          <span>WEST LAFAYETTE, IN · OPEN TO RELOCATION</span>
        </div>
        <div className="hero-grid">
          <div>
            <p className="hero-kicker"><i aria-hidden="true" />PRODUCT OWNERSHIP · ENGINEERING DEPTH</p>
            <h1>I solve technical problems and deliver products that work.</h1>
          </div>
          <div className="hero-copy">
            <p>
              I take ownership from problem definition through requirements, build, validation,
              and release—using data and AI to help engineering teams make better decisions.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">Explore product work <span>↓</span></a>
              <a className="secondary-button" href="#experience">See career impact <span>↓</span></a>
              <a className="text-link" href="mailto:gokulg846@gmail.com">Email me</a>
            </div>
          </div>
        </div>
        <p className="proof-label">SELECTED CAREER IMPACT</p>
        <div className="proof-rail" aria-label="Selected career impact">
          <a href="#experience-cummins-rag"><b>80%</b><span>faster documentation retrieval</span><small>INTERNAL GENAI KNOWLEDGE TOOL · CUMMINS</small><em>Explore the work ↓</em></a>
          <a href="#experience-cummins-validation"><b>5,000+</b><span>units in the program&apos;s risk scope</span><small>FIELD-FAILURE VALIDATION · CUMMINS</small><em>Explore the work ↓</em></a>
          <a href="#experience-purdue-bayer"><b>20+</b><span>users interviewed before MVP scope</span><small>PRODUCT DISCOVERY · PURDUE–BAYER</small><em>Explore the work ↓</em></a>
          <a href="#experience-accenture-iot"><b>25%</b><span>downtime reduction across a 10,000+ sensor scope</span><small>INDUSTRIAL DATA & ML · ACCENTURE</small><em>Explore the work ↓</em></a>
        </div>
      </header>

      <section className="section-shell intro-section" aria-labelledby="throughline-title">
        <div className="section-label"><span>00</span><p>The throughline</p></div>
        <div className="intro-grid">
          <h2 id="throughline-title">I bring product ownership to engineering work.</h2>
          <div>
            <p>
              My background moves from physical-product engineering to industrial data systems
              and applied AI. The common thread is execution: understand the real workflow,
              choose what matters, build with the technical details in view, and make quality measurable.
            </p>
            <div className="trajectory" aria-label="Experience trajectory">
              <span>Physical systems</span><i>→</i><span>Industrial data</span><i>→</i><span>Applied AI</span>
            </div>
            <figure className="system-visual">
              <div className="system-visual-frame">
                <Image
                  src="/portfolio/og-v2.png"
                  alt="A system view connecting data pipelines, quality gates, and product delivery."
                  width={1730}
                  height={909}
                  unoptimized
                />
              </div>
              <figcaption>THE OPERATING PATTERN · BUILD THE PIPELINE · MAKE QUALITY EXPLICIT · DELIVER EVIDENCE</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-shell projects" id="projects" aria-labelledby="projects-title">
        <div className="section-label"><span>01</span><p>Public product builds</p></div>
        <div className="section-head">
          <h2 id="projects-title">The problem, the product choice, and the proof.</h2>
          <p>
            These are independent builds—not employer deployments. Every card separates working
            implementation from simulated data, reported results, and evidence still pending.
          </p>
        </div>

        <div className="build-list">
          {builds.map((build) => (
            <article className="build" key={build.number}>
              <div className="build-heading">
                <span className="build-number">{build.number}</span>
                <div>
                  <span className="status-badge">{build.status}</span>
                  <p className="eyebrow">{build.eyebrow}</p>
                  <h3>{build.title}</h3>
                  <p className="build-summary">{build.summary}</p>
                </div>
              </div>

              <div className="evidence-row">
                {build.evidence.map((metric) => (
                  <div key={metric.label}>
                    <small>{metric.source}</small>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="story-grid">
                <div><span>WHAT NEEDED TO CHANGE</span><p>{build.problem}</p></div>
                <div><span>WHAT I OWNED</span><p>{build.owned}</p></div>
                <div className="decision-cell"><span>THE PRODUCT DECISION</span><p>{build.decision}</p></div>
                <div><span>WHAT I DELIVERED</span><p>{build.delivered}</p></div>
              </div>

              <div className="artifact-bar">
                <p>{build.note}</p>
                <div>
                  <a href={build.repo} target="_blank" rel="noreferrer">Source repository ↗</a>
                  {build.brief && <a href={build.brief} target="_blank" rel="noreferrer">Product brief ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell approach" aria-labelledby="approach-title">
        <div className="section-label"><span>02</span><p>How I execute</p></div>
        <div className="approach-grid">
          <h2 id="approach-title">Start with the decision. Stay through delivery.</h2>
          <ol>
            <li><b>01</b><div><h3>Understand the workflow</h3><p>Use interviews, field returns, operating data, and existing failure modes to define the problem worth solving.</p></div></li>
            <li><b>02</b><div><h3>Make scope explicit</h3><p>Translate the problem into users, requirements, non-goals, dependencies, and a testable first release.</p></div></li>
            <li><b>03</b><div><h3>Build with the team</h3><p>Work close enough to data, models, software, and physical systems to make credible trade-offs.</p></div></li>
            <li><b>04</b><div><h3>Prove what changed</h3><p>Separate implementation evidence from adoption and business outcomes—and say clearly what remains unvalidated.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section-shell experience" id="experience" aria-labelledby="experience-title">
        <div className="section-label"><span>03</span><p>Professional experience</p></div>
        <div className="experience-head">
          <div>
            <p className="eyebrow">BREADTH WITH A DIRECTION</p>
            <h2 id="experience-title">Engineering depth, applied to product delivery.</h2>
          </div>
          <p>
            Selected programs show how I frame the operating problem, own the path forward,
            work inside the technical details, and deliver a measurable result.
          </p>
        </div>

        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-card" key={item.company}>
              <div className="experience-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{item.period}</time>
              </div>
              <div className="experience-copy">
                <h3>{item.company}</h3>
                <b>{item.role}</b>
                <p>{item.summary}</p>
                {item.work.length > 0 && <ul>{item.work.map((line) => <li key={line}>{line}</li>)}</ul>}
                {item.projects.map((project) => (
                  <section className="experience-project" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
                    <p className="experience-project-kicker">{project.kicker}</p>
                    <h4 id={`${project.id}-title`}>{project.title}</h4>
                    <div className="experience-project-grid">
                      <div><span>THE OPERATING PROBLEM</span><p>{project.problem}</p></div>
                      <div><span>MY RESPONSIBILITY</span><p>{project.responsibility}</p></div>
                      <div><span>HOW I APPROACHED IT</span><p>{project.approach}</p></div>
                      <div><span>THE PRODUCT / PROGRAM DECISION</span><p>{project.decision}</p></div>
                      <div><span>TECHNICAL DEPTH</span><p>{project.technical}</p></div>
                      <div className="experience-outcome"><span>OUTCOME</span><p>{project.outcome}</p></div>
                    </div>
                    <p className="experience-signal"><b>What this demonstrates</b>{project.signal}</p>
                  </section>
                ))}
                {item.supporting.length > 0 && (
                  <div className="supporting-work">
                    <span>ADDITIONAL OWNERSHIP</span>
                    <ul>{item.supporting.map((line) => <li key={line}>{line}</li>)}</ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell evidence" id="evidence" aria-labelledby="evidence-title">
        <div className="section-label"><span>04</span><p>Evidence standard</p></div>
        <div className="evidence-head">
          <h2 id="evidence-title">A number is useful only when you know what it proves.</h2>
          <p>
            I label evidence so a reviewer can distinguish shipped professional work, inspectable
            source code, a reproduced test run, and documentation created later for this portfolio.
          </p>
        </div>
        <div className="evidence-grid">
          {evidenceLabels.map((item, index) => (
            <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>
          ))}
        </div>
      </section>

      <footer>
        <span>LET’S BUILD SOMETHING USEFUL.</span>
        <h2>Need a product owner who can work inside the technical details?</h2>
        <div className="contact-links">
          <a href="mailto:gokulg846@gmail.com">Email <span>↗</span></a>
          <a href="https://www.linkedin.com/in/gokulgopal" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://github.com/gokulg846" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <a href="/portfolio/Gokul_Gopalakrishnan_Resume.pdf">Data & AI résumé <span>↓</span></a>
          <a href="/portfolio/Gokul_Gopalakrishnan_Technical_Program_Resume.pdf">Program résumé <span>↓</span></a>
        </div>
        <div className="footer-meta"><span>GOKUL GOPALAKRISHNAN</span><span>DATA · AI · ENGINEERING · PRODUCT EXECUTION</span></div>
      </footer>
    </main>
  );
}
