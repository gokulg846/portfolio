import { projectBySlug } from "../../../content/projects/catalog";
import { ProjectPage, projectMetadata } from "../project-page";

const project = projectBySlug["industrial-sensor-anomaly-detection"];
export const dynamic = "force-static";
export const metadata = projectMetadata(project);
export default function Page() { return <ProjectPage project={project} />; }
