import { NavigatorScreenParams } from '@react-navigation/native';

export type TaskOwner = {
  name: string;
  email: string;
  avatar: string;
};

export type TaskSource =
  | 'manual'
  | 'dummyjson'
  | 'jsonplaceholder'
  | 'holiday'
  | 'book'
  | 'meal';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  owner?: TaskOwner;
  source?: TaskSource;
};

export type TaskFilter = 'all' | 'active' | 'completed';

export type RootStackParamList = {
  Onboarding: undefined;
  MainDrawer: NavigatorScreenParams<DrawerParamList> | undefined;
};

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
};

export type TabParamList = {
  Tasks: NavigatorScreenParams<TasksStackParamList> | undefined;
  ApiHub: undefined;
  Settings: undefined;
};

export type TasksStackParamList = {
  Home: undefined;
  TaskDetails: { taskId: string };
  AddTask: undefined;
};

export type AddTaskParams = {
  owner?: TaskOwner;
};
