import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}

export function StatsCard({ label, value, sub, accent }: Props) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, accent ? { color: accent } : {}]}>
        {value}
      </Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  sub: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
