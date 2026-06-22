import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import AppHeader from '../components/AppHeader';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import TaskListScreen from '../screens/TaskListScreen';
import { RootStackParamList } from '../types/Task';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.onPrimary,
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ headerTitle: () => <AppHeader /> }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: 'Add New Task' }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{ title: 'Task Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
