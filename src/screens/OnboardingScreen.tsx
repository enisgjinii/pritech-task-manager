import { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { FadeInView, SlidePanel } from '../components/motion';
import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
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
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isFirst = step === 0;
  const isLast = step === SLIDES.length - 1;

  const finish = async () => {
    await setOnboardingComplete();
    navigation.replace('MainDrawer');
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step < SLIDES.length - 1) setStep((s) => s + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isFirst ? (
        <TouchableOpacity style={styles.topBack} onPress={goBack}>
          <Text style={styles.topBackText}>← Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.topBackPlaceholder} />
      )}

      <ScrollView contentContainerStyle={styles.content}>
        <FadeInView>
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
        </FadeInView>

        <SlidePanel panelKey={step}>
          <Text style={styles.stepLabel}>
            Step {step + 1} of {SLIDES.length}
          </Text>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
        </SlidePanel>

        <FadeInView delay={100}>
          <View style={styles.dots}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === step && styles.dotActive]}
              />
            ))}
          </View>
        </FadeInView>
      </ScrollView>

      <FadeInView delay={150} style={styles.footer}>
        {!isLast ? (
          <View style={styles.footerRow}>
            {!isFirst ? (
              <PrimaryButton
                title="Back"
                variant="outline"
                onPress={goBack}
                style={styles.footerBtnHalf}
              />
            ) : null}
            <PrimaryButton
              title="Skip"
              variant="outline"
              onPress={finish}
              style={styles.footerBtnHalf}
            />
            <PrimaryButton title="Next" onPress={goNext} style={styles.footerBtnHalf} />
          </View>
        ) : (
          <View style={styles.footerRow}>
            <PrimaryButton
              title="Back"
              variant="outline"
              onPress={goBack}
              style={styles.footerBtnHalf}
            />
            <PrimaryButton
              title="Get Started"
              onPress={finish}
              style={styles.footerBtnHalf}
            />
          </View>
        )}
      </FadeInView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topBack: {
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    topBackPlaceholder: {
      height: 40,
    },
    topBackText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.accent,
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
      marginBottom: 24,
    },
    logo: { width: 200, height: 56 },
    stepLabel: {
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
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
    footerRow: {
      flexDirection: 'row',
      gap: 8,
    },
    footerBtnHalf: {
      flex: 1,
      marginBottom: 0,
    },
  });
}
