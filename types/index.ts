// ─── Core domain types ────────────────────────────────────────────────────────

export type HabitFrequency = 'daily' | 'weekly';

export type HabitColor =
  | '#FF6B6B'
  | '#FFD93D'
  | '#6BCB77'
  | '#4D96FF'
  | '#C77DFF'
  | '#FF9F43';

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: HabitColor;
  frequency: HabitFrequency;
  targetDays: number; // how many times per week (if weekly) or always 1 (if daily)
  createdAt: string; // ISO date string
  completions: string[]; // ISO date strings of completed days
}

export interface DayEntry {
  date: string; // 'yyyy-MM-dd'
  completed: boolean;
}

// ─── Derived / UI types ───────────────────────────────────────────────────────

export interface HabitWithStats extends Habit {
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // 0-1
  isCompletedToday: boolean;
}

export type CreateHabitInput = Omit<Habit, 'id' | 'createdAt' | 'completions'>;
