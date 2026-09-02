import { projectBySlug } from "../../../content/projects/catalog";
import { ProjectPage, projectMetadata } from "../project-page";

const project = projectBySlug["manufacturing-quality-traceability"];
export const dynamic = "force-static";
export const metadata = projectMetadata(project);
export default function Page() { return <ProjectPage project={project} />; }
