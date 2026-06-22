import {
  CommonActions,
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

import { RootStackParamList } from '../types/task';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type NavState = NavigationState | PartialState<NavigationState>;

function isAddTaskActive(state: NavState): boolean {
  const route = state.routes[state.index ?? 0];
  if (route.name === 'AddTask') return true;
  if (route.state) return isAddTaskActive(route.state);
  return false;
}

export function isAddTaskScreenOpen(state: NavState): boolean {
  return isAddTaskActive(state);
}

export function navigateToAddTask() {
  if (!navigationRef.isReady()) return;

  navigationRef.navigate('MainDrawer', {
    screen: 'Tabs',
    params: {
      screen: 'Tasks',
      params: { screen: 'AddTask' },
    },
  });
}

export function resetToOnboarding() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      }),
    );
  }
}

export function navigateToMainApp() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainDrawer' }],
      }),
    );
  }
}
