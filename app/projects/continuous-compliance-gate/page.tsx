import { projects } from "../../../content/projects/catalog";
import { ProjectPage, projectMetadata } from "../project-page";

const project = projects[2];
export const dynamic = "force-static";
export const metadata = projectMetadata(project);
export default function Page() { return <ProjectPage project={project} />; }
