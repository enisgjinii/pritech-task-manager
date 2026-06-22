import { AnimatePresence, MotiView, type MotiTransition } from 'moti';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

const timing = (duration: number, delay = 0): MotiTransition => ({
  type: 'timing',
  duration,
  delay,
});

type FadeInViewProps = {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

export function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={timing(400, delay)}
      style={style}
    >
      {children}
    </MotiView>
  );
}

type StaggerInViewProps = {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
  step?: number;
};

export function StaggerInView({
  children,
  index = 0,
  style,
  step = 50,
}: StaggerInViewProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={timing(420, index * step)}
      style={style}
    >
      {children}
    </MotiView>
  );
}

type SlidePanelProps = {
  children: ReactNode;
  panelKey: string | number;
  style?: StyleProp<ViewStyle>;
};

export function SlidePanel({ children, panelKey, style }: SlidePanelProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        key={panelKey}
        from={{ opacity: 0, translateX: 28 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -28 }}
        transition={timing(320)}
        style={style}
      >
        {children}
      </MotiView>
    </AnimatePresence>
  );
}

type ScaleInViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScaleInView({ children, style }: ScaleInViewProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={timing(350)}
      style={style}
    >
      {children}
    </MotiView>
  );
}
