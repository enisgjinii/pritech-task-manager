import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../context/ThemeContext';
import DrawerNavigator from './DrawerNavigator';
import { navigationRef } from './navigationRef';
import { isOnboardingComplete } from '../storage/onboardingStorage';
import OnboardingScreen from '../screens/OnboardingScreen';
import { RootStackParamList } from '../types/task';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { colors, isDark } = useTheme();
  const [ready, setReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const navigationTheme: Theme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme : DefaultTheme).colors,
        primary: colors.accent,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.accent,
      },
    }),
    [colors, isDark],
  );

  useEffect(() => {
    isOnboardingComplete().then((done) => {
      setShowOnboarding(!done);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={showOnboarding ? 'Onboarding' : 'MainDrawer'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
