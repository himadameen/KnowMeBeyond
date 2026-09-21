export const WRITING_END = 0.978;

export const writingKinds = [
  "poetry",
  "Urdu Shayari",
  "stories",
  "personal notes",
  "selected writings",
] as const;

export const selectedWorks = [
  "The Land",
  "Hack Back",
  "Dream Left Behind",
  "Companion",
] as const;

export const unwrittenBooks = [
  "Dreamer",
  "A Witch Who Loved for Piety",
  "Beyond Faith and Trust",
] as const;

export type UnwrittenBook = (typeof unwrittenBooks)[number];

export const writingCopy = {
  title: "ALFAZ E NUHAIM",
  subtitle: "Where Feelings Find Words",
  between:
    "Somewhere between the lines of code, there were always lines I couldn't write in code.",
  mother: "A mother wrote personal notes.",
  unwritten: "This chapter hasn't been written yet.",
  return: "Maybe you'll have to come back.",
} as const;
