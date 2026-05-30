import React from "react";
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from "react-native";
import { theme } from "../../theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  iconOnly?: boolean; // <-- Converts the button into a perfect circle icon button
}

export function Button({
  onPress,
  variant = "primary",
  size = "lg",
  loading = false,
  disabled = false,
  style,
  children,
  iconOnly = false,
}: ButtonProps) {
  const isInteractionDisabled = disabled || loading;

  const getVariantStyles = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: pressed
            ? theme.colors.primaryLight
            : theme.colors.primaryLight,
          borderWidth: 0,
          opacity: pressed ? 0.85 : 1,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: pressed ? theme.colors.primary : theme.colors.border,
          borderWidth: 1.5,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
          opacity: pressed ? 0.7 : 1,
        };
      case "primary":
      default:
        return {
          backgroundColor: pressed
            ? theme.colors.primaryDark
            : theme.colors.primary,
          borderWidth: 0,
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: pressed ? 0.15 : 0.25,
          shadowRadius: 10,
          elevation: pressed ? 2 : 4,
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    if (iconOnly) {
      switch (size) {
        case "sm":
          return {
            width: 40,
            height: 40,
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: theme.radius.full,
          };
        case "md":
          return {
            width: 48,
            height: 48,
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: theme.radius.full,
          };
        case "lg":
        default:
          return {
            width: 56,
            height: 56,
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: theme.radius.full,
          };
      }
    }

    switch (size) {
      case "sm":
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          height: 40,
        };
      case "md":
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          height: 48,
        };
      case "lg":
      default:
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xxl,
          height: 56,
        };
    }
  };

  return (
    <Pressable
      onPress={isInteractionDisabled ? undefined : onPress}
      disabled={isInteractionDisabled}
      style={({ pressed }) => [
        styles.button,
        getSizeStyles(),
        getVariantStyles(pressed),
        isInteractionDisabled && styles.disabled,
        pressed && !isInteractionDisabled && styles.pressedScale,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary"
              ? theme.colors.textInverse
              : theme.colors.primary
          }
        />
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.xxl, // Default pill corners for rectangle buttons
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  pressedScale: {
    transform: [{ scale: 0.98 }],
  },
});
