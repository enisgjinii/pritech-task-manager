export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { taskId: string };
};
