import type { Metadata } from "next";
import type { WorkbenchEntry } from "../../content/types";
import { sitePath } from "../../lib/site-path";

export function workbenchMetadata(entry: WorkbenchEntry): Metadata {
  return {
    title: `${entry.title} — Product Workbench`,
    description: entry.summary,
    openGraph: { title: entry.title, description: entry.summary, images: [] },
    twitter: { title: entry.title, description: entry.summary, images: [] },
  };
}

export function WorkbenchPage({ entry }: { entry: WorkbenchEntry }) {
  return (
    <main className="case-main workbench-entry-main">
      <header className="case-hero">
        <a className="case-back" href={sitePath("/workbench/")}>← PRODUCT WORKBENCH</a>
        <p className="case-eyebrow">{entry.entryType} · {entry.evidenceStatus}</p>
        <h1>{entry.title}</h1>
        <p className="case-deck">{entry.summary}</p>
        <div className="case-stage">{entry.publicationDate} · Independent work</div>
      </header>

      <aside className="workbench-disclosure" aria-label="Exercise disclosure">
        <b>EVIDENCE BOUNDARY</b>
        <p>{entry.disclosure}</p>
      </aside>

      <section className="workbench-question">
        <span>QUESTION</span>
        <h2>{entry.question}</h2>
      </section>

      <section className="case-snapshot" aria-label="Exercise snapshot">
        <div><span>SCENARIO</span><p>{entry.productOrScenario}</p></div>
        <div><span>SOURCE BASIS</span><p>{entry.sourceBasis.join(" · ")}</p></div>
        <div><span>LABELS</span><p>{entry.tags.join(" · ")}</p></div>
      </section>

      <section className="case-artifacts">
        <div><p className="case-section-label">WORKBENCH ARTIFACTS</p><h2>The reasoning behind the recommendation.</h2></div>
        <div className="artifact-list">
          {entry.artifacts.map((artifact, index) => (
            <a href={sitePath(`/workbench/${entry.slug}/${artifact.slug}/`)} key={artifact.slug}>
              <span>{String(index + 1).padStart(2, "0")} · {artifact.label}</span><h3>{artifact.title}</h3><p>{artifact.summary}</p><b>Read artifact →</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
