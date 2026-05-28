import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { subDays, format, parseISO } from 'date-fns';
import { colors, spacing, radius, fontSize } from '../constants/theme';

interface Props {
  completions: string[];
  color: string;
}

const DAYS = 28;
const COLS = 7;

export function CalendarHeatmap({ completions, color }: Props) {
  const completionSet = new Set(completions);
  const today = new Date();

  const cells = Array.from({ length: DAYS }, (_, i) => {
    const date = subDays(today, DAYS - 1 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const done = completionSet.has(dateStr);
    const dayLabel = format(date, 'EEE').slice(0, 1);
    return { dateStr, done, dayLabel, isToday: i === DAYS - 1 };
  });

  // Split into rows of 7
  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += COLS) {
    rows.push(cells.slice(i, i + COLS));
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>ÚLTIMOS 28 DIAS</Text>
      {/* Day headers */}
      <View style={styles.row}>
        {dayLabels.map((d, i) => (
          <Text key={i} style={styles.dayHeader}>{d}</Text>
        ))}
      </View>
      {/* Grid */}
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((cell) => (
            <View
              key={cell.dateStr}
              style={[
                styles.cell,
                cell.done && { backgroundColor: color },
                cell.isToday && styles.todayBorder,
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  dayHeader: {
    width: 32,
    textAlign: 'center',
    fontSize: 10,
    color: colors.textDim,
    fontWeight: '600',
  },
  cell: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
  },
  todayBorder: {
    borderWidth: 2,
    borderColor: colors.text,
  },
});
