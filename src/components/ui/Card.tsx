import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { theme } from "../../theme";
import { Text } from "./Text";

// Import our custom UI blocks to centralize them under Card namespace
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
  bordered?: boolean;
}

// 1. Root Card Container
export function Card({
  children,
  style,
  selected = false,
  onPress,
  bordered = true,
}: CardProps) {
  const cardStyle = [
    styles.card,
    bordered && styles.bordered,
    selected && styles.selected,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

// 2. Compound sub-components
export function CardHeader({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <Text variant="label" weight="bold" style={[styles.title, style]}>
      {children}
    </Text>
  );
}

export function CardDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <Text variant="caption" style={[styles.description, style]}>
      {children}
    </Text>
  );
}

export function CardContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

// 3. Attach standard layout sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

// 4. Attach unified form namespaces (The ultimate compound system!)
Card.Label = Label;
Card.Input = Input;
Card.Action = Button; // Button is exposed as Card.Action

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    // Subtle drop shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  bordered: {
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.06,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    marginBottom: 2,
  },
  description: {
    color: theme.colors.textMuted,
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});
