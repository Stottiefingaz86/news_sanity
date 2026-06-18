/**
 * BetOnline brand tokens sourced from BOL Shadcn design system
 * (`~/BOL_SHADCN/BOL_UPDATE/design-main/components/design-customizer.tsx`)
 */
export const betOnlineBrand = {
  id: 'betonline',
  name: 'BetOnline',
  primary: '#ee3536',
  primaryHover: '#dc2a2f',
  navBg: '#2D2E2C',
  pageBg: '#ffffff',
  sidebarBg: '#2d2d2d',
  cardBg: '#ffffff',
  accentGreen: '#8ac500',
  contentBg: '#ffffff',
  contentForeground: '#0a0a0a',
  categoryRed: '#ee3536',
  mutedText: '#737373',
} as const

export type BetOnlineBrand = typeof betOnlineBrand
