import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHabitStore } from '../store/habitStore';
import type { Habit } from '../types';

const STORAGE_KEY = '@habitflow:habits';

export function usePersistence() {
  const { habits, hydrate, hydrated } = useHabitStore();
  const isFirstRender = useRef(true);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed: Habit[] = JSON.parse(raw);
          hydrate(parsed);
        } else {
          hydrate([]);
        }
      })
      .catch(() => hydrate([]));
  }, []);

  // Persist on every change (skip first render)
  useEffect(() => {
    if (!hydrated) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits)).catch(
      console.error
    );
  }, [habits, hydrated]);
}
