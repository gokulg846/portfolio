import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projects, publicArtifacts } from "../../../../content/projects/catalog";
import { ArtifactPage, artifactMetadata } from "../../artifact-page";

type Props = { params: Promise<{ slug: string; artifact: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.flatMap((project) =>
    publicArtifacts(project).map(({ slug: artifact }) => ({ slug: project.slug, artifact })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, artifact: artifactSlug } = await params;
  const project = projectBySlug[slug];
  const artifact = project && publicArtifacts(project).find((item) => item.slug === artifactSlug);
  return project && artifact ? artifactMetadata(project, artifact) : {};
}
export default async function Page({ params }: Props) {
  const { slug, artifact: artifactSlug } = await params;
  const project = projectBySlug[slug];
  const artifact = project && publicArtifacts(project).find((item) => item.slug === artifactSlug);
  if (!project || !artifact) notFound();
  return <ArtifactPage project={project} artifact={artifact} />;
}
