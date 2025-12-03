import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string | any;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  href,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const buttonColor = Colors.light.tabIconSelected;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;

  // Build base styles
  const baseStyles: ViewStyle = {
    ...styles.button,
    ...styles[size],
    ...(fullWidth && styles.fullWidth),
    ...(variant === 'primary' && { backgroundColor: buttonColor }),
    ...(variant === 'secondary' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: textColor,
    }),
    ...(disabled && styles.disabled),
  };
  
  // Merge with custom style, custom style takes precedence
  const buttonStyles = style ? { ...baseStyles, ...style } : baseStyles;

  // Build base text styles
  const baseTextStyles: TextStyle = {
    ...styles.text,
    ...styles[`${size}Text`],
    ...(variant === 'primary' && styles.primaryText),
    ...(variant === 'secondary' && { color: textColor }),
    ...(disabled && styles.disabledText),
  };
  
  // Merge with custom text style, custom style takes precedence
  const textStyles = textStyle ? { ...baseTextStyles, ...textStyle } : baseTextStyles;

  const buttonElement = (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#B0594A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fullWidth: {
    width: '100%',
  },
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  disabled: {
    opacity: 0.5,
    elevation: 0,
  },
  disabledText: {
    opacity: 0.7,
  },
});

