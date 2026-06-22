import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import { RootStackParamList } from '../types/task';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

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
