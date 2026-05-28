import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useHabitStore } from '../store/habitStore';
import { HabitCard } from '../components/HabitCard';
import { AddHabitModal } from '../components/AddHabitModal';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import type { CreateHabitInput } from '../types';

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const { hydrated, addHabit, deleteHabit, toggleToday, getHabitsWithStats } =
    useHabitStore();

  const habits = getHabitsWithStats();
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  const todayLabel = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const handleAdd = useCallback(
    (input: CreateHabitInput) => {
      addHabit(input);
    },
    [addHabit]
  );

  const handlePress = useCallback(
    (id: string) => {
      router.push(`/habit/${id}`);
    },
    [router]
  );

  if (!hydrated) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>{todayLabel}</Text>
          <Text style={styles.heroText}>
            {habits.length === 0
              ? 'Começar'
              : `${completedToday}/${habits.length}`}
            {habits.length > 0 && (
              <Text style={styles.heroSub}> feitos</Text>
            )}
          </Text>
        </View>

        {/* Progress ring indicator */}
        {habits.length > 0 && (
          <View style={styles.ringWrapper}>
            <View
              style={[
                styles.ring,
                {
                  borderColor:
                    completedToday === habits.length
                      ? colors.accent
                      : colors.border,
                },
              ]}
            >
              <Text style={styles.ringPct}>
                {Math.round((completedToday / habits.length) * 100)}%
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Habit list */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {habits.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🌱</Text>
            <Text style={styles.emptyTitle}>Nenhum hábito ainda</Text>
            <Text style={styles.emptyBody}>
              Adicione seu primeiro hábito e comece sua jornada hoje.
            </Text>
          </View>
        ) : (
          habits.map((h) => (
            <HabitCard
              key={h.id}
              habit={h}
              onToggle={toggleToday}
              onDelete={deleteHabit}
              onPress={handlePress}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAdd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontWeight: '500',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  heroText: {
    fontSize: fontSize.hero,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -2,
    lineHeight: 46,
  },
  heroSub: {
    fontSize: fontSize.xl,
    fontWeight: '400',
    color: colors.textMuted,
    letterSpacing: -0.5,
  },
  ringWrapper: {
    marginBottom: 4,
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPct: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxl * 2,
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  emptyBody: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    fontWeight: '300',
    color: '#0D0D0D',
    lineHeight: 34,
  },
});
