import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projects } from "../../../content/projects/catalog";
import { ProjectPage, projectMetadata } from "../project-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  return project ? projectMetadata(project) : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
