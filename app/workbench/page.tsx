import type { Metadata } from "next";
import { workbenchEntries } from "../../content/workbench/catalog";
import { sitePath } from "../../lib/site-path";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Product Workbench | Gokul Gopalakrishnan",
  description: "Independent product studies, program exercises, critiques, and improvement proposals.",
  openGraph: { title: "Product Workbench", description: "Independent product studies and case exercises.", images: [] },
  twitter: { title: "Product Workbench", description: "Independent product studies and case exercises.", images: [] },
};

export default function WorkbenchIndex() {
  return (
    <main className="workbench-main">
      <header className="workbench-hero">
        <a className="case-back" href={sitePath("/")}>← PORTFOLIO</a>
        <p className="case-eyebrow">PRODUCT WORKBENCH</p>
        <h1>Independent product reviews and program exercises.</h1>
        <p>I use public product evidence and interview scenarios to work through product strategy, delivery planning, and improvement ideas. Each entry shows the source material, my interpretation, and the recommendation.</p>
      </header>

      <section className="workbench-principles" aria-label="Workbench evidence rules">
        <div><span>OBSERVE</span><p>Document what the product or scenario actually shows.</p></div>
        <div><span>INTERPRET</span><p>Explain what the evidence suggests and where uncertainty remains.</p></div>
        <div><span>PROPOSE</span><p>Turn the finding into a prioritized change, delivery plan, and success measure.</p></div>
      </section>

      <section className="workbench-index" aria-labelledby="workbench-index-title">
        <div className="workbench-index-heading"><p className="case-section-label">PUBLISHED WORK</p><h2 id="workbench-index-title">Published product and program exercises.</h2></div>
        <div className="workbench-entry-list">
          {workbenchEntries.map((entry, index) => (
            <a href={sitePath(`/workbench/${entry.slug}/`)} key={entry.slug}>
              <span>{String(index + 1).padStart(2, "0")} · {entry.entryType}</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <div>{entry.tags.slice(0, 4).map((tag) => <b key={tag}>{tag}</b>)}</div>
              <strong>Open exercise →</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
