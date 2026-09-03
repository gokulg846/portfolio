import { sitePath } from "../../lib/site-path";

export default function WorkbenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="case-shell">
      <nav className="site-nav" aria-label="Workbench navigation">
        <a className="wordmark" href={sitePath("/")}>Gokul Gopalakrishnan<span>.</span></a>
        <div className="nav-links">
          <a href={sitePath("/#projects")}>Projects</a>
          <a href={sitePath("/#artifacts")}>Artifacts</a>
          <a href={sitePath("/#experience")}>Experience</a>
          <a href={sitePath("/workbench/")}>Workbench</a>
          <a className="nav-cta" href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Résumé</a>
        </div>
      </nav>
      {children}
      <footer className="case-footer">
        <p>PRODUCT WORKBENCH · INDEPENDENT STUDIES AND CASE EXERCISES</p>
        <a href={sitePath("/workbench/")}>Return to the Workbench ↑</a>
      </footer>
    </div>
  );
}
