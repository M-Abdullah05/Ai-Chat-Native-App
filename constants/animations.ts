import { useEffect, useRef } from 'react';
import {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// Animation Timing Constants
export const AnimationTimings = {
  fast: 200,
  normal: 300,
  medium: 500,
  slow: 800,
  verySlow: 1200,
} as const;

// Animation Delays
export const AnimationDelays = {
  none: 0,
  short: 200,
  medium: 400,
  long: 600,
  veryLong: 800,
} as const;

// Easing Presets
export const AnimationEasings = {
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  bounce: Easing.out(Easing.back(1.5)),
  spring: Easing.out(Easing.elastic(1)),
  linear: Easing.linear,
} as const;

// Fade In Animation Hook
export function useFadeInAnimation(
  delay: number = AnimationDelays.none,
  duration: number = AnimationTimings.medium
) {
  const opacity = useSharedValue(0);

  const startAnimation = () => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedStyle, startAnimation, opacity };
}

// Slide Up Animation Hook
export function useSlideUpAnimation(
  delay: number = AnimationDelays.none,
  duration: number = AnimationTimings.medium,
  distance: number = 20
) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(distance);

  const startAnimation = () => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration, easing: AnimationEasings.easeOut })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, startAnimation, opacity, translateY };
}

// Fade In + Slide Up Combined Hook
export function useFadeInSlideUp(
  delay: number = AnimationDelays.none,
  duration: number = AnimationTimings.medium,
  distance: number = 20,
  autoStart: boolean = true
) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(distance);
  const hasStartedRef = useRef(false);

  const startAnimation = () => {
    if (hasStartedRef.current) return; // Prevent restarting
    hasStartedRef.current = true;
    
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: AnimationEasings.easeOut }));
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration, easing: AnimationEasings.easeOut })
    );
  };

  // Auto-start animation if enabled
  useEffect(() => {
    if (autoStart && !hasStartedRef.current) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, startAnimation, opacity, translateY };
}

// Scale Animation Hook
export function useScaleAnimation(
  delay: number = AnimationDelays.none,
  duration: number = AnimationTimings.medium,
  initialScale: number = 0,
  finalScale: number = 1,
  easing: typeof AnimationEasings.bounce = AnimationEasings.bounce,
  autoStart: boolean = true
) {
  const scale = useSharedValue(initialScale);
  const opacity = useSharedValue(0);
  const hasStartedRef = useRef(false);

  const startAnimation = () => {
    if (hasStartedRef.current) return; // Prevent restarting
    hasStartedRef.current = true;
    
    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(finalScale * 0.8, { duration: duration * 0.6, easing }),
        withTiming(finalScale, { duration: duration * 0.4, easing: AnimationEasings.easeOut })
      )
    );
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: AnimationEasings.easeOut }));
  };

  // Auto-start animation if enabled
  useEffect(() => {
    if (autoStart && !hasStartedRef.current) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, startAnimation, scale, opacity };
}

// Pulse Animation Hook
export function usePulseAnimation(
  minScale: number = 1,
  maxScale: number = 1.3,
  duration: number = 2000,
  repeat: boolean = true
) {
  const scale = useSharedValue(minScale);
  const opacity = useSharedValue(0.3);

  const startAnimation = () => {
    if (repeat) {
      scale.value = withRepeat(
        withSequence(
          withTiming(maxScale, { duration, easing: AnimationEasings.easeOut }),
          withTiming(minScale, { duration, easing: AnimationEasings.easeIn })
        ),
        -1,
        false
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.1, { duration }),
          withTiming(0.3, { duration })
        ),
        -1,
        false
      );
    } else {
      scale.value = withTiming(maxScale, { duration, easing: AnimationEasings.easeOut });
      opacity.value = withTiming(0.1, { duration });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, startAnimation, scale, opacity };
}

// Ring Pulse Animation (for splash screen rings)
export function useRingPulseAnimation(
  ringIndex: number,
  baseScale: number = 1,
  maxScale: number = 1.5,
  baseOpacity: number = 0.3,
  minOpacity: number = 0.05,
  duration: number = 2000,
  autoStart: boolean = true
) {
  const scale = useSharedValue(baseScale);
  const opacity = useSharedValue(baseOpacity);
  const hasStartedRef = useRef(false);

  const startAnimation = () => {
    if (hasStartedRef.current) return; // Prevent restarting
    hasStartedRef.current = true;
    
    scale.value = withRepeat(
      withSequence(
        withTiming(maxScale, {
          duration: duration,
          easing: AnimationEasings.easeOut,
        }),
        withTiming(baseScale, {
          duration: duration,
          easing: AnimationEasings.easeIn,
        })
      ),
      -1,
      false
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(minOpacity, { duration: duration, easing: AnimationEasings.easeOut }),
        withTiming(baseOpacity, { duration: duration, easing: AnimationEasings.easeIn })
      ),
      -1,
      false
    );
  };

  // Auto-start animation if enabled
  useEffect(() => {
    if (autoStart && !hasStartedRef.current) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, startAnimation, scale, opacity };
}

// Utility: Apply animation to shared value
export function animateValue(
  value: SharedValue<number>,
  toValue: number,
  config: {
    delay?: number;
    duration?: number;
    easing?: typeof AnimationEasings.easeOut;
  } = {}
) {
  const { delay = 0, duration = AnimationTimings.medium, easing = AnimationEasings.easeOut } =
    config;
  value.value = withDelay(delay, withTiming(toValue, { duration, easing }));
}

// Utility: Create sequence animation
export function createSequenceAnimation(
  values: { value: SharedValue<number>; to: number; duration?: number }[],
  baseDelay: number = 0
) {
  values.forEach((item, index) => {
    const delay = baseDelay + (index > 0 ? values[index - 1].duration || AnimationTimings.medium : 0);
    item.value.value = withDelay(
      delay,
      withTiming(item.to, { duration: item.duration || AnimationTimings.medium })
    );
  });
}

