import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { colors } from '../constants/colors';
import { RootStackParamList } from '../types/Task';
import { generateId } from '../utils/date';
import { addTask } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTask'>;

interface FormErrors {
  title?: string;
  description?: string;
}

function validateForm(title: string, description: string): FormErrors {
  const errors: FormErrors = {};
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    errors.title = 'Title is required.';
  } else if (trimmedTitle.length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!trimmedDescription) {
    errors.description = 'Description is required.';
  } else if (trimmedDescription.length < 5) {
    errors.description = 'Description must be at least 5 characters.';
  }

  return errors;
}

export default function AddTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateForm(title, description);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await addTask({
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
      navigation.goBack();
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
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <AppInput
            label="Title"
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
            maxLength={100}
          />

          <AppInput
            label="Description"
            placeholder="Enter task description"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.textArea}
          />

          <AppButton
            title="Add Task"
            onPress={handleSubmit}
            loading={saving}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
});
