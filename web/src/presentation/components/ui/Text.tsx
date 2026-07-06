import { HTMLAttributes, ElementType } from 'react';
import { cn } from '@/core/utils/cn';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label';
type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'label';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: TextElement;
  muted?: boolean;
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'text-3xl font-bold tracking-tight text-neutral-900',
  h2: 'text-2xl font-semibold tracking-tight text-neutral-900',
  h3: 'text-xl font-semibold text-neutral-900',
  body: 'text-base text-neutral-700',
  bodySmall: 'text-sm text-neutral-600',
  caption: 'text-xs text-neutral-500',
  label: 'text-sm font-medium text-neutral-700',
};

const defaultElement: Record<TextVariant, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'label',
};

export function Text({
  className,
  variant = 'body',
  as,
  muted,
  children,
  ...props
}: TextProps) {
  const Component = (as ?? defaultElement[variant]) as ElementType;

  return (
    <Component
      className={cn(variantClasses[variant], muted && 'text-neutral-500', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
