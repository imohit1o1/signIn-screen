import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { theme } from "../../theme";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "label"
  | "caption"
  | "error"
  | "muted";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  align?: "auto" | "left" | "center" | "right" | "justify";
  weight?: keyof typeof theme.typography.weights;
}

export function Text({
  children,
  variant = "body",
  style,
  align = "left",
  weight,
  ...props
}: TextProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "h1":
        return {
          fontSize: theme.typography.sizes.h1,
          lineHeight: theme.typography.lineHeights.h1,
          fontWeight: theme.typography.weights.bold,
          color: theme.colors.text,
        };
      case "h2":
        return {
          fontSize: theme.typography.sizes.xxl,
          lineHeight: theme.typography.lineHeights.xxl,
          fontWeight: theme.typography.weights.bold,
          color: theme.colors.text,
        };
      case "h3":
        return {
          fontSize: theme.typography.sizes.xl,
          lineHeight: theme.typography.lineHeights.xl,
          fontWeight: theme.typography.weights.semiBold,
          color: theme.colors.text,
        };
      case "label":
        return {
          fontSize: theme.typography.sizes.sm,
          lineHeight: theme.typography.lineHeights.sm,
          fontWeight: theme.typography.weights.semiBold,
          color: theme.colors.text,
        };
      case "caption":
        return {
          fontSize: theme.typography.sizes.xs,
          lineHeight: theme.typography.lineHeights.xs,
          fontWeight: theme.typography.weights.regular,
          color: theme.colors.textMuted,
        };
      case "error":
        return {
          fontSize: theme.typography.sizes.sm,
          lineHeight: theme.typography.lineHeights.sm,
          fontWeight: theme.typography.weights.medium,
          color: theme.colors.error,
        };
      case "muted":
        return {
          fontSize: theme.typography.sizes.md,
          lineHeight: theme.typography.lineHeights.md,
          fontWeight: theme.typography.weights.regular,
          color: theme.colors.textMuted,
        };
      case "body":
      default:
        return {
          fontSize: theme.typography.sizes.md,
          lineHeight: theme.typography.lineHeights.md,
          fontWeight: theme.typography.weights.regular,
          color: theme.colors.text,
        };
    }
  };

  const textStyles = [
    getVariantStyles(),
    align && { textAlign: align },
    weight && { fontWeight: theme.typography.weights[weight] },
    style,
  ];

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
}
