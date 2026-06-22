import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { FadeInView, StaggerInView } from '../components/motion';
import ScreenHeader from '../components/ScreenHeader';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { resetToOnboarding } from '../navigation/navigationRef';
import { clearAllAppCache } from '../storage/appCache';
import { resetOnboarding } from '../storage/onboardingStorage';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleReplayOnboarding = async () => {
    await resetOnboarding();
    resetToOnboarding();
  };

  const handleClearAllCache = () => {
    Alert.alert(
      'Clear All App Data',
      'This will delete all tasks and reset onboarding. You will see the welcome screens again.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllAppCache();
            resetToOnboarding();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <FadeInView>
          <Text style={styles.subheading}>
            Manage your local app data and preferences.
          </Text>
        </FadeInView>

        <StaggerInView index={1}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Appearance</Text>
            <ThemeSelector />
          </View>
        </StaggerInView>

        <StaggerInView index={2}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>App Data</Text>
            <Text style={styles.cardBody}>
              Tasks and onboarding status are stored locally on your device using
              AsyncStorage.
            </Text>

            <PrimaryButton
              title="View Onboarding Again"
              variant="outline"
              onPress={handleReplayOnboarding}
              style={styles.btn}
            />
            <PrimaryButton
              title="Clear All App Data"
              variant="danger"
              onPress={handleClearAllCache}
              style={styles.btn}
            />
            <Text style={styles.hint}>Clears saved tasks and resets onboarding.</Text>
          </View>
        </StaggerInView>

        <StaggerInView index={3}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>About</Text>
            <Text style={styles.cardBody}>
              PRITECH Task Manager — a personal task app powered by 15 free public APIs.
            </Text>
          </View>
        </StaggerInView>
      </ScrollView>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 16, paddingBottom: 32 },
    subheading: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 20,
      lineHeight: 20,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    cardBody: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
      marginBottom: 14,
    },
    btn: { marginBottom: 10 },
    hint: {
      fontSize: 12,
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
}
