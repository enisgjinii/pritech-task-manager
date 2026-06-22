import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '../types/Task';

const STORAGE_KEY = '@pritech_tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function addTask(task: Task): Promise<Task[]> {
  const tasks = await loadTasks();
  const updated = [task, ...tasks];
  await saveTasks(updated);
  return updated;
}

export async function updateTask(updatedTask: Task): Promise<Task[]> {
  const tasks = await loadTasks();
  const updated = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task,
  );
  await saveTasks(updated);
  return updated;
}

export async function deleteTask(taskId: string): Promise<Task[]> {
  const tasks = await loadTasks();
  const updated = tasks.filter((task) => task.id !== taskId);
  await saveTasks(updated);
  return updated;
}

export async function toggleTaskCompletion(taskId: string): Promise<Task[]> {
  const tasks = await loadTasks();
  const updated = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );
  await saveTasks(updated);
  return updated;
}
