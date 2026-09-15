import type { Metadata } from "next";
import { projects, publicArtifacts } from "../../content/projects/catalog";
import { sitePath } from "../../lib/site-path";
import { SiteNav } from "../site-nav";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How I Work | Gokul Gopalakrishnan",
  description: "How I move technical product work from problem definition through delivery and validation.",
  openGraph: {
    title: "How I Work | Gokul Gopalakrishnan",
    description: "A practical operating approach backed by project artifacts and evidence.",
    images: [],
  },
  twitter: {
    title: "How I Work | Gokul Gopalakrishnan",
    description: "A practical operating approach backed by project artifacts and evidence.",
    images: [],
  },
};

export default function HowIWorkPage() {
  return (
    <main className="operating-page">
      <SiteNav label="How I work navigation" />

      <header className="operating-hero">
        <a className="case-back" href={sitePath("/")}>← PORTFOLIO</a>
        <p className="case-eyebrow">HOW I WORK</p>
        <h1>From an ambiguous problem to a release decision.</h1>
        <p>I start with the user’s workflow, define the decision the product must support, and turn that into scope, technical tradeoffs, and validation.</p>
      </header>

      <section className="section-shell approach operating-approach" aria-labelledby="operating-approach-title">
        <div className="section-label"><span>01</span><p>Operating approach</p></div>
        <div className="approach-grid">
          <h2 id="operating-approach-title">Four steps I use to move technical work forward.</h2>
          <ol>
            <li><b>01</b><div><h3>Start with the workflow</h3><p>I use interviews, field data, and failure modes to understand where work slows down, breaks, or creates risk.</p></div></li>
            <li><b>02</b><div><h3>Define the release</h3><p>I turn the problem into a target user, requirements, scope, dependencies, and measurable acceptance criteria.</p></div></li>
            <li><b>03</b><div><h3>Work inside the system</h3><p>I stay close to the data, models, software, and physical constraints so tradeoffs remain technically credible.</p></div></li>
            <li><b>04</b><div><h3>Validate the outcome</h3><p>I test whether the product changed the user’s work, then decide what to ship, revise, or stop.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="operating-evidence" aria-labelledby="operating-evidence-title">
        <div className="section-label"><span>02</span><p>Project evidence</p></div>
        <div className="operating-evidence-head">
          <h2 id="operating-evidence-title">Open the work behind each project.</h2>
          <p>Each case study follows Define, Decide, Deliver, and Validate. Start with the overview or open any artifact directly.</p>
        </div>
        <div className="operating-projects">
          {projects.map((project) => (
            <article key={project.slug}>
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <a className="operating-case-link" href={sitePath(`/projects/${project.slug}/`)}>Follow the case study →</a>
              <div>
                {publicArtifacts(project).map((artifact) => (
                  <a key={artifact.slug} href={sitePath(`/projects/${project.slug}/${artifact.slug}/`)}>{artifact.title} →</a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
