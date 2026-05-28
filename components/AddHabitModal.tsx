import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, radius, fontSize, HABIT_COLORS, HABIT_EMOJIS } from '../constants/theme';
import type { CreateHabitInput, HabitColor } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (input: CreateHabitInput) => void;
}

export function AddHabitModal({ visible, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('💪');
  const [color, setColor] = useState<HabitColor>(colors.green as HabitColor);

  const reset = () => {
    setName('');
    setEmoji('💪');
    setColor(colors.green as HabitColor);
  };

  const handleSave = useCallback(() => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), emoji, color, frequency: 'daily', targetDays: 1 });
    reset();
    onClose();
  }, [name, emoji, color, onSave, onClose]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Novo Hábito</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}
            disabled={!name.trim()}
          >
            <Text style={[styles.saveText, !name.trim() && styles.saveTextDisabled]}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Preview */}
          <View style={[styles.preview, { borderColor: color }]}>
            <Text style={styles.previewEmoji}>{emoji}</Text>
            <Text style={styles.previewName} numberOfLines={1}>
              {name || 'Nome do hábito'}
            </Text>
          </View>

          {/* Name input */}
          <Text style={styles.label}>NOME</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Beber água, Ler 30min..."
            placeholderTextColor={colors.textDim}
            value={name}
            onChangeText={setName}
            maxLength={40}
            returnKeyType="done"
            autoFocus
          />

          {/* Emoji picker */}
          <Text style={styles.label}>ÍCONE</Text>
          <View style={styles.emojiGrid}>
            {HABIT_EMOJIS.map((e) => (
              <TouchableOpacity
                key={e}
                style={[
                  styles.emojiOption,
                  emoji === e && { backgroundColor: color + '33', borderColor: color },
                ]}
                onPress={() => setEmoji(e)}
              >
                <Text style={styles.emojiOptionText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color picker */}
          <Text style={styles.label}>COR</Text>
          <View style={styles.colorRow}>
            {HABIT_COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorDot,
                  { backgroundColor: c },
                  color === c && styles.colorDotSelected,
                ]}
                onPress={() => setColor(c as HabitColor)}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cancelBtn: { padding: spacing.xs },
  cancelText: { color: colors.textMuted, fontSize: fontSize.md },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  saveBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
  saveBtnDisabled: { opacity: 0.3 },
  saveText: { color: '#0D0D0D', fontWeight: '700', fontSize: fontSize.sm },
  saveTextDisabled: {},
  content: {
    padding: spacing.md,
    paddingBottom: 60,
  },
  preview: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 2,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  previewEmoji: { fontSize: 52, marginBottom: spacing.sm },
  previewName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.text,
    fontSize: fontSize.md,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emojiOption: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiOptionText: { fontSize: 24 },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
  },
  colorDotSelected: {
    borderWidth: 3,
    borderColor: colors.text,
    transform: [{ scale: 1.2 }],
  },
});
