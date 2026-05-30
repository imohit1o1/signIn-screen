import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../../theme";
import { Card } from "../../ui/Card";
import { Text } from "../../ui/Text";
import { Logo } from "../logo/Logo";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    globalMatch?: boolean;
  }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!passwordConfirmation) {
      newErrors.passwordConfirmation = "Confirmation password is required";
      isValid = false;
    }

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      newErrors.globalMatch = true; // Displays the red error banner
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Account created successfully! Please sign in.");
        router.push("/login" as any);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Header */}
      <View style={styles.header}>
        <Logo size={64} />
        <Text variant="h1" align="center" style={styles.title}>
          Sign Up For Free
        </Text>
        <Text variant="muted" align="center" style={styles.subtitle}>
          Sign up in 1 minute for free!
        </Text>
      </View>

      {/* Form Area */}
      <Card style={styles.card}>
        <Card.Content>
          {/* Email Address field */}
          <View style={styles.fieldGroup}>
            <Card.Label>Email Address</Card.Label>
            <Card.Input error={errors.email}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.textMuted}
              />
              <Card.Input.Field
                placeholder="Enter your email..."
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: undefined });
                }}
              />
            </Card.Input>
            {errors.email && (
              <Text variant="error" style={styles.errorText}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password field */}
          <View style={styles.fieldGroup}>
            <Card.Label>Password</Card.Label>
            <Card.Input error={errors.password || (errors.globalMatch ? true : undefined)}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.colors.textMuted}
              />
              <Card.Input.Field
                placeholder="Enter your password..."
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: undefined, globalMatch: undefined });
                }}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={theme.colors.textMuted}
                />
              </Pressable>
            </Card.Input>
            {errors.password && (
              <Text variant="error" style={styles.errorText}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Password Confirmation field */}
          <View style={styles.fieldGroup}>
            <Card.Label>Password Confirmation</Card.Label>
            <Card.Input error={errors.passwordConfirmation || (errors.globalMatch ? true : undefined)}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.colors.textMuted}
              />
              <Card.Input.Field
                placeholder="Confirm your password..."
                secureTextEntry={!showConfirmPassword}
                value={passwordConfirmation}
                onChangeText={(text) => {
                  setPasswordConfirmation(text);
                  setErrors({ ...errors, passwordConfirmation: undefined, globalMatch: undefined });
                }}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={theme.colors.textMuted}
                />
              </Pressable>
            </Card.Input>
            {errors.passwordConfirmation && (
              <Text variant="error" style={styles.errorText}>
                {errors.passwordConfirmation}
              </Text>
            )}
          </View>

          {/* Premium Warning banner for password mismatch */}
          {errors.globalMatch && (
            <View style={styles.alertBanner}>
              <Ionicons
                name="alert-circle"
                size={20}
                color={theme.colors.error}
                style={styles.alertIcon}
              />
              <Text variant="error" style={styles.alertText}>
                ERROR: Password do not match!
              </Text>
            </View>
          )}

          {/* Submit Trigger Button */}
          <Card.Action
            variant="primary"
            onPress={handleSignUp}
            loading={loading}
            style={styles.submitBtn}
          >
            <Text
              variant="body"
              weight="bold"
              style={{ color: "white", marginRight: 8 }}
            >
              Sign Up
            </Text>
            <Ionicons
              name="arrow-forward-outline"
              size={18}
              color={theme.colors.textInverse}
            />
          </Card.Action>

          {/* Redirect Footer Link */}
          <View style={styles.footerLinks}>
            <Text variant="caption" style={styles.footerPrompt}>
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/login" as any)}>
              <Text variant="caption" style={styles.footerLink}>
                Sign In.
              </Text>
            </Pressable>
          </View>

        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontWeight: theme.typography.weights.bold,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
  },
  card: {
    shadowOpacity: 0.02,
    borderWidth: 0,
    elevation: 0,
    backgroundColor: "transparent",
    paddingHorizontal: theme.spacing.sm,
  },
  fieldGroup: {
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  alertBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.errorBg,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  alertIcon: {
    marginRight: theme.spacing.sm,
  },
  alertText: {
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.error,
  },
  submitBtn: {
    marginTop: theme.spacing.md,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
  },
  footerPrompt: {
    fontWeight: theme.typography.weights.medium,
  },
  footerLink: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
    textDecorationLine: "underline",
  },
});
