import { sitePath } from "../lib/site-path";
import { workbenchEntries } from "../content/workbench/catalog";

export function SiteNav({ label = "Primary navigation" }: { label?: string }) {
  return (
    <nav className="site-nav" aria-label={label}>
      <a className="wordmark" href={sitePath("/#top")} aria-label="Gokul Gopalakrishnan, home">Gokul Gopalakrishnan<span>.</span></a>
      <div className="nav-links">
        <a href={sitePath("/#projects")}>Projects</a>
        <a href={sitePath("/#artifacts")}>Artifacts</a>
        <a href={sitePath("/#experience")}>Experience</a>
        {workbenchEntries.length > 0 && <a href={sitePath("/workbench/")}>Workbench</a>}
        <a className="nav-cta" href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Résumé</a>
      </div>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <div>
          <a href={sitePath("/#projects")}>Projects</a>
          <a href={sitePath("/#artifacts")}>Artifacts</a>
          <a href={sitePath("/#experience")}>Experience</a>
          {workbenchEntries.length > 0 && <a href={sitePath("/workbench/")}>Workbench</a>}
          <a href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Résumé</a>
        </div>
      </details>
    </nav>
  );
}
