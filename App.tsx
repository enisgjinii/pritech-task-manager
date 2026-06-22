import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appTheme } from './src/constants/theme';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={appTheme}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
