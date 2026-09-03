import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicWorkbenchArtifacts, workbenchEntries, workbenchEntryBySlug } from "../../../../content/workbench/catalog";
import { WorkbenchArtifactPage, workbenchArtifactMetadata } from "../../workbench-artifact-page";

type Props = { params: Promise<{ slug: string; artifact: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return workbenchEntries.flatMap((entry) =>
    publicWorkbenchArtifacts(entry).map(({ slug: artifact }) => ({ slug: entry.slug, artifact })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, artifact: artifactSlug } = await params;
  const entry = workbenchEntryBySlug[slug];
  const artifact = entry && publicWorkbenchArtifacts(entry).find((item) => item.slug === artifactSlug);
  return entry && artifact ? workbenchArtifactMetadata(entry, artifact) : {};
}
export default async function Page({ params }: Props) {
  const { slug, artifact: artifactSlug } = await params;
  const entry = workbenchEntryBySlug[slug];
  const artifact = entry && publicWorkbenchArtifacts(entry).find((item) => item.slug === artifactSlug);
  if (!entry || !artifact) notFound();
  return <WorkbenchArtifactPage entry={entry} artifact={artifact} />;
}
