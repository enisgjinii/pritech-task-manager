import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchRandomUsers } from '../api/publicApis';
import InputField from '../components/InputField';
import { StaggerInView } from '../components/motion';
import PrimaryButton from '../components/PrimaryButton';
import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { addStoredTask } from '../storage/taskStorage';
import { TaskOwner, TasksStackParamList } from '../types/task';
import { generateId } from '../utils/date';
import { validateTaskForm } from '../utils/validators';

type AddTaskNav = NativeStackNavigationProp<TasksStackParamList, 'AddTask'>;

export default function AddTaskScreen() {
  const navigation = useNavigation<AddTaskNav>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [people, setPeople] = useState<TaskOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<TaskOwner | undefined>(
    undefined,
  );

  const loadPeople = useCallback(async () => {
    try {
      setPeople(await fetchRandomUsers());
    } catch {
      setPeople([]);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const handleSubmit = async () => {
    const validation = validateTaskForm(title, description);
    setErrors(validation as Record<string, string>);
    if (Object.keys(validation).length > 0) return;

    setSaving(true);
    try {
      await addStoredTask({
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        owner: selectedOwner,
        source: 'manual',
      });
      navigation.navigate('Home');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <StaggerInView index={0}>
          <InputField
            label="Title"
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
            maxLength={100}
          />
          </StaggerInView>
          <StaggerInView index={1}>
          <InputField
            label="Description"
            placeholder="Enter task description"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
          </StaggerInView>

          <StaggerInView index={2}>
          <Text style={styles.sectionTitle}>Suggested People (optional)</Text>
          <Text style={styles.sectionHint}>Random User API</Text>
          </StaggerInView>
          {people.map((person, index) => {
            const selected = selectedOwner?.email === person.email;
            return (
              <StaggerInView key={person.email} index={3 + index}>
              <TouchableOpacity
                style={[styles.personRow, selected && styles.personSelected]}
                onPress={() =>
                  setSelectedOwner(selected ? undefined : person)
                }
              >
                <Image source={{ uri: person.avatar }} style={styles.avatar} />
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{person.name}</Text>
                  <Text style={styles.personEmail}>{person.email}</Text>
                </View>
              </TouchableOpacity>
              </StaggerInView>
            );
          })}

          <StaggerInView index={3 + people.length}>
          <PrimaryButton
            title="Add Task"
            onPress={handleSubmit}
            loading={saving}
            style={styles.submit}
          />
          </StaggerInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { padding: 16 },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 10,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  personSelected: { borderColor: colors.accent, backgroundColor: colors.accentLight },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  personInfo: { flex: 1 },
  personName: { fontSize: 14, fontWeight: '600', color: colors.text },
  personEmail: { fontSize: 12, color: colors.textSecondary },
  submit: { marginTop: 12 },
  });
}
