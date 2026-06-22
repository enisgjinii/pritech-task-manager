import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/colors';
import { setOnboardingComplete } from '../storage/onboardingStorage';
import { RootStackParamList } from '../types/task';

const logo = require('../../assets/images/logo.jpg');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const SLIDES = [
  {
    title: 'Welcome to PRITECH Tasks',
    body: 'Organize your personal tasks in a clean, simple task manager built for productivity.',
  },
  {
    title: 'Search, Filter & Complete',
    body: 'Find tasks quickly, filter by status, and mark work as done with one tap.',
  },
  {
    title: 'Powered by Public APIs',
    body: 'Get weather, advice, learning ideas, and fun rewards from free public APIs.',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  const finish = async () => {
    await setOnboardingComplete();
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoWrap}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>

        <View style={styles.dots}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === step && styles.dotActive]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {!isLast ? (
          <>
            <PrimaryButton
              title="Skip"
              variant="outline"
              onPress={finish}
              style={styles.footerBtn}
            />
            <PrimaryButton
              title="Next"
              onPress={() => setStep((s) => s + 1)}
              style={styles.footerBtn}
            />
          </>
        ) : (
          <PrimaryButton title="Get Started" onPress={finish} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoWrap: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  logo: { width: 200, height: 56 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: { backgroundColor: colors.accent, width: 20 },
  footer: {
    padding: 20,
    gap: 10,
  },
  footerBtn: { marginBottom: 0 },
});
