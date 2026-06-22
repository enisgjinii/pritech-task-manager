import type { NativeBottomTabIcon } from '@react-navigation/bottom-tabs/unstable';
import type { SFSymbol } from 'sf-symbols-typescript';

type SfPair = {
  default: SFSymbol;
  selected: SFSymbol;
};

/** iOS native tab bar icons (SF Symbols). Android uses Ionicons in TabNavigator. */
export function nativeTabIcon(
  sf: SfPair,
): ({ focused }: { focused: boolean }) => NativeBottomTabIcon {
  return ({ focused }) => ({
    type: 'sfSymbol',
    name: focused ? sf.selected : sf.default,
  });
}

export const tasksTabIcon = nativeTabIcon({
  default: 'checklist',
  selected: 'checklist',
});

export const apiHubTabIcon = nativeTabIcon({
  default: 'globe',
  selected: 'globe',
});

export const settingsTabIcon = nativeTabIcon({
  default: 'gearshape',
  selected: 'gearshape.fill',
});
