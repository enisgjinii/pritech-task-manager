import { resetOnboarding } from './onboardingStorage';
import { clearStoredTasks } from './taskStorage';

/** Clears all locally stored app data (tasks + onboarding flag). */
export async function clearAllAppCache(): Promise<void> {
  await clearStoredTasks();
  await resetOnboarding();
}
