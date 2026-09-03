import type { Metadata } from "next";
import type { ProjectArtifact, ProjectCaseStudy } from "../../content/types";
import { publicArtifacts } from "../../content/projects/catalog";
import { sitePath } from "../../lib/site-path";

export function artifactMetadata(project: ProjectCaseStudy, artifact: ProjectArtifact): Metadata {
  return {
    title: `${artifact.title} — ${project.title}`,
    description: artifact.summary,
    openGraph: { title: artifact.title, description: artifact.summary, images: [] },
    twitter: { title: artifact.title, description: artifact.summary, images: [] },
  };
}

export function ArtifactPage({ project, artifact }: { project: ProjectCaseStudy; artifact: ProjectArtifact }) {
  const artifacts = publicArtifacts(project);
  const artifactIndex = artifacts.findIndex((item) => item.slug === artifact.slug);
  const previousArtifact = artifactIndex > 0 ? artifacts[artifactIndex - 1] : undefined;
  const nextArtifact = artifactIndex < artifacts.length - 1 ? artifacts[artifactIndex + 1] : undefined;
  const artifactPath = (slug: string) => sitePath(`/projects/${project.slug}/${slug}/`);
  const projectPath = sitePath(`/projects/${project.slug}/`);

  return (
    <main className="artifact-main">
      <header className="artifact-hero">
        <a className="case-back" href={sitePath(`/projects/${project.slug}/`)}>← {project.title}</a>
        <p className="case-eyebrow">{artifact.label} · PRODUCT OPERATING ARTIFACT</p>
        <h1>{artifact.title}</h1>
        <p>{artifact.summary}</p>
      </header>

      <aside className="artifact-boundary" aria-label="Evidence boundary">
        <b>READING THE EVIDENCE</b>
        <span><i className="state-current" />Current build — inspectable in the repository</span>
        <span><i className="state-target" />Design target — intended product behavior</span>
        <span><i className="state-proposed" />Proposed next step — required before a claim or launch</span>
      </aside>

      <article className="artifact-document">
        {artifact.sections.map((section, index) => (
          <section key={`${section.title}-${index}`}>
            <div className="artifact-section-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                {section.state && <p className={`artifact-state state-${section.state.toLowerCase().replaceAll(" ", "-")}`}>{section.state}</p>}
                <h2>{section.title}</h2>
              </div>
            </div>
            <div className="artifact-section-body">
              {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.table && (
                <div className="artifact-table-wrap">
                  <table>
                    <thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                    <tbody>{section.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {section.code && <pre><code>{section.code}</code></pre>}
            </div>
          </section>
        ))}
      </article>

      <nav className="artifact-navigation" aria-label="Artifact sequence">
        <p className="artifact-position">Artifact {artifactIndex + 1} of {artifacts.length}</p>
        <div className="artifact-pager">
          <div>
            {previousArtifact && <a href={artifactPath(previousArtifact.slug)} rel="prev" aria-label={`Previous artifact: ${previousArtifact.title}`}><span>← PREVIOUS ARTIFACT</span><strong>{previousArtifact.title}</strong></a>}
          </div>
          <a className="artifact-return" href={projectPath}>Return to case study ↑</a>
          <div>
            {nextArtifact && <a href={artifactPath(nextArtifact.slug)} rel="next" aria-label={`Next artifact: ${nextArtifact.title}`}><span>NEXT ARTIFACT →</span><strong>{nextArtifact.title}</strong></a>}
          </div>
        </div>
        <a className="artifact-source-link" href={project.repository} target="_blank" rel="noreferrer">Inspect source repository ↗</a>
      </nav>
    </main>
  );
}
