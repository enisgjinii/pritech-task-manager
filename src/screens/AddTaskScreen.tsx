import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MotionScreen, MotionView } from '../components/motion';
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
  const theme = useTheme();
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
    <MotionScreen variant="slideInRight">
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={['bottom']}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <MotionView variant="fadeInUp" delay={0}>
              <TextInput
                label="Title"
                placeholder="Enter task title"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
                error={!!errors.title}
                maxLength={100}
                style={styles.input}
              />
              <HelperText type="error" visible={!!errors.title}>
                {errors.title}
              </HelperText>
            </MotionView>

            <MotionView variant="fadeInUp" delay={80}>
              <TextInput
                label="Description"
                placeholder="Enter task description"
                mode="outlined"
                value={description}
                onChangeText={setDescription}
                error={!!errors.description}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
              />
              <HelperText type="error" visible={!!errors.description}>
                {errors.description}
              </HelperText>
            </MotionView>

            <MotionView variant="fadeInUp" delay={160}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={saving}
                disabled={saving}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Add Task
              </Button>
            </MotionView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </MotionScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  textArea: {
    minHeight: 120,
  },
  button: {
    marginTop: 8,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});
