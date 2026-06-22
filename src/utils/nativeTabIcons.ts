import { Platform } from 'react-native';
import type { NativeBottomTabIcon } from '@react-navigation/bottom-tabs/unstable';
import type { SFSymbol } from 'sf-symbols-typescript';

type SfPair = {
  default: SFSymbol;
  selected: SFSymbol;
};

export function nativeTabIcon(
  sf: SfPair,
  androidSource: number,
): ({ focused }: { focused: boolean }) => NativeBottomTabIcon {
  return ({ focused }) => {
    if (Platform.OS === 'ios') {
      return {
        type: 'sfSymbol',
        name: focused ? sf.selected : sf.default,
      };
    }

    return {
      type: 'image',
      source: androidSource,
    };
  };
}

export const tasksTabIcon = nativeTabIcon(
  { default: 'checklist', selected: 'checklist' },
  require('../../assets/images/tabIcons/home.png'),
);

export const apiHubTabIcon = nativeTabIcon(
  { default: 'globe', selected: 'globe' },
  require('../../assets/images/tabIcons/explore.png'),
);

export const settingsTabIcon = nativeTabIcon(
  { default: 'gearshape', selected: 'gearshape.fill' },
  require('../../assets/images/favicon.png'),
);
