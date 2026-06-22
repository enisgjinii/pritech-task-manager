import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '../types/task';

const TASKS_KEY = '@pritech_tasks';

export async function getStoredTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export async function clearStoredTasks(): Promise<void> {
  await AsyncStorage.removeItem(TASKS_KEY);
}

export async function addStoredTask(task: Task): Promise<Task[]> {
  const tasks = await getStoredTasks();
  const updated = [task, ...tasks];
  await saveStoredTasks(updated);
  return updated;
}

export async function updateStoredTask(task: Task): Promise<Task[]> {
  const tasks = await getStoredTasks();
  const updated = tasks.map((t) => (t.id === task.id ? task : t));
  await saveStoredTasks(updated);
  return updated;
}

export async function deleteStoredTask(taskId: string): Promise<Task[]> {
  const tasks = await getStoredTasks();
  const updated = tasks.filter((t) => t.id !== taskId);
  await saveStoredTasks(updated);
  return updated;
}

export async function toggleStoredTask(taskId: string): Promise<Task[]> {
  const tasks = await getStoredTasks();
  const updated = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t,
  );
  await saveStoredTasks(updated);
  return updated;
}

export async function mergeImportedTasks(imported: Task[]): Promise<Task[]> {
  const existing = await getStoredTasks();
  const existingIds = new Set(existing.map((t) => t.id));
  const newTasks = imported.filter((t) => !existingIds.has(t.id));
  const updated = [...newTasks, ...existing];
  await saveStoredTasks(updated);
  return updated;
}
