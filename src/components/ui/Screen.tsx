import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../theme";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  statusBarStyle?: "dark-content" | "light-content" | "default";
  statusBarBg?: string;
  keyboardOffset?: number;
}

export function Screen({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  statusBarStyle = "dark-content",
  statusBarBg = theme.colors.background,
  keyboardOffset = Platform.OS === "ios" ? 0 : 0,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    { backgroundColor: theme.colors.background },
    style,
  ];

  const contentStyle = [
    styles.contentContainer,
    contentContainerStyle,
  ];

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={true}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexOne}
        keyboardVerticalOffset={keyboardOffset}
      >
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
