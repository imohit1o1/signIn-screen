import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { theme } from "../../theme";
import { Text } from "./Text";

interface DividerProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export function Divider({ text, style, color = theme.colors.border }: DividerProps) {
  if (text) {
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.line, { backgroundColor: color }]} />
        <Text variant="caption" style={styles.text}>
          {text}
        </Text>
        <View style={[styles.line, { backgroundColor: color }]} />
      </View>
    );
  }

  return <View style={[styles.line, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: theme.spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.medium,
  },
});
