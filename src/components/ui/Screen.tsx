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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../theme";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  statusBarStyle?: "dark-content" | "light-content" | "default";
  statusBarBg?: string;
}

export function Screen({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  statusBarStyle = "dark-content",
  statusBarBg = theme.colors.background,
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

  // On Android, KeyboardAvoidingView with behavior="height" actively resizes
  // the entire layout while the keyboard animates. This causes a layout thrash
  // that force-blurs and re-focuses the TextInput in a tight loop, producing
  // the "keyboard opens and closes instantly" bug.
  //
  // Fix: on Android we skip KeyboardAvoidingView entirely and add bottom
  // padding to the ScrollView so content is never obscured by the keyboard.
  // The ScrollView's keyboardShouldPersistTaps="handled" keeps the keyboard
  // alive when the user taps non-input elements.

  const renderScrollable = () => (
    <ScrollView
      style={styles.flexOne}
      contentContainerStyle={[
        contentStyle,
        // Give Android enough breathing room at the bottom for the keyboard
        Platform.OS === "android" && { paddingBottom: 300 },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={Platform.OS === "ios"}
    >
      {children}
    </ScrollView>
  );

  const renderFixed = () => (
    <View style={[styles.flexOne, contentStyle]}>{children}</View>
  );

  // iOS: wrap the whole screen in KeyboardAvoidingView with padding behavior
  // (the safe, battle-tested approach on iOS).
  if (Platform.OS === "ios") {
    return (
      <SafeAreaView style={containerStyle} edges={["top", "left", "right"]}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.flexOne}
        >
          {scrollable ? renderScrollable() : renderFixed()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Android: no KeyboardAvoidingView — just safe area + scroll
  return (
    <SafeAreaView style={containerStyle} edges={["top", "left", "right"]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
      {scrollable ? renderScrollable() : renderFixed()}
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
  contentContainer: {
    flexGrow: 1,
  },
});
