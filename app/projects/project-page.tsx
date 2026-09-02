import type { Metadata } from "next";
import type { ProjectCaseStudy } from "../../content/types";
import { sitePath } from "../../lib/site-path";

export function projectMetadata(project: ProjectCaseStudy): Metadata {
  return {
    title: `${project.title} — Gokul Gopalakrishnan`,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [] },
    twitter: { title: project.title, description: project.summary, images: [] },
  };
}

export function ProjectPage({ project }: { project: ProjectCaseStudy }) {
  return (
    <main className="case-main">
      <header className="case-hero">
        <a className="case-back" href={sitePath("/#projects")}>← PRODUCT WORK</a>
        <p className="case-eyebrow">{project.number} · {project.category}</p>
        <h1>{project.title}</h1>
        <p className="case-deck">{project.summary}</p>
        <div className="case-stage">{project.stage}</div>
      </header>

      <section className="case-snapshot" aria-label="Product snapshot">
        <div><span>PRIMARY USER</span><p>{project.audience}</p></div>
        <div><span>JOB TO BE DONE</span><p>{project.job}</p></div>
        <div><span>VALUE HYPOTHESIS</span><p>{project.value}</p></div>
        <div><span>WHAT I OWNED</span><p>{project.owned}</p></div>
      </section>

      <section className="case-decision">
        <span>KEY PRODUCT DECISION</span>
        <h2>{project.decision}</h2>
      </section>

      <section className="case-two-column">
        <div>
          <p className="case-section-label">TECH STACK</p>
          <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <div>
          <p className="case-section-label">CURRENT LIMITS</p>
          <ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      {project.artifacts.length > 0 && (
        <section className="case-artifacts">
          <div>
            <p className="case-section-label">PRODUCT OPERATING ARTIFACTS</p>
            <h2>The work around the build.</h2>
          </div>
          <div className="artifact-list">
            {project.artifacts.map((artifact) => (
              <a key={artifact.slug} href={sitePath(`/projects/${project.slug}/${artifact.slug}/`)}>
                <span>{artifact.label}</span><h3>{artifact.title}</h3><p>{artifact.summary}</p><b>Read artifact →</b>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="case-source">
        <p>Inspect the implementation separately from the product framing.</p>
        <a href={project.repository} target="_blank" rel="noreferrer">Source repository ↗</a>
      </section>
    </main>
  );
}
