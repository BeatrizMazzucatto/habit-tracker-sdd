// ─── HabitFlow Design Tokens ──────────────────────────────────────────────────
// Aesthetic: Dark editorial with vivid accent punches
// Inspired by late-night productivity journals + brutalist type

export const colors = {
  bg: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceAlt: '#222222',
  border: '#2A2A2A',
  borderHover: '#3A3A3A',

  text: '#F0EDE8',
  textMuted: '#7A7775',
  textDim: '#4A4744',

  accent: '#E8FF47',       // Neon lime — primary CTA
  accentDim: '#9EAD2E',

  danger: '#FF4444',

  // Habit palette
  red: '#FF6B6B',
  yellow: '#FFD93D',
  green: '#6BCB77',
  blue: '#4D96FF',
  purple: '#C77DFF',
  orange: '#FF9F43',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 9999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 42,
} as const;

export const HABIT_COLORS = [
  colors.red,
  colors.yellow,
  colors.green,
  colors.blue,
  colors.purple,
  colors.orange,
] as const;

export const HABIT_EMOJIS = [
  '💪', '📚', '🧘', '🏃', '💧', '🥗',
  '✍️', '🎨', '🎸', '🌿', '😴', '🧹',
  '💊', '🌅', '🐕', '🚴', '🎯', '📝',
];
