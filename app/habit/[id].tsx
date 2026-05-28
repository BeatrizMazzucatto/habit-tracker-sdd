import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useHabitStore } from '../../store/habitStore';
import { StatsCard } from '../../components/StatsCard';
import { CalendarHeatmap } from '../../components/CalendarHeatmap';
import { colors, spacing, radius, fontSize } from '../../constants/theme';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getHabitById, deleteHabit, toggleToday } = useHabitStore();

  const habit = getHabitById(id);

  if (!habit) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.notFound}>Hábito não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const createdLabel = format(parseISO(habit.createdAt), "d 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  const handleDelete = () => {
    Alert.alert(
      `Excluir "${habit.name}"?`,
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteHabit(id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Nav bar */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.emojiWrapper, { borderColor: habit.color }]}>
            <Text style={styles.emoji}>{habit.emoji}</Text>
          </View>
          <Text style={styles.name}>{habit.name}</Text>
          <Text style={styles.since}>desde {createdLabel}</Text>
        </View>

        {/* Check today button */}
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            habit.isCompletedToday && { backgroundColor: habit.color },
          ]}
          onPress={() => toggleToday(id)}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.toggleText,
              habit.isCompletedToday && { color: '#0D0D0D' },
            ]}
          >
            {habit.isCompletedToday ? '✓ Feito hoje!' : 'Marcar como feito hoje'}
          </Text>
        </TouchableOpacity>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatsCard
            label="Sequência atual"
            value={habit.currentStreak}
            sub="dias 🔥"
            accent={habit.currentStreak > 0 ? habit.color : undefined}
          />
          <View style={styles.statGap} />
          <StatsCard
            label="Maior sequência"
            value={habit.longestStreak}
            sub="dias"
          />
          <View style={styles.statGap} />
          <StatsCard
            label="Conclusão"
            value={`${Math.round(habit.completionRate * 100)}%`}
            accent={habit.completionRate > 0.7 ? habit.color : undefined}
          />
        </View>

        {/* Calendar heatmap */}
        <CalendarHeatmap
          completions={habit.completions}
          color={habit.color}
        />

        {/* Total completions */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total de conclusões</Text>
          <Text style={[styles.totalValue, { color: habit.color }]}>
            {habit.completions.length}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { padding: spacing.xs },
  backText: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  deleteText: {
    color: colors.danger,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  content: {
    padding: spacing.md,
    paddingBottom: 60,
    gap: spacing.md,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emojiWrapper: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  emoji: { fontSize: 44 },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  since: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  toggleBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 4,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  toggleText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statGap: { width: spacing.sm },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    letterSpacing: -1,
  },
  notFound: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
