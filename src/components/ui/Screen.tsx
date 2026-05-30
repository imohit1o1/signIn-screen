import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  statusBarStyle?: "dark-content" | "light-content" | "default";
  statusBarBg?: string;
  /** Optional node pinned to the top-left above all centered content (e.g. a back button) */
  headerLeft?: React.ReactNode;
}

export function Screen({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  statusBarStyle = "dark-content",
  statusBarBg = theme.colors.background,
  headerLeft,
}: ScreenProps) {
  const containerStyle = [
    styles.container,
    { backgroundColor: theme.colors.background },
    style,
  ];

  const contentStyle = [styles.contentContainer, contentContainerStyle];

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.flexOne}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={Platform.OS === "ios"}
        >
          {children}
        </ScrollView>
      );
    }
    return <View style={[styles.flexOne, contentStyle]}>{children}</View>;
  };

  return (
    <SafeAreaView style={containerStyle} edges={["top", "left", "right"]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />

      {/* Fixed header row — sits above the centered content, never scrolls */}
      {headerLeft && (
        <View style={styles.headerRow}>
          {headerLeft}
        </View>
      )}

      <KeyboardAvoidingView behavior="padding" style={styles.flexOne}>
        {renderContent()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: "flex-start",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
});
