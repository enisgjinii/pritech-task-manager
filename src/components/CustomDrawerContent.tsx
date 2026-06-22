import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants/colors';
import { resetToOnboarding } from '../navigation/navigationRef';
import { clearAllAppCache } from '../storage/appCache';
import { resetOnboarding } from '../storage/onboardingStorage';
import { DrawerParamList } from '../types/task';

const logo = require('../../assets/images/logo.jpg');

type DrawerRoute = keyof DrawerParamList;

const MENU_ITEMS: {
  route: DrawerRoute;
  tab?: 'Tasks' | 'ApiHub' | 'Settings';
  screen?: 'AddTask';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { route: 'Tabs', tab: 'Tasks', label: 'My Tasks', icon: 'checkbox-outline' },
  { route: 'Tabs', tab: 'ApiHub', label: 'API Hub', icon: 'planet-outline' },
  { route: 'Tabs', tab: 'Tasks', screen: 'AddTask', label: 'Add Task', icon: 'add-circle-outline' },
  { route: 'Tabs', tab: 'Settings', label: 'Settings', icon: 'settings-outline' },
];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const { navigation, state } = props;

  const tabsRoute = state.routes.find((route) => route.name === 'Tabs');
  const tabState = tabsRoute?.state;
  const activeTabName = tabState?.routes[tabState.index ?? 0]?.name;

  const activeTasksScreen =
    activeTabName === 'Tasks' && tabState?.routes[tabState.index ?? 0]?.name;

  const navigateToTab = (tab: 'Tasks' | 'ApiHub' | 'Settings', screen?: 'AddTask') => {
    if (screen) {
      navigation.navigate('Tabs', { screen: tab, params: { screen } });
    } else {
      navigation.navigate('Tabs', { screen: tab });
    }
    navigation.closeDrawer();
  };

  const handleReplayOnboarding = async () => {
    navigation.closeDrawer();
    await resetOnboarding();
    resetToOnboarding();
  };

  const handleClearCache = () => {
    navigation.closeDrawer();
    Alert.alert(
      'Clear All App Data',
      'This will delete all tasks and reset onboarding.',
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
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.appName}>PRITECH Task Manager</Text>
        <Text style={styles.tagline}>Personal tasks · Public APIs</Text>
      </View>

      <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Navigation</Text>
        {MENU_ITEMS.map((item) => {
          const isActive = item.screen
            ? activeTasksScreen === 'AddTask'
            : item.tab === activeTabName && activeTasksScreen !== 'AddTask';
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => item.tab && navigateToTab(item.tab, item.screen)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isActive ? colors.accent : colors.textSecondary}
              />
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>App</Text>

        <TouchableOpacity style={styles.menuItem} onPress={handleReplayOnboarding}>
          <Ionicons name="book-outline" size={22} color={colors.textSecondary} />
          <Text style={styles.menuLabel}>View Onboarding</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleClearCache}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
          <Text style={[styles.menuLabel, styles.dangerLabel]}>Clear All App Data</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={styles.footerText}>Swipe from left or tap menu to open</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoWrap: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  logo: { width: 140, height: 40 },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: colors.accentLight,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  menuLabelActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  dangerLabel: { color: colors.error },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
    marginHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
