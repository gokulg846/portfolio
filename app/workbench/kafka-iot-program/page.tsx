import { workbenchEntryBySlug } from "../../../content/workbench/catalog";
import { WorkbenchPage, workbenchMetadata } from "../workbench-page";

const entry = workbenchEntryBySlug["kafka-iot-program"];

export const dynamic = "force-static";
export const metadata = workbenchMetadata(entry);

export default function Page() {
  return <WorkbenchPage entry={entry} />;
}
