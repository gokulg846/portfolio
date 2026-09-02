import { sitePath } from "../../lib/site-path";

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="case-shell">
      <nav className="site-nav" aria-label="Project navigation">
        <a className="wordmark" href={sitePath("/")}>Gokul Gopalakrishnan<span>.</span></a>
        <div className="nav-links">
          <a href={sitePath("/#projects")}>All projects</a>
          <a href={sitePath("/#experience")}>Career impact</a>
          <a className="nav-cta" href={sitePath("/Gokul_Gopalakrishnan_Resume.pdf")}>Résumé</a>
        </div>
      </nav>
      {children}
      <footer className="case-footer">
        <p>GOKUL GOPALAKRISHNAN · DATA · AI · ENGINEERING · PRODUCT EXECUTION</p>
        <a href={sitePath("/#projects")}>Return to product work ↑</a>
      </footer>
    </div>
  );
}
