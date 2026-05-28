import { create } from 'zustand';
import { format, parseISO, differenceInDays, isToday } from 'date-fns';
import type { Habit, HabitWithStats, CreateHabitInput } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = () => format(new Date(), 'yyyy-MM-dd');

function computeStreak(completions: string[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (completions.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const sorted = [...completions].sort().reverse(); // newest first
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  let prev: Date | null = null;

  for (const dateStr of sorted) {
    const d = parseISO(dateStr);
    if (!prev) {
      // First entry must be today or yesterday to count as current
      const diff = differenceInDays(new Date(), d);
      if (diff <= 1) {
        currentStreak = 1;
        streak = 1;
      } else {
        streak = 1;
      }
    } else {
      const diff = differenceInDays(prev, d);
      if (diff === 1) {
        streak++;
        if (currentStreak > 0) currentStreak++;
      } else {
        if (streak > longestStreak) longestStreak = streak;
        streak = 1;
      }
    }
    prev = d;
    if (streak > longestStreak) longestStreak = streak;
  }

  return { currentStreak, longestStreak };
}

function enrichHabit(h: Habit): HabitWithStats {
  const { currentStreak, longestStreak } = computeStreak(h.completions);
  const isCompletedToday = h.completions.includes(today());
  const daysSinceCreation = Math.max(
    1,
    differenceInDays(new Date(), parseISO(h.createdAt)) + 1
  );
  const completionRate = Math.min(
    1,
    h.completions.length / daysSinceCreation
  );

  return { ...h, currentStreak, longestStreak, completionRate, isCompletedToday };
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface HabitStore {
  habits: Habit[];
  hydrated: boolean;

  // Actions
  addHabit: (input: CreateHabitInput) => void;
  deleteHabit: (id: string) => void;
  toggleToday: (id: string) => void;

  // Derived
  getHabitsWithStats: () => HabitWithStats[];
  getHabitById: (id: string) => HabitWithStats | undefined;

  // Persistence
  hydrate: (habits: Habit[]) => void;
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  hydrated: false,

  addHabit: (input) => {
    const newHabit: Habit = {
      ...input,
      id: `habit_${Date.now()}`,
      createdAt: today(),
      completions: [],
    };
    set((s) => ({ habits: [...s.habits, newHabit] }));
  },

  deleteHabit: (id) => {
    set((s) => ({ habits: s.habits.filter((h) => h.id !== id) }));
  },

  toggleToday: (id) => {
    const todayStr = today();
    set((s) => ({
      habits: s.habits.map((h) => {
        if (h.id !== id) return h;
        const done = h.completions.includes(todayStr);
        return {
          ...h,
          completions: done
            ? h.completions.filter((d) => d !== todayStr)
            : [...h.completions, todayStr],
        };
      }),
    }));
  },

  getHabitsWithStats: () => get().habits.map(enrichHabit),

  getHabitById: (id) => {
    const h = get().habits.find((h) => h.id === id);
    return h ? enrichHabit(h) : undefined;
  },

  hydrate: (habits) => set({ habits, hydrated: true }),
}));
