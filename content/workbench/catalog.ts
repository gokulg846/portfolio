import type { WorkbenchEntry } from "../types";
import { isPublic } from "../define";
import { kafkaIotProgram } from "./kafka-iot-program";

// Add or hide Workbench entries here. See update_instructions.md.
const allWorkbenchEntries: WorkbenchEntry[] = [kafkaIotProgram];
export const workbenchEntries = allWorkbenchEntries.filter(isPublic);

export const workbenchEntryBySlug = Object.fromEntries(
  workbenchEntries.map((entry) => [entry.slug, entry]),
);

export const publicWorkbenchArtifacts = (entry: WorkbenchEntry) =>
  entry.artifacts.filter((artifact) => artifact.visibility !== "private");
