import type { CareerHighlight, ExperienceEntry, ProjectCaseStudy, WorkbenchEntry } from "./types";

export const defineProject = <T extends ProjectCaseStudy>(project: T) => project;
export const defineWorkbenchEntry = <T extends WorkbenchEntry>(entry: T) => entry;
export const defineExperience = <T extends ExperienceEntry>(entry: T) => entry;
export const defineCareerHighlight = <T extends CareerHighlight>(highlight: T) => highlight;

export const isPublic = <T extends { visibility: "public" | "private" }>(item: T) =>
  item.visibility === "public";
