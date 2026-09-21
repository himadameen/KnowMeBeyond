export const colors = {
  background: "#0B0B0D",
  surface: "#121216",
  ink: "#F5EFE6",
  gold: "#D4AF37",
  goldMuted: "#A88935",
  rose: "#D88AA6",
  tech: "#6FA9D8",
  brown: "#3D302D",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const typeScale = {
  hero: "clamp(2.5rem, 5vw + 1rem, 5rem)",
  major: "clamp(2rem, 3.5vw + 0.75rem, 3.5rem)",
  section: "clamp(1.625rem, 2vw + 0.75rem, 2.5rem)",
  subhead: "clamp(1.375rem, 1.25vw + 0.75rem, 1.75rem)",
  body: "clamp(0.9375rem, 0.35vw + 0.85rem, 1.125rem)",
  small: "0.875rem",
  caption: "0.75rem",
} as const;

export const environmentStyles = {
  dark: {
    background: colors.background,
    accent: colors.gold,
  },
  technical: {
    background: "#0D1218",
    accent: colors.tech,
  },
  warm: {
    background: "#14110F",
    accent: colors.goldMuted,
  },
} as const;
