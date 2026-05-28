import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import type { HabitWithStats } from '../types';

interface Props {
  habit: HabitWithStats;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (id: string) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function HabitCard({ habit, onToggle, onDelete, onPress }: Props) {
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const handleToggle = useCallback(() => {
    checkScale.value = withSequence(
      withSpring(1.4, { damping: 4 }),
      withSpring(1, { damping: 8 })
    );
    onToggle(habit.id);
  }, [habit.id, onToggle]);

  const handleLongPress = useCallback(() => {
    Alert.alert(
      `Excluir "${habit.name}"?`,
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(habit.id),
        },
      ]
    );
  }, [habit.id, habit.name, onDelete]);

  const pct = Math.round(habit.completionRate * 100);

  return (
    <AnimatedTouchable
      style={[styles.card, cardStyle]}
      onPress={() => onPress(habit.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.85}
    >
      {/* Color accent bar */}
      <View style={[styles.accentBar, { backgroundColor: habit.color }]} />

      {/* Main row */}
      <View style={styles.row}>
        {/* Left: emoji + info */}
        <View style={styles.left}>
          <Text style={styles.emoji}>{habit.emoji}</Text>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>{habit.name}</Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>🔥 {habit.currentStreak}</Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>{pct}%</Text>
            </View>
          </View>
        </View>

        {/* Right: check button */}
        <Animated.View style={checkStyle}>
          <TouchableOpacity
            style={[
              styles.checkBtn,
              habit.isCompletedToday && {
                backgroundColor: habit.color,
                borderColor: habit.color,
              },
            ]}
            onPress={handleToggle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {habit.isCompletedToday && (
              <Text style={styles.checkMark}>✓</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${pct}%` as any,
              backgroundColor: habit.color,
            },
          ]}
        />
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.sm + 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  accentBar: {
    height: 3,
    width: '100%',
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  emoji: {
    fontSize: 28,
    marginRight: spacing.sm + 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.3,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
  metaDot: {
    color: colors.textDim,
    marginHorizontal: 5,
    fontSize: fontSize.xs,
  },
  checkBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '700',
  },
  progressBg: {
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 1,
  },
  progressFill: {
    height: 2,
    borderRadius: 1,
  },
});
