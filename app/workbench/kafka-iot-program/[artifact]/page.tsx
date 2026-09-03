import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workbenchEntryBySlug } from "../../../../content/workbench/catalog";
import { WorkbenchArtifactPage, workbenchArtifactMetadata } from "../../workbench-artifact-page";

const entry = workbenchEntryBySlug["kafka-iot-program"];
type Props = { params: Promise<{ artifact: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return entry.artifacts.map(({ slug }) => ({ artifact: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artifact: artifactSlug } = await params;
  const artifact = entry.artifacts.find((item) => item.slug === artifactSlug);
  return artifact ? workbenchArtifactMetadata(entry, artifact) : {};
}
export default async function Page({ params }: Props) {
  const { artifact: artifactSlug } = await params;
  const artifact = entry.artifacts.find((item) => item.slug === artifactSlug);
  if (!artifact) notFound();
  return <WorkbenchArtifactPage entry={entry} artifact={artifact} />;
}
