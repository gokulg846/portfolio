import type { WorkbenchEntry } from "../types";
import { kafkaIotProgram } from "./kafka-iot-program";

export const workbenchEntries: WorkbenchEntry[] = [kafkaIotProgram];

export const workbenchEntryBySlug = Object.fromEntries(
  workbenchEntries.map((entry) => [entry.slug, entry]),
);
