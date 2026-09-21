export const ENGINEER_END = 0.955;

export const productionConcepts = [
  "real projects",
  "clients",
  "production",
  "architecture",
  "APIs",
  "databases",
  "deployments",
  "debugging",
  "performance",
  "mentoring",
  "teams",
  "responsibility",
] as const;

export const projectWorlds = [
  "LMS",
  "IoT",
  "CRM",
  "ERP",
  "E-commerce",
  "Crowdfunding",
  "Sports",
  "Mobile",
  "AI",
  "Floor planning",
  "Onboarding",
] as const;

export type ProjectWorld = (typeof projectWorlds)[number];

export const projectPath = [
  "Problem",
  "My Role",
  "Architecture",
  "Build",
  "Challenge",
  "Solution",
  "Result",
  "Lesson",
] as const;

export type ProjectPathStep = (typeof projectPath)[number];

export const architectureNodes = [
  "frontend",
  "backend",
  "API",
  "database",
  "integrations",
  "authentication",
  "payments",
  "infrastructure",
  "performance",
  "scalability",
] as const;

export type ArchitectureNode = (typeof architectureNodes)[number];

export const depthQuestions = ["Why?", "How?", "Result?"] as const;

export const engineerCopy = {
  place: "Colan Info Tech",
  duration: "Approximately three years.",
  enter: "Enter",
  leave: "Leave",
  continue: "Continue",
  inspect: "Inspect",
  beyond: "BEYOND THE CODE",
} as const;
