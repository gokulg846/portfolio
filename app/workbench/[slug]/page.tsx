import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workbenchEntries, workbenchEntryBySlug } from "../../../content/workbench/catalog";
import { WorkbenchPage, workbenchMetadata } from "../workbench-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return workbenchEntries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = workbenchEntryBySlug[slug];
  return entry ? workbenchMetadata(entry) : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = workbenchEntryBySlug[slug];
  if (!entry) notFound();
  return <WorkbenchPage entry={entry} />;
}
