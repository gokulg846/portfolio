import { sitePath } from "../../lib/site-path";
import { SiteNav } from "../site-nav";

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="case-shell">
      <SiteNav label="Project navigation" />
      {children}
      <footer className="case-footer">
        <p>GOKUL GOPALAKRISHNAN · DATA · AI · ENGINEERING · PRODUCT EXECUTION</p>
        <a href={sitePath("/#projects")}>Return to product work ↑</a>
      </footer>
    </div>
  );
}
