import React from "react";
import { Screen } from "../../components/ui/Screen";
import { ForgotPasswordOptions } from "../../components/auth/forgotpassword/ForgotPasswordOptions";

export default function ForgotPasswordScreen() {
  return (
    <Screen scrollable>
      <ForgotPasswordOptions />
    </Screen>
  );
}
