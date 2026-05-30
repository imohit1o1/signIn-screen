import React from "react";
import { Screen } from "../../components/ui/Screen";
import { SignUpForm } from "../../components/auth/signup/SignUpForm";

export default function SignupScreen() {
  return (
    <Screen scrollable>
      <SignUpForm />
    </Screen>
  );
}
