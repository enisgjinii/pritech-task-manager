import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedExit, NativeMotion } from 'motion-on-native';
import type { AnimationProps, TransitionProps } from 'motion-on-native/lib/types/types';

import {
  listItemDelay,
  motionPresets,
  MotionVariant,
} from '../../constants/animations';

type MotionViewProps = {
  children: ReactNode;
  variant?: MotionVariant;
  delay?: number;
  styles?: StyleProp<ViewStyle>;
  exit?: AnimationProps;
  animationId?: string | number;
  transition?: TransitionProps;
};

export function MotionView({
  children,
  variant = 'fadeInUp',
  delay = 0,
  styles,
  exit,
  animationId,
  transition,
}: MotionViewProps) {
  const preset = motionPresets[variant];

  return (
    <NativeMotion.View
      initial={preset.initial}
      animate={preset.animate}
      exit={exit ?? preset.exit}
      transition={{ ...preset.transition, ...transition, delay }}
      styles={styles as ViewStyle}
      animationId={animationId}
      presenceAnimation={{ entring: 'FadeInUp', exiting: 'FadeOut' }}
    >
      {children}
    </NativeMotion.View>
  );
}

type MotionScreenProps = {
  children: ReactNode;
  variant?: MotionVariant;
};

export function MotionScreen({ children, variant = 'fadeInUp' }: MotionScreenProps) {
  return (
    <MotionView variant={variant} styles={{ flex: 1 }}>
      {children}
    </MotionView>
  );
}

type MotionListItemProps = {
  children: ReactNode;
  index: number;
  animationId: string | number;
};

export function MotionListItem({
  children,
  index,
  animationId,
}: MotionListItemProps) {
  const preset = motionPresets.fadeInUp;

  return (
    <NativeMotion.View
      initial={preset.initial}
      animate={preset.animate}
      exit={{ opacity: 0, scale: 0.94, translateX: -24 }}
      transition={{
        ...preset.transition,
        delay: listItemDelay(index),
      }}
      animationId={animationId}
      presenceAnimation={{ entring: 'FadeInUp', exiting: 'FadeOutLeft' }}
    >
      {children}
    </NativeMotion.View>
  );
}

export { AnimatedExit, NativeMotion };
