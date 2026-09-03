import { additionalProjects, flagshipProjects, projects, publicArtifacts } from "../content/projects/catalog";
import { careerHighlights, experience } from "../content/experience";
import { workbenchEntries } from "../content/workbench/catalog";
import { sitePath } from "../lib/site-path";
import { SiteNav } from "./site-nav";

export const dynamic = "force-static";

const artifactGroups = [
  { label: "DEFINE", title: "Product definition", slugs: ["prd"], description: "Primary user, job to be done, user journey, prioritized MVP, non-goals, and success metric tree." },
  { label: "DECIDE", title: "Technical judgment", slugs: ["technical-design", "model-card"], description: "Architecture, stack rationale, contracts, tradeoffs, and data or AI guardrails." },
  { label: "DELIVER", title: "Delivery leadership", slugs: ["program-plan"], description: "Milestones, dependencies, RACI, RAID, launch gates, ownership, and rollback." },
  { label: "VALIDATE", title: "Validation and learning", slugs: ["validation", "evaluation"], description: "Acceptance scenarios, evaluation protocol, pilot scorecard, failure analysis, and launch gates." },
];

export default function Home() {
  return (
    <main>
      <SiteNav />

      <header className="hero" id="top">
        <div className="hero-meta"><span>PRODUCT EXECUTION · DATA · AI · ENGINEERING</span><span>WEST LAFAYETTE, IN · OPEN TO RELOCATION</span></div>
        <div className="hero-grid">
          <div><h1>I solve technical problems and deliver products that work.</h1></div>
          <div className="hero-copy"><p>I bring a mechanical-engineering foundation and 3+ years of experience across automotive manufacturing, technology consulting, and an early-stage AI startup. I’ve built validation programs, industrial data and ML systems, computer-vision workflows, and internal AI tools.</p><p>I work where product and engineering meet: turning ambiguous problems into requirements, aligning the technical work, and staying through validation and release.</p><div className="hero-actions"><a className="primary-button" href="#projects">Explore product work <span>↓</span></a><a className="secondary-button" href="#experience">See career impact <span>↓</span></a><a className="text-link" href="mailto:gokulg846@gmail.com">Email me</a></div></div>
        </div>
        <p className="proof-label">SELECTED CAREER IMPACT</p>
        <div className="proof-rail" aria-label="Selected career impact">
          {careerHighlights.map((highlight) => <a href={`#${highlight.destination}`} key={highlight.destination}><b>{highlight.metric}</b><span>{highlight.description}</span><small>{highlight.label}</small><em aria-hidden="true">↓</em></a>)}
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
        <div className="artifact-matrix-wrap"><table className="artifact-matrix"><thead><tr><th>PROJECT</th>{artifactGroups.map((group) => <th key={group.label}>{group.label}</th>)}</tr></thead><tbody>{projects.map((project) => <tr key={project.slug}><th data-label="PROJECT"><a href={sitePath(`/projects/${project.slug}/`)}>{project.title}</a></th>{artifactGroups.map((group) => { const matches = publicArtifacts(project).filter((artifact) => group.slugs.includes(artifact.slug)); return <td data-label={group.label} key={group.label}>{matches.map((artifact) => <a key={artifact.slug} href={sitePath(`/projects/${project.slug}/${artifact.slug}/`)}>{artifact.title}</a>)}</td>; })}</tr>)}</tbody></table></div>
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

      {workbenchEntries.length > 0 && <section className="section-shell workbench-teaser" id="workbench" aria-labelledby="workbench-teaser-title">
        <div className="workbench-teaser-label"><span>05</span><p>Product Workbench</p></div>
        <div className="workbench-teaser-copy"><h2 id="workbench-teaser-title">Independent product studies and case exercises.</h2><p>Program plans, product critiques, and improvement proposals that show how I approach unfamiliar product problems.</p></div>
        <a href={sitePath("/workbench/")}>Explore the workbench →</a>
      </section>}

      <footer><span>LET’S BUILD SOMETHING USEFUL.</span><h2>Need a technical product manager who can work inside the engineering details?</h2><div className="contact-links"><a href="mailto:gokulg846@gmail.com">Email <span>↗</span></a><a href="https://www.linkedin.com/in/gokulgopal" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/gokulg846" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Data & AI résumé <span>↓</span></a><a href={sitePath("/Gokul_Gopalakrishnan_Technical_Program_Resume.pdf")}>Program résumé <span>↓</span></a></div><div className="footer-meta"><span>GOKUL GOPALAKRISHNAN</span><span>DATA · AI · ENGINEERING · PRODUCT EXECUTION</span></div></footer>
    </main>
  );
}
