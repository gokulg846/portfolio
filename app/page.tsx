import { additionalProjects, flagshipProjects, projects, publicArtifacts } from "../content/projects/catalog";
import { sitePath } from "../lib/site-path";

export const dynamic = "force-static";

const experience = [
  {
    id: "experience-risingphoenix",
    company: "RisingPhoenix.ai",
    role: "AI Product Engineer Intern",
    period: "Jul 2026 — present",
    summary: "Led product delivery for an AI-driven architecture and compliance platform serving a large financial-services customer, translating business requirements, security standards, and reference architectures into workflows spanning document ingestion, architecture generation, gap analysis, and assurance reporting.",
    work: [
      "Converted CIS, OWASP, NIST, and NYDFS requirements into reusable validation components spanning architecture design, compliance review, and software delivery.",
      "Defined release-assurance workflows integrating SonarQube, Jenkins, Trivy, JFrog, SBOM generation, and security-control validation.",
    ],
    projects: [
      {
        id: "experience-risingphoenix-platform",
        title: "AI architecture and compliance platform",
        kicker: "ENTERPRISE AI PRODUCT DELIVERY",
        challenge: "A large financial-services customer needed business requirements, reference architectures, and security standards turned into a consistent, traceable workflow across AI-generated architecture and compliance outputs.",
        ownership: "I owned cross-functional delivery across AI, backend, frontend, DevOps, security, and architecture teams, translating customer needs into user journeys, functional and technical specifications, implementation plans, test criteria, and deployment-ready capabilities.",
        decision: "Structure the product as versioned, gated workflow stages with persistent state and recovery handling, then combine domain-specific AI strategies and gold-standard examples with deterministic controls and human review.",
        outcomeLabel: "CAPABILITIES DELIVERED",
        outcome: "Document ingestion, architecture generation, gap analysis, assurance reporting, reusable policy controls, AI-assisted quality assurance, and governed software-supply-chain assurance.",
        technical: ["Multi-stage AI workflows", "Database-backed state and recovery", "Human-in-the-loop QA", "Deterministic validation", "CIS / OWASP / NIST / NYDFS", "CI/CD security and SBOM"],
      },
    ],
    supporting: [],
  },
  {
    id: "experience-cummins",
    company: "Cummins",
    role: "Product Engineer Co-op",
    period: "Feb 2025 — Jan 2026",
    summary: "Worked across field-failure investigation, validation programs, engineering workflow automation, and an internal AI knowledge product.",
    work: [],
    projects: [
      {
        id: "experience-cummins-rag",
        title: "Internal GenAI knowledge tool",
        kicker: "AI PRODUCT DELIVERY",
        challenge: "Engineers were spending too long locating information across internal documentation.",
        ownership: "I identified the opportunity, shaped the product concept, built the prototype, and carried the RAG-based knowledge tool through release.",
        decision: "Use retrieval-augmented generation to ground responses in internal documentation rather than ship a general-purpose chatbot.",
        outcomeLabel: "RESULT",
        outcome: "Reduced internal documentation-retrieval time by 80%.",
        technical: ["RAG architecture", "Document retrieval", "Context grounding", "LLM response generation"],
      },
      {
        id: "experience-cummins-validation",
        title: "Field-failure validation program",
        kicker: "TECHNICAL PROGRAM OWNERSHIP",
        challenge: "Bolted-joint failures in field returns created a validation and warranty-risk question with potential exposure across more than 5,000 units.",
        ownership: "I spearheaded the investigation and developed a shaker-test plan using field-derived power spectral density profiles.",
        decision: "Base the validation input on observed field vibration rather than a generic test profile, so the test represented the actual failure environment.",
        outcomeLabel: "RESULT",
        outcome: "Established the validation path for a failure program involving potential exposure across 5,000+ units.",
        technical: ["Field-return analysis", "Bolted joints", "Shaker testing", "PSD vibration profiles", "Validation planning"],
      },
    ],
    supporting: [
      "Automated test analysis and visualization in MATLAB, removing 20+ hours of manual work each week.",
      "Supported emissions validation through end-to-end test strategies and production-readiness coordination.",
      "Designed and analyzed production-scale components using Creo, GD&T, DFM/DFA, and ANSYS; identified two concepts with 20% performance improvement.",
    ],
  },
  {
    id: "experience-purdue-bayer-role",
    company: "Purdue–Bayer Innovation",
    role: "Data Science Consultant",
    period: "Aug 2023 — Dec 2023",
    summary: "Took an agritech workflow from user discovery and requirements through a computer-vision MVP.",
    work: [],
    projects: [
      {
        id: "experience-purdue-bayer",
        title: "Agritech discovery and computer-vision MVP",
        kicker: "DISCOVERY TO MVP",
        challenge: "The agritech platform needed a more scalable way to map farmland from satellite imagery.",
        ownership: "I conducted 20+ user interviews, translated the findings into product requirements and MVP scope, and built the computer-vision workflow.",
        decision: "Prioritize farmland mapping as a bounded MVP tied directly to the workflow problems identified during discovery.",
        outcomeLabel: "RESULT",
        outcome: "Reduced operating costs by 45%.",
        technical: ["PyTorch", "OpenCV", "Satellite imagery", "Computer vision"],
      },
    ],
    supporting: [],
  },
  {
    id: "experience-accenture",
    company: "Accenture",
    role: "Analyst — Data & Analytics",
    period: "Jul 2021 — Jul 2023",
    summary: "Built industrial data and ML workflows that converted high-frequency sensor data into monitoring and predictive-maintenance decisions.",
    work: [],
    projects: [
      {
        id: "experience-accenture-delivery",
        title: "Delivery operations and SLA visibility",
        kicker: "PROGRAM OPERATIONS",
        challenge: "Delivery teams needed a clearer operating view of milestones, dependencies, and service-level performance.",
        ownership: "I built Tableau and Gantt-based KPI tracking that connected delivery progress with the service-level commitments teams were managing.",
        decision: "Bring schedule and SLA signals into one review workflow so delivery conversations could focus on exceptions, ownership, and recovery actions.",
        outcomeLabel: "RESULT",
        outcome: "Improved SLA compliance by 12%.",
        technical: ["Tableau", "KPI design", "Gantt planning", "SLA tracking", "Delivery reporting"],
      },
      {
        id: "experience-accenture-iot",
        title: "Industrial IoT and predictive-maintenance platform",
        kicker: "DATA PRODUCT AT SCALE",
        challenge: "Industrial teams needed earlier failure signals across a large footprint of high-frequency equipment sensors.",
        ownership: "I built ETL, real-time analytics, machine-learning, and reporting workflows that converted sensor data into monitoring and predictive-maintenance outputs.",
        decision: "Connect ingestion, analytics, and early-failure detection in one operating workflow rather than treat the model as a standalone deliverable.",
        outcomeLabel: "RESULT",
        outcome: "Supported analytics across 10,000+ sensors and reduced equipment downtime by 25%.",
        technical: ["Python", "SQL", "Pandas", "scikit-learn", "BigQuery", "AWS S3", "Redshift"],
      },
    ],
    supporting: [
      "Automated recurring retrieval and reporting, reducing generation time by 15%.",
      "Created SolidWorks digital-twin representations for physical-asset simulation.",
    ],
  },
];

const artifactGroups = [
  { label: "DEFINE", title: "Product definition", slugs: ["prd"], description: "Primary user, job to be done, user journey, prioritized MVP, non-goals, and success metric tree." },
  { label: "DECIDE", title: "Technical judgment", slugs: ["technical-design", "model-card"], description: "Architecture, stack rationale, contracts, tradeoffs, and data or AI guardrails." },
  { label: "DELIVER", title: "Delivery leadership", slugs: ["program-plan"], description: "Milestones, dependencies, RACI, RAID, launch gates, ownership, and rollback." },
  { label: "VALIDATE", title: "Validation and learning", slugs: ["validation", "evaluation"], description: "Acceptance scenarios, evaluation protocol, pilot scorecard, failure analysis, and launch gates." },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Gokul Gopalakrishnan, home">Gokul Gopalakrishnan<span>.</span></a>
        <div className="nav-links"><a href="#projects">Projects</a><a href="#artifacts">Artifacts</a><a href="#experience">Experience</a><a href={sitePath("/workbench/")}>Workbench</a><a className="nav-cta" href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Résumé</a></div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-meta"><span>PRODUCT EXECUTION · DATA · AI · ENGINEERING</span><span>WEST LAFAYETTE, IN · OPEN TO RELOCATION</span></div>
        <div className="hero-grid">
          <div><h1>I solve technical problems and deliver products that work.</h1></div>
          <div className="hero-copy"><p>I bring a mechanical-engineering foundation and 3+ years of experience across automotive manufacturing, technology consulting, and an early-stage AI startup. I’ve built validation programs, industrial data and ML systems, computer-vision workflows, and internal AI tools.</p><p>I work where product and engineering meet: turning ambiguous problems into requirements, aligning the technical work, and staying through validation and release.</p><div className="hero-actions"><a className="primary-button" href="#projects">Explore product work <span>↓</span></a><a className="secondary-button" href="#experience">See career impact <span>↓</span></a><a className="text-link" href="mailto:gokulg846@gmail.com">Email me</a></div></div>
        </div>
        <p className="proof-label">SELECTED CAREER IMPACT</p>
        <div className="proof-rail" aria-label="Selected career impact">
          <a href="#experience-risingphoenix-platform"><b>6 functions</b><span>aligned from customer requirements through deployment-ready capabilities</span><small>ENTERPRISE AI PRODUCT DELIVERY · RISINGPHOENIX.AI</small><em aria-hidden="true">↓</em></a>
          <a href="#experience-cummins-rag"><b>80%</b><span>faster documentation retrieval</span><small>INTERNAL GENAI KNOWLEDGE TOOL · CUMMINS</small><em aria-hidden="true">↓</em></a>
          <a href="#experience-accenture-delivery"><b>12%</b><span>improvement in SLA compliance</span><small>DELIVERY OPERATIONS · ACCENTURE</small><em aria-hidden="true">↓</em></a>
          <a href="#experience-accenture-iot"><b>25%</b><span>reduction in equipment downtime</span><small>INDUSTRIAL DATA & ML · ACCENTURE</small><em aria-hidden="true">↓</em></a>
        </div>
      </header>

      <section className="section-shell projects" id="projects" aria-labelledby="projects-title">
        <div className="section-head"><div><p className="eyebrow">Product case studies</p><h2 id="projects-title">Products built around real engineering work.</h2></div><p>Each project starts with a difficult engineering decision. The case study explains the pain point, the workflow I built, and the product and technical choices behind it.</p></div>
        <div className="product-list">
          {flagshipProjects.map((project) => {
            const prd = publicArtifacts(project).find((artifact) => artifact.slug === "prd");
            return <article className="product-card" key={project.slug}>
              <details className="product-disclosure">
                <summary>
                  <span className="build-number">{project.number}</span>
                  <div className="product-card-summary">
                    <p className="eyebrow">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="build-summary">{project.summary}</p>
                    <span className="product-expand"><span className="expand-closed">Show details +</span><span className="expand-open">Hide details −</span></span>
                  </div>
                </summary>
                <div className="product-expanded">
                  <p className="product-stage">{project.stage}</p>
                  <div className="product-facts">
                    <div><span>BUILT FOR</span><p>{project.audience}</p></div><div><span>THE PAIN</span><p>{project.pain}</p></div><div className="product-function"><span>WHAT THE PRODUCT DOES</span><p>{project.whatItDoes}</p></div><div><span>VALUE HYPOTHESIS</span><p>{project.value}</p></div><div className="product-decision"><span>KEY PRODUCT DECISION</span><p>{project.decision}</p></div>
                  </div>
                  <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </details>
              <div className="product-links"><a href={sitePath(`/projects/${project.slug}/`)}>View case study →</a>{prd && <a href={sitePath(`/projects/${project.slug}/${prd.slug}/`)}>Read PRD →</a>}<a href={project.repository} target="_blank" rel="noreferrer">Source ↗</a></div>
            </article>;
          })}
        </div>
        {additionalProjects.map((project) => {
          const prd = publicArtifacts(project).find((artifact) => artifact.slug === "prd");
          return <article className="additional-project" key={project.slug}>
            <div className="additional-project-label"><span>{project.number}</span><p>Additional case study</p></div>
            <div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p>{project.summary}</p></div>
            <div className="additional-project-links"><a href={sitePath(`/projects/${project.slug}/`)}>View case study →</a>{prd && <a href={sitePath(`/projects/${project.slug}/${prd.slug}/`)}>Read PRD →</a>}<a href={project.repository} target="_blank" rel="noreferrer">Source ↗</a></div>
          </article>;
        })}
      </section>

      <section className="section-shell evidence" id="artifacts" aria-labelledby="artifacts-title">
        <div className="section-label"><span>02</span><p>Product operating artifacts</p></div>
        <div className="evidence-head"><h2 id="artifacts-title">The systems run. The artifacts make the product judgment visible.</h2><p>Each case study includes the work around the implementation: who it serves, why the scope was chosen, how delivery is managed, and what would justify a launch.</p></div>
        <div className="artifact-capabilities">{artifactGroups.map((group) => <div key={group.label}><span>{group.label}</span><h3>{group.title}</h3><p>{group.description}</p></div>)}</div>
        <div className="artifact-matrix-wrap"><table className="artifact-matrix"><thead><tr><th>PROJECT</th>{artifactGroups.map((group) => <th key={group.label}>{group.label}</th>)}</tr></thead><tbody>{projects.map((project) => <tr key={project.slug}><th><a href={sitePath(`/projects/${project.slug}/`)}>{project.title}</a></th>{artifactGroups.map((group) => { const matches = publicArtifacts(project).filter((artifact) => group.slugs.includes(artifact.slug)); return <td key={group.label}>{matches.map((artifact) => <a key={artifact.slug} href={sitePath(`/projects/${project.slug}/${artifact.slug}/`)}>{artifact.title}</a>)}</td>; })}</tr>)}</tbody></table></div>
      </section>

      <section className="section-shell approach" aria-labelledby="approach-title">
        <div className="section-label"><span>03</span><p>How I execute</p></div>
        <div className="approach-grid"><h2 id="approach-title">Start with the decision. Stay through delivery.</h2><ol><li><b>01</b><div><h3>Understand the workflow</h3><p>Use interviews, field returns, operating data, and existing failure modes to define the problem worth solving.</p></div></li><li><b>02</b><div><h3>Make scope explicit</h3><p>Translate the problem into users, requirements, non-goals, dependencies, and a testable first release.</p></div></li><li><b>03</b><div><h3>Build with the team</h3><p>Work close enough to data, models, software, and physical systems to make credible trade-offs.</p></div></li><li><b>04</b><div><h3>Prove what changed</h3><p>Separate implementation evidence from adoption and business outcomes—and make the next validation decision explicit.</p></div></li></ol></div>
      </section>

      <section className="section-shell experience" id="experience" aria-labelledby="experience-title">
        <div className="section-label"><span>04</span><p>Career impact</p></div>
        <div className="experience-head"><div><p className="eyebrow">BREADTH WITH A DIRECTION</p><h2 id="experience-title">Engineering depth, applied to product delivery.</h2></div><p>Selected programs show the operating problem, my ownership, the decision I made, and the result—followed by the technical depth behind the work.</p></div>
        <div className="experience-list">{experience.map((item, index) => <article className="experience-card" id={item.id} key={item.company}><div className="experience-meta"><span>{String(index + 1).padStart(2, "0")}</span><time>{item.period}</time></div><div className="experience-copy"><h3>{item.company}</h3><b>{item.role}</b><p>{item.summary}</p>{item.work.length > 0 && <ul>{item.work.map((line) => <li key={line}>{line}</li>)}</ul>}{item.projects.map((project) => <section className="experience-project" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}><p className="experience-project-kicker">{project.kicker}</p><h4 id={`${project.id}-title`}>{project.title}</h4><div className="experience-project-grid"><div><span>CHALLENGE</span><p>{project.challenge}</p></div><div><span>MY OWNERSHIP</span><p>{project.ownership}</p></div><div><span>KEY DECISION</span><p>{project.decision}</p></div><div className="experience-outcome"><span>{project.outcomeLabel}</span><p>{project.outcome}</p></div></div><div className="experience-tech"><span>TECHNICAL DEPTH</span>{project.technical.map((technicalItem) => <b key={technicalItem}>{technicalItem}</b>)}</div></section>)}{item.supporting.length > 0 && <div className="supporting-work"><span>ADDITIONAL OWNERSHIP</span><ul>{item.supporting.map((line) => <li key={line}>{line}</li>)}</ul></div>}</div></article>)}</div>
      </section>

      <section className="section-shell workbench-teaser" id="workbench" aria-labelledby="workbench-teaser-title">
        <div className="workbench-teaser-label"><span>05</span><p>Product Workbench</p></div>
        <div className="workbench-teaser-copy"><h2 id="workbench-teaser-title">Independent product studies and case exercises.</h2><p>Program plans, product critiques, and improvement proposals that show how I approach unfamiliar product problems.</p></div>
        <a href={sitePath("/workbench/")}>Explore the workbench →</a>
      </section>

      <footer><span>LET’S BUILD SOMETHING USEFUL.</span><h2>Need a technical product manager who can work inside the engineering details?</h2><div className="contact-links"><a href="mailto:gokulg846@gmail.com">Email <span>↗</span></a><a href="https://www.linkedin.com/in/gokulgopal" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/gokulg846" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Data & AI résumé <span>↓</span></a><a href={sitePath("/Gokul_Gopalakrishnan_Technical_Program_Resume.pdf")}>Program résumé <span>↓</span></a></div><div className="footer-meta"><span>GOKUL GOPALAKRISHNAN</span><span>DATA · AI · ENGINEERING · PRODUCT EXECUTION</span></div></footer>
    </main>
  );
}
