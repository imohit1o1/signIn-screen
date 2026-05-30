import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { theme } from "../../../theme";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";

type ResetMethod = "email" | "2fa" | "authenticator";

export function ForgotPasswordOptions() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<ResetMethod>("2fa"); // Default highlighted method from mockup
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Verification Code Sent",
        `A secure verification code has been dispatched via your selected method: ${selectedMethod === "email"
          ? "Email Address"
          : selectedMethod === "2fa"
            ? "2-Factor SMS"
            : "Google Authenticator App"
        }.`
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Top Header Back Navigation Chevron */}
      <View style={styles.navHeader}>
        <Card.Action
          variant="outline"
          iconOnly
          size="md"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={theme.colors.text}
          />
        </Card.Action>
      </View>

      {/* Screen Title & Description */}
      <View style={styles.header}>
        <Text variant="h1" align="center" style={styles.title}>
          Forgot Password
        </Text>
        <Text variant="muted" align="center" style={styles.subtitle}>
          Select which methods you'd like to reset.
        </Text>
      </View>

      {/* Selection Cards Area */}
      <View style={styles.selectionArea}>

        {/* Method 1: Email Address */}
        <Card
          selected={selectedMethod === "email"}
          onPress={() => setSelectedMethod("email")}
          style={styles.methodCard}
        >
          <View style={styles.cardContent}>
            {/* Left Circular Icon Container */}
            <View style={[styles.iconCircle, selectedMethod === "email" && styles.activeIconCircle]}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={selectedMethod === "email" ? theme.colors.primary : theme.colors.textMuted}
              />
            </View>
            {/* Header Text Group inside Card */}
            <Card.Header style={styles.cardTextContainer}>
              <Card.Title>Email Address</Card.Title>
              <Card.Description>Send via email address securely.</Card.Description>
            </Card.Header>
          </View>
        </Card>

        {/* Method 2: 2 Factor Authentication (SMS) */}
        <Card
          selected={selectedMethod === "2fa"}
          onPress={() => setSelectedMethod("2fa")}
          style={styles.methodCard}
        >
          <View style={styles.cardContent}>
            <View style={[styles.iconCircle, selectedMethod === "2fa" && styles.activeIconCircle]}>
              <Ionicons
                name="phone-portrait-outline"
                size={22}
                color={selectedMethod === "2fa" ? theme.colors.primary : theme.colors.textMuted}
              />
            </View>
            <Card.Header style={styles.cardTextContainer}>
              <Card.Title>2 Factor Authentication</Card.Title>
              <Card.Description>Send via 2FA securely.</Card.Description>
            </Card.Header>
          </View>
        </Card>

        {/* Method 3: Google Authenticator */}
        <Card
          selected={selectedMethod === "authenticator"}
          onPress={() => setSelectedMethod("authenticator")}
          style={styles.methodCard}
        >
          <View style={styles.cardContent}>
            <View style={[styles.iconCircle, selectedMethod === "authenticator" && styles.activeIconCircle]}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={selectedMethod === "authenticator" ? theme.colors.primary : theme.colors.textMuted}
              />
            </View>
            <Card.Header style={styles.cardTextContainer}>
              <Card.Title>Google Authenticator</Card.Title>
              <Card.Description>Send via authenticator securely.</Card.Description>
            </Card.Header>
          </View>
        </Card>

        {/* Reset Password Action Button */}
        <Card.Action
          variant="primary"
          onPress={handleResetPassword}
          loading={loading}
          style={styles.submitBtn}
        >
          <Text
            variant="body"
            weight="bold"
            style={{ color: "white", marginRight: 8 }}
          >
            Reset Password
          </Text>
          <Ionicons
            name="arrow-forward-outline"
            size={18}
            color={theme.colors.textInverse}
          />
        </Card.Action>

      </View>

      {/* Decorative Lock Watermark in the background layer */}
      <View style={styles.watermarkContainer} pointerEvents="none">
        <Ionicons name="lock-closed" size={140} color="#000000" style={styles.watermark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  navHeader: {
    width: "100%",
    paddingTop: theme.spacing.md,
    alignItems: "flex-start",
  },
  backButton: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
  },
  header: {
    alignItems: "center",
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
  },
  selectionArea: {
    zIndex: 10,
    paddingHorizontal: theme.spacing.sm,
  },
  methodCard: {
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm, // Compact vertical padding inside selection rows
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F2ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.lg,
  },
  activeIconCircle: {
    backgroundColor: theme.colors.primaryLight,
  },
  cardTextContainer: {
    flex: 1,
    marginBottom: 0, // Reset default bottom spacing inside horizontal items
  },
  submitBtn: {
    marginTop: theme.spacing.xl,
  },
  watermarkContainer: {
    position: "absolute",
    bottom: -30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.035, // Premium subtle watermark look
    zIndex: 1,
  },
  watermark: {
    transform: [{ rotate: "-5deg" }],
  },
});
