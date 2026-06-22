import type { AnimationProps, TransitionProps } from 'motion-on-native/lib/types/types';

export type MotionVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'scaleIn'
  | 'slideInRight'
  | 'slideInLeft';

interface MotionPreset {
  initial: AnimationProps;
  animate: AnimationProps;
  exit?: AnimationProps;
  transition: TransitionProps;
}

export const motionPresets: Record<MotionVariant, MotionPreset> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'timing', duration: 280 },
  },
  fadeInUp: {
    initial: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
    exit: { opacity: 0, translateY: 12 },
    transition: { type: 'spring', damping: 20, stiffness: 140 },
  },
  fadeInDown: {
    initial: { opacity: 0, translateY: -16 },
    animate: { opacity: 1, translateY: 0 },
    exit: { opacity: 0, translateY: -10 },
    transition: { type: 'spring', damping: 20, stiffness: 140 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { type: 'spring', damping: 16, stiffness: 160 },
  },
  slideInRight: {
    initial: { opacity: 0, translateX: 28 },
    animate: { opacity: 1, translateX: 0 },
    exit: { opacity: 0, translateX: 20 },
    transition: { type: 'spring', damping: 22, stiffness: 130 },
  },
  slideInLeft: {
    initial: { opacity: 0, translateX: -28 },
    animate: { opacity: 1, translateX: 0 },
    exit: { opacity: 0, translateX: -20 },
    transition: { type: 'spring', damping: 22, stiffness: 130 },
  },
};

export const listItemDelay = (index: number, cap = 240): number =>
  Math.min(index * 45, cap);
