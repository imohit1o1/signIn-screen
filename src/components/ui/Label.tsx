import React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { theme } from "../../theme";
import { Text } from "./Text";

interface LabelProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function Label({ children, style }: LabelProps) {
  return (
    <Text variant="label" style={[styles.label, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.sm, // Guarantees a consistent 8px gap above all input fields
  },
});
