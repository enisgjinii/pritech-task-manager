import { useMemo } from 'react';
import { View } from 'react-native';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTaskFab from '../components/AddTaskFab';
import DrawerToggleButton from '../components/DrawerToggleButton';
import { useTheme } from '../context/ThemeContext';
import AddTaskScreen from '../screens/AddTaskScreen';
import ApiHubScreen from '../screens/ApiHubScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import { TabParamList, TasksStackParamList } from '../types/task';
import {
  apiHubTabIcon,
  settingsTabIcon,
  tasksTabIcon,
} from '../utils/nativeTabIcons';

const Tab = createNativeBottomTabNavigator<TabParamList>();
const TasksStack = createNativeStackNavigator<TasksStackParamList>();

function TasksStackNavigator() {
  const { colors } = useTheme();

  const stackScreenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.headerText,
      headerTitleStyle: { fontWeight: '600' as const },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: colors.background },
      headerLeft: () => <DrawerToggleButton />,
    }),
    [colors],
  );

  return (
    <TasksStack.Navigator screenOptions={stackScreenOptions}>
      <TasksStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My Tasks' }}
      />
      <TasksStack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task Details' }}
      />
      <TasksStack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ title: 'Add New Task' }}
      />
    </TasksStack.Navigator>
  );
}

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textMuted,
          lazy: true,
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TasksStackNavigator}
          options={{
            tabBarLabel: 'Tasks',
            tabBarIcon: tasksTabIcon,
          }}
        />
        <Tab.Screen
          name="ApiHub"
          component={ApiHubScreen}
          options={{
            tabBarLabel: 'API Hub',
            tabBarIcon: apiHubTabIcon,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: settingsTabIcon,
          }}
        />
      </Tab.Navigator>
      <AddTaskFab />
    </View>
  );
}
