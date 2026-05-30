import React, { useState } from "react";
import { StyleSheet, View, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../../theme";
import { Logo } from "../logo/Logo";

// Static UI Elements
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Divider } from "../../ui/Divider";
import { Text } from "../../ui/Text";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("elementary221b@gmail.co");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Welcome back to Telecare AI!");
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Header */}
      <View style={styles.header}>
        <Logo size={64} />
        <Text variant="h1" align="center" style={styles.title}>
          Sign In
        </Text>
        <Text variant="muted" align="center" style={styles.subtitle}>
          Let's experience the joy of telecare AI.
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          
          {/* Email Address field */}
          <View style={styles.fieldGroup}>
            <Label>Email Address</Label>
            <Input
              placeholder="Enter your email address..."
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={theme.colors.textMuted}
                />
              }
            />
            {errors.email && (
              <Text variant="error" style={styles.errorText}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password field */}
          <View style={styles.fieldGroup}>
            <Label>Password</Label>
            <Input
              placeholder="Enter your password..."
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.colors.textMuted}
                />
              }
              rightIcon={
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={theme.colors.textMuted}
                  />
                </Pressable>
              }
            />
            {errors.password && (
              <Text variant="error" style={styles.errorText}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Action Trigger Button */}
          <Button
            variant="primary"
            onPress={handleSignIn}
            loading={loading}
            style={styles.submitBtn}
          >
            <Text
              variant="body"
              weight="bold"
              style={{ color: "white", marginRight: 8 }}
            >
              Sign In
            </Text>
            <Ionicons
              name="arrow-forward-outline"
              size={18}
              color={theme.colors.textInverse}
            />
          </Button>

          <Divider text="Or" />

          {/* Social Row utilizing unified iconOnly Button Actions */}
          <View style={styles.socialRow}>
            <Button
              variant="outline"
              iconOnly
              onPress={() => Alert.alert("Facebook", "Connecting via Facebook...")}
            >
              <FontAwesome5 name="facebook-f" size={18} color={theme.colors.text} />
            </Button>

            <Button
              variant="outline"
              iconOnly
              onPress={() => Alert.alert("Google", "Connecting via Google...")}
            >
              <FontAwesome5 name="google" size={18} color={theme.colors.text} />
            </Button>

            <Button
              variant="outline"
              iconOnly
              onPress={() => Alert.alert("Instagram", "Connecting via Instagram...")}
            >
              <FontAwesome5 name="instagram" size={18} color={theme.colors.text} />
            </Button>
          </View>

          {/* Custom Redirection Footer Links */}
          <View style={styles.footerLinks}>
            <View style={styles.row}>
              <Text variant="caption" style={styles.footerPrompt}>
                Don't have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/signup" as any)}>
                <Text variant="caption" style={styles.footerLink}>
                  Sign Up.
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => router.push("/forgot-password" as any)}
              style={styles.forgotBtn}
            >
              <Text variant="caption" style={styles.footerLink}>
                Forgot your password?
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
  submitBtn: {
    marginTop: theme.spacing.md,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  footerLinks: {
    alignItems: "center",
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerPrompt: {
    fontWeight: theme.typography.weights.medium,
  },
  footerLink: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
    textDecorationLine: "underline",
  },
  forgotBtn: {
    paddingVertical: theme.spacing.xs,
  },
});
