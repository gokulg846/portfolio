import type { Metadata } from "next";
import type { WorkbenchArtifact, WorkbenchEntry } from "../../content/types";
import { sitePath } from "../../lib/site-path";

export function workbenchArtifactMetadata(entry: WorkbenchEntry, artifact: WorkbenchArtifact): Metadata {
  return {
    title: `${artifact.title} — ${entry.title}`,
    description: artifact.summary,
    openGraph: { title: artifact.title, description: artifact.summary, images: [] },
    twitter: { title: artifact.title, description: artifact.summary, images: [] },
  };
}

export function WorkbenchArtifactPage({ entry, artifact }: { entry: WorkbenchEntry; artifact: WorkbenchArtifact }) {
  const artifactIndex = entry.artifacts.findIndex((item) => item.slug === artifact.slug);
  const previousArtifact = artifactIndex > 0 ? entry.artifacts[artifactIndex - 1] : undefined;
  const nextArtifact = artifactIndex < entry.artifacts.length - 1 ? entry.artifacts[artifactIndex + 1] : undefined;
  const artifactPath = (slug: string) => sitePath(`/workbench/${entry.slug}/${slug}/`);
  const entryPath = sitePath(`/workbench/${entry.slug}/`);

  return (
    <main className="artifact-main workbench-artifact-main">
      <header className="artifact-hero">
        <a className="case-back" href={entryPath}>← {entry.title}</a>
        <p className="case-eyebrow">{artifact.label} · PRODUCT WORKBENCH</p>
        <h1>{artifact.title}</h1>
        <p>{artifact.summary}</p>
      </header>

      <aside className="workbench-disclosure" aria-label="Exercise disclosure">
        <b>EVIDENCE BOUNDARY</b><p>{entry.disclosure}</p>
      </aside>

      <article className="artifact-document">
        {artifact.sections.map((section, index) => (
          <section key={`${section.title}-${index}`}>
            <div className="artifact-section-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><p className="artifact-state workbench-state">{section.state}</p><h2>{section.title}</h2></div>
            </div>
            <div className="artifact-section-body">
              {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.table && <div className="artifact-table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
              {section.code && <pre><code>{section.code}</code></pre>}
            </div>
          </section>
        ))}
      </article>

      <nav className="artifact-navigation" aria-label="Workbench artifact sequence">
        <p className="artifact-position">Artifact {artifactIndex + 1} of {entry.artifacts.length}</p>
        <div className="artifact-pager">
          <div>{previousArtifact && <a href={artifactPath(previousArtifact.slug)} rel="prev" aria-label={`Previous artifact: ${previousArtifact.title}`}><span>← PREVIOUS ARTIFACT</span><strong>{previousArtifact.title}</strong></a>}</div>
          <a className="artifact-return" href={entryPath}>Return to exercise ↑</a>
          <div>{nextArtifact && <a href={artifactPath(nextArtifact.slug)} rel="next" aria-label={`Next artifact: ${nextArtifact.title}`}><span>NEXT ARTIFACT →</span><strong>{nextArtifact.title}</strong></a>}</div>
        </div>
      </nav>
    </main>
  );
}
