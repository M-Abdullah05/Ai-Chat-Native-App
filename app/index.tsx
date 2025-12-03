import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
    AnimationDelays,
    AnimationTimings,
    useFadeInSlideUp,
    useRingPulseAnimation,
    useScaleAnimation,
} from '@/constants/animations';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Reusable animations (auto-start enabled by default)
  const ring1 = useRingPulseAnimation(0, 1, 1.3, 0.3, 0.1, 2000, true);
  const ring2 = useRingPulseAnimation(1, 1, 1.4, 0.2, 0.05, 2200, true);
  const ring3 = useRingPulseAnimation(2, 1, 1.5, 0.1, 0.05, 2400, true);
  const voiceButton = useScaleAnimation(
    AnimationDelays.short,
    AnimationTimings.medium,
    0,
    1,
    undefined,
    true
  );
  const title1 = useFadeInSlideUp(AnimationDelays.veryLong, AnimationTimings.medium, 20, true);
  const title2 = useFadeInSlideUp(1000, AnimationTimings.medium, 20, true);
  const description = useFadeInSlideUp(1200, AnimationTimings.medium, 20, true);
  const buttons = useFadeInSlideUp(800, AnimationTimings.medium, 20, true);

  const backgroundColor = isDark ? Colors.dark.background : Colors.light.background;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const buttonColor = Colors.light.tabIconSelected;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Voice Command Button with Rings */}
      <View style={styles.voiceCommandContainer}>
        {/* Animated Rings */}
        <Animated.View style={[styles.ring, styles.ring1, ring1.animatedStyle]} />
        <Animated.View style={[styles.ring, styles.ring2, ring2.animatedStyle]} />
        <Animated.View style={[styles.ring, styles.ring3, ring3.animatedStyle]} />
        
        {/* Main Voice Button */}
        <Animated.View style={voiceButton.animatedStyle}>
          <TouchableOpacity style={[styles.voiceButton, { backgroundColor: buttonColor }]} activeOpacity={0.8}>
            <IconSymbol name="message.fill" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.titleLine1, { color: textColor, opacity: 0.7 }, title1.animatedStyle]}>
          Effortless control with
        </Animated.Text>
        <Animated.Text style={[styles.titleLine2, { color: textColor }, title2.animatedStyle]}>
        Echo
        </Animated.Text>
      </View>

      {/* Description */}
      <Animated.Text style={[styles.description, { color: textColor, opacity: 0.7 }, description.animatedStyle]}>
        At Echo, we believe in the power of knowledge to transform the way you work
      </Animated.Text>

      {/* Action Buttons */}
      <Animated.View style={[styles.buttonContainer, buttons.animatedStyle]}>
        <Button
          title="Sign Up"
          href="/auth/sign-up"
          variant="primary"
          size="medium"
          fullWidth={true}
          style={styles.signUpButtonStyle}
          textStyle={styles.signUpButtonText}
        />
        <Button
          title="Sign in"
          href="/auth/sign-in"
          variant="primary"
          size="medium"
          fullWidth={true}
          style={styles.signInButtonStyle}
          textStyle={styles.signInButtonText}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  voiceCommandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    width: 200,
    height: 200,
  },
  ring: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 1,
  },
  ring1: {
    width: 140,
    height: 140,
    borderColor: '#B0594A',
  },
  ring2: {
    width: 160,
    height: 160,
    borderColor: '#B0594A',
  },
  ring3: {
    width: 180,
    height: 180,
    borderColor: '#B0594A',
  },
  voiceButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#B0594A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleLine1: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 4,
  },
  titleLine2: {
    fontSize: 36,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonStyle: {
    backgroundColor: '#B0594A',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    borderWidth: 0,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signInButtonStyle: {
    backgroundColor: '#B0594A',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    borderWidth: 0,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

