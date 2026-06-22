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
  Home: undefined;
  AddTask: { owner?: TaskOwner } | undefined;
  TaskDetails: { taskId: string };
  ApiHub: undefined;
};
