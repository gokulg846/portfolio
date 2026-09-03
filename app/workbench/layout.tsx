import { sitePath } from "../../lib/site-path";
import { SiteNav } from "../site-nav";

export default function WorkbenchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="case-shell">
      <SiteNav label="Workbench navigation" />
      {children}
      <footer className="case-footer">
        <p>PRODUCT WORKBENCH · INDEPENDENT STUDIES AND CASE EXERCISES</p>
        <a href={sitePath("/workbench/")}>Return to the Workbench ↑</a>
      </footer>
    </div>
  );
}
