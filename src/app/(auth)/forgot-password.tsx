import React from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/ui/Screen";
import { ForgotPasswordOptions } from "../../components/auth/forgotpassword/ForgotPasswordOptions";
import { theme } from "../../theme";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <Screen
      scrollable
      headerLeft={
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: theme.radius.full,
            borderWidth: 1.5,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            justifyContent: "center",
            alignItems: "center",
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={theme.colors.text}
          />
        </Pressable>
      }
    >
      <ForgotPasswordOptions />
    </Screen>
  );
}
