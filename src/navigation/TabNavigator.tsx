import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const NativeTab = createNativeBottomTabNavigator<TabParamList>();
const JsTab = createBottomTabNavigator<TabParamList>();
const TasksStack = createNativeStackNavigator<TasksStackParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const ANDROID_TAB_ICONS: Record<
  keyof TabParamList,
  { default: IoniconName; focused: IoniconName }
> = {
  Tasks: { default: 'checkbox-outline', focused: 'checkbox' },
  ApiHub: { default: 'planet-outline', focused: 'planet' },
  Settings: { default: 'settings-outline', focused: 'settings' },
};

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

function IosTabNavigator() {
  const { colors } = useTheme();

  return (
    <NativeTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        lazy: true,
      }}
    >
      <NativeTab.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{ tabBarLabel: 'Tasks', tabBarIcon: tasksTabIcon }}
      />
      <NativeTab.Screen
        name="ApiHub"
        component={ApiHubScreen}
        options={{ tabBarLabel: 'API Hub', tabBarIcon: apiHubTabIcon }}
      />
      <NativeTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings', tabBarIcon: settingsTabIcon }}
      />
    </NativeTab.Navigator>
  );
}

function AndroidTabNavigator() {
  const { colors } = useTheme();

  return (
    <JsTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        lazy: true,
      }}
    >
      <JsTab.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused
                  ? ANDROID_TAB_ICONS.Tasks.focused
                  : ANDROID_TAB_ICONS.Tasks.default
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <JsTab.Screen
        name="ApiHub"
        component={ApiHubScreen}
        options={{
          tabBarLabel: 'API Hub',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused
                  ? ANDROID_TAB_ICONS.ApiHub.focused
                  : ANDROID_TAB_ICONS.ApiHub.default
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <JsTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused
                  ? ANDROID_TAB_ICONS.Settings.focused
                  : ANDROID_TAB_ICONS.Settings.default
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </JsTab.Navigator>
  );
}

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {Platform.OS === 'ios' ? <IosTabNavigator /> : <AndroidTabNavigator />}
      <AddTaskFab />
    </View>
  );
}
