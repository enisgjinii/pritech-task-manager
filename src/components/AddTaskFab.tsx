import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import {
  isAddTaskScreenOpen,
  navigateToAddTask,
} from '../navigation/navigationRef';

const TAB_BAR_HEIGHT = 49;

export default function AddTaskFab() {
  const insets = useSafeAreaInsets();

  const isAddTaskOpen = useNavigationState(isAddTaskScreenOpen);

  if (isAddTaskOpen) return null;

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        { bottom: insets.bottom + TAB_BAR_HEIGHT + 8 },
      ]}
      onPress={navigateToAddTask}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel="Add new task"
    >
      <Ionicons name="add" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
});
