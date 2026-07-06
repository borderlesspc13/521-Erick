import { Text as RNText, TextProps } from 'react-native';
import { colors, typography } from '@/core/theme';

type TextVariant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

export function AppText({
  variant = 'body',
  color = colors.text.primary,
  style,
  ...props
}: AppTextProps) {
  return (
    <RNText
      style={[typography[variant], { color }, style]}
      accessibilityRole={variant.startsWith('h') ? 'header' : 'text'}
      {...props}
    />
  );
}

export const Text = AppText;
