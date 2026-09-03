import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, publicArtifacts } from "../../../../content/projects/catalog";
import { ArtifactPage, artifactMetadata } from "../../artifact-page";

const project = projectBySlug["continuous-compliance-gate"];
type Props = { params: Promise<{ artifact: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return publicArtifacts(project).map(({ slug }) => ({ artifact: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artifact: artifactSlug } = await params;
  const artifact = publicArtifacts(project).find((item) => item.slug === artifactSlug);
  return artifact ? artifactMetadata(project, artifact) : {};
}
export default async function Page({ params }: Props) {
  const { artifact: artifactSlug } = await params;
  const artifact = publicArtifacts(project).find((item) => item.slug === artifactSlug);
  if (!artifact) notFound();
  return <ArtifactPage project={project} artifact={artifact} />;
}
