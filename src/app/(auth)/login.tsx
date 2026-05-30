import React from "react";
import { Screen } from "../../components/ui/Screen";
import { SignInForm } from "../../components/auth/signin/SignInForm";

export default function LoginScreen() {
  return (
    <Screen scrollable>
      <SignInForm />
    </Screen>
  );
}
